import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import {
  ActivityIndicator,
  Dimensions,
  useColorScheme,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Swiper from 'react-native-swiper';
import Slide from '../components/Slide';
import HMedia from '../components/HMedia';
import VMedia from '../components/VMedia';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Container = styled.FlatList`
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

const TrendingScroll = styled.FlatList`
  margin-top: 15px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 15px;
`;

const VSeperator = styled.View`
  width: 15px;
`;

const HSeperator = styled.View`
  height: 15px;
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

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);

  async function getNowPlaying() {
    const { results } = await (
      await fetch(
        requestUrl(`/movie/now_playing`, `&${LANGUAGE}&${PAGE}&${REGION}`)
      )
    ).json();
    setNowPlaying(results);
  }

  async function getUpcoming() {
    const { results } = await (
      await fetch(
        requestUrl(`/movie/upcoming`, `&${LANGUAGE}&${PAGE}&${REGION}`)
      )
    ).json();
    setUpcoming(results);
  }

  async function getTrending() {
    const { results } = await (
      await fetch(requestUrl(`/trending/movie/week`))
    ).json();
    setTrending(results);
  }

  async function getData() {
    await Promise.all([getNowPlaying(), getUpcoming(), getTrending()]);
    setLoading(false);
  }

  async function onRefresh() {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  }

  useEffect(() => {
    getData();
  }, []);

  function renderVMedia({ item }: any) {
    return (
      <VMedia
        posterPath={item.poster_path}
        originalTitle={item.original_title}
        voteAverage={item.vote_average}
      />
    );
  }

  function renderHMedia({ item }: any) {
    return (
      <HMedia
        posterPath={item.poster_path}
        originalTitle={item.original_title}
        releaseDate={item.release_date}
        overview={item.overview}
      />
    );
  }

  function listKeyExtractor(item: any) {
    return parseInt(item.id);
  }

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container
      refreshing={refreshing}
      onRefresh={onRefresh}
      ListHeaderComponent={
        <>
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
            {nowPlaying.map((movie: any) => (
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
              data={trending}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 30 }}
              ItemSeparatorComponent={VSeperator}
              keyExtractor={listKeyExtractor}
              renderItem={renderVMedia}
            />
          </ListContainer>

          <ComingSoonTitle isDark={isDark}>Coming Soon</ComingSoonTitle>
        </>
      }
      data={upcoming}
      ItemSeparatorComponent={HSeperator}
      keyExtractor={listKeyExtractor}
      renderItem={renderHMedia}
    ></Container>
  );
}
