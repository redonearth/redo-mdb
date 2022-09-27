import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import {
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  useColorScheme,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Swiper from 'react-native-swiper';
import Slide from '../components/Slide';
import HMedia from '../components/HMedia';
import VMedia from '../components/VMedia';

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;

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

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 15px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const BASE_URL = `https://api.themoviedb.org/3`;
const API_KEY = '5efe6813c047c5a28d580b92e30a6262';
const LANGUAGE = `language=en-US`;
const PAGE = `page=1`;
const REGION = `region=KR`;
const requestUrl = (url: string, query: string = '') =>
  `${BASE_URL}${url}?api_key=${API_KEY}${query}`;

export default function Movies({}: NativeStackScreenProps<any, 'Movies'>) {
  const isDark = useColorScheme() === 'dark';

  const [refreshing, setRefreshing] = useState(false);
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
    setTrending(results);
  };
  const getData = async () => {
    await Promise.all([getNowPlaying(), getUpcoming(), getTrending()]);
    setLoading(false);
  };
  const onRefresh = async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
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
            <VMedia
              key={movie.id}
              posterPath={movie.poster_path}
              originalTitle={movie.original_title}
              voteAverage={movie.vote_average}
            />
          ))}
        </TrendingScroll>
      </ListContainer>

      <ComingSoonTitle isDark={isDark}>Coming Soon</ComingSoonTitle>
      {upcoming.map((movie) => (
        <HMedia
          key={movie.id}
          posterPath={movie.poster_path}
          originalTitle={movie.original_title}
          releaseDate={movie.release_date}
          overview={movie.overview}
        />
      ))}
    </Container>
  );
}
