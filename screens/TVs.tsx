import React, { useState } from 'react';
import { RefreshControl, ScrollView, useColorScheme } from 'react-native';
import { QueryClient, useQuery } from 'react-query';
import { tvAPI, TVResponse } from '../api';
import Loader from '../components/Loader';
import HList from '../components/HList';

export default function TVs() {
  const isDark = useColorScheme() === 'dark';

  const queryClient = new QueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const { isLoading: trendingLoading, data: trendingData } =
    useQuery<TVResponse>(['tv', 'trending'], tvAPI.trending);
  const { isLoading: todayLoading, data: todayData } = useQuery<TVResponse>(
    ['tv', 'today'],
    tvAPI.airingToday
  );
  const { isLoading: topLoading, data: topData } = useQuery<TVResponse>(
    ['tv', 'top'],
    tvAPI.topRated
  );

  async function onRefresh() {
    setRefreshing(true);
    await queryClient.refetchQueries(['tv']);
    setRefreshing(false);
  }

  const loading = trendingLoading || todayLoading || topLoading;

  return loading ? (
    <Loader />
  ) : (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={{ paddingVertical: 30 }}
    >
      {trendingData ? (
        <HList
          isDark={isDark}
          title="Trending TVs"
          data={trendingData.results}
        />
      ) : null}
      {todayData ? (
        <HList isDark={isDark} title="Airing Today" data={todayData.results} />
      ) : null}
      {topData ? (
        <HList isDark={isDark} title="Top Rated" data={topData.results} />
      ) : null}
    </ScrollView>
  );
}
