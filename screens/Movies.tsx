import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Dimensions, FlatList, useColorScheme } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Loader from '../components/Loader';
import Swiper from 'react-native-swiper';
import Slide from '../components/Slide';
import HMedia from '../components/HMedia';
import HList from '../components/HList';
import { QueryClient, useQuery } from 'react-query';
import { Movie, movieAPI, MovieResponse } from '../api';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Container = styled.FlatList`
  background-color: ${(props) => props.theme.mainBgColor};
` as unknown as typeof FlatList;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ListTitle = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? 'white' : 'black')};
  font-size: 20px;
  font-weight: 600;
  margin-left: 30px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 15px;
`;

const HSeperator = styled.View`
  height: 15px;
`;

export default function Movies({}: NativeStackScreenProps<any, 'Movies'>) {
  const isDark = useColorScheme() === 'dark';

  const queryClient = new QueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const { isLoading: nowPlayingLoading, data: nowPlayingData } =
    useQuery<MovieResponse>(['movie', 'nowPlaying'], movieAPI.nowPlaying);
  const { isLoading: upcomingLoading, data: upcomingData } =
    useQuery<MovieResponse>(['movie', 'upcoming'], movieAPI.upcoming);
  const { isLoading: trendingLoading, data: trendingData } =
    useQuery<MovieResponse>(['movie', 'trending'], movieAPI.trending);

  async function onRefresh() {
    setRefreshing(true);
    await queryClient.refetchQueries(['movie']);
    setRefreshing(false);
  }

  function renderHMedia({ item }: { item: Movie }) {
    return (
      <HMedia
        posterPath={item.poster_path}
        originalTitle={item.original_title}
        releaseDate={item.release_date}
        overview={item.overview}
      />
    );
  }

  function listKeyExtractor(item: Movie) {
    return String(item.id);
  }

  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;

  return loading ? (
    <Loader />
  ) : upcomingData ? (
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
            {nowPlayingData
              ? nowPlayingData.results.map((movie: any) => (
                  <Slide
                    key={movie.id}
                    backdropPath={movie.backdrop_path}
                    posterPath={movie.poster_path}
                    originalTitle={movie.original_title}
                    voteAverage={movie.vote_average}
                    overview={movie.overview}
                  />
                ))
              : null}
          </Swiper>

          <ListContainer>
            {trendingData ? (
              <HList
                isDark={isDark}
                title="Trending Movies"
                data={trendingData.results}
              />
            ) : null}
          </ListContainer>

          <ComingSoonTitle isDark={isDark}>Coming Soon</ComingSoonTitle>
        </>
      }
      data={upcomingData.results}
      ItemSeparatorComponent={HSeperator}
      keyExtractor={listKeyExtractor}
      renderItem={renderHMedia}
    />
  ) : null;
}
