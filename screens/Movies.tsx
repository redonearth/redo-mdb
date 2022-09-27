import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Swiper from 'react-native-swiper';
import Slide from '../components/Slide';
import Poster from '../components/Poster';

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ListTitle = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? 'white' : 'black')};
  font-size: 20px;
  font-weight: 600;
  margin-left: 30px;
`;

const TrendingScroll = styled.ScrollView`
  margin-top: 15px;
`;

const Movie = styled.View`
  margin-right: 15px;
  align-items: center;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 15px;
`;

const HMovie = styled.View`
  flex-direction: row;
  padding: 0px 30px;
  margin-bottom: 30px;
`;

const HColumn = styled.View`
  flex-direction: column;
  width: 80%;
  margin-left: 15px;
`;

const Overview = styled.Text<{ isDark: boolean }>`
  color: ${(props) =>
    props.isDark ? 'rgba(255, 255, 255, 0.75)' : 'rgba(0, 0, 0, 0.75)'};
  width: 80%;
`;

const ReleaseDate = styled.Text<{ isDark: boolean }>`
  color: ${(props) =>
    props.isDark ? 'rgba(255, 255, 255, 0.75)' : 'rgba(0, 0, 0, 0.75)'};
  font-size: 12px;
  margin: 5px 0;
`;

const Title = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? 'white' : 'black')};
  font-weight: 600;
  margin-top: 8px;
  margin-bottom: 2px;
`;

const Votes = styled.Text<{ isDark: boolean }>`
  color: ${(props) =>
    props.isDark ? 'rgba(255, 255, 255, 0.75)' : 'rgba(0, 0, 0, 0.75)'};
  font-size: 10px;
  font-weight: 500;
`;

const BASE_URL = `https://api.themoviedb.org/3`;
const API_KEY = '5efe6813c047c5a28d580b92e30a6262';
const LANGUAGE = `language=en-US`;
const PAGE = `page=1`;
const REGION = `region=KR`;
const requestUrl = (url: string, query: string = '') =>
  `${BASE_URL}${url}?api_key=${API_KEY}${query}`;

export default function Movies({}: NativeStackScreenProps<any, 'Movies'>) {
  const isDark = useColorScheme() === 'dark';
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);
  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        requestUrl(`/movie/now_playing`, `&${LANGUAGE}&${PAGE}&${REGION}`)
      )
    ).json();
    setNowPlaying(results);
  };
  const getUpcoming = async () => {
    const { results } = await (
      await fetch(
        requestUrl(`/movie/upcoming`, `&${LANGUAGE}&${PAGE}&${REGION}`)
      )
    ).json();
    setUpcoming(results);
  };
  const getTrending = async () => {
    const { results } = await (
      await fetch(requestUrl(`/trending/movie/week`))
    ).json();
    console.log(requestUrl(`/trending/movie/week`));
    setTrending(results);
  };
  const getData = async () => {
    await Promise.all([getNowPlaying(), getUpcoming(), getTrending()]);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container>
      <Swiper
        loop
        autoplay
        autoplayTimeout={3.5}
        showsPagination={false}
        containerStyle={{
          width: '100%',
          height: SCREEN_HEIGHT / 4,
          marginBottom: 30,
        }}
      >
        {nowPlaying.map((movie) => (
          <Slide
            key={movie.id}
            backdropPath={movie.backdrop_path}
            posterPath={movie.poster_path}
            originalTitle={movie.original_title}
            voteAverage={movie.vote_average}
            overview={movie.overview}
          />
        ))}
      </Swiper>

      <ListContainer>
        <ListTitle isDark={isDark}>Trending Movies</ListTitle>
        <TrendingScroll
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 30 }}
        >
          {trending.map((movie) => (
            <Movie key={movie.id}>
              <Poster path={movie.poster_path} />
              <Title isDark={isDark}>
                {movie.original_title.slice(0, 13)}
                {movie.original_title.length > 13 && '...'}
              </Title>
              <Votes isDark={isDark}>
                {movie.vote_average > 0
                  ? `★ ${movie.vote_average}/10`
                  : `Coming Soon`}
              </Votes>
            </Movie>
          ))}
        </TrendingScroll>
      </ListContainer>

      <ComingSoonTitle isDark={isDark}>Coming Soon</ComingSoonTitle>
      {upcoming.map((movie) => (
        <HMovie key={movie.id}>
          <Poster path={movie.poster_path} />
          <HColumn>
            <Title isDark={isDark}>{movie.original_title}</Title>
            <ReleaseDate isDark={isDark}>
              {new Date(movie.release_date).toLocaleDateString('ko', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </ReleaseDate>
            <Overview isDark={isDark}>
              {movie.overview !== '' && movie.overview.length > 140
                ? `${movie.overview.slice(0, 140)}...`
                : movie.overview}
            </Overview>
          </HColumn>
        </HMovie>
      ))}
    </Container>
  );
}
