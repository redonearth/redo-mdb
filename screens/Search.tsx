import React, { useState } from 'react';
import { TextInput, useColorScheme } from 'react-native';
import { useQuery } from 'react-query';
import styled from 'styled-components/native';
import { movieAPI, tvAPI } from '../api';
import HList from '../components/HList';
import Loader from '../components/Loader';

const Container = styled.ScrollView``;

const SearchBar = styled.TextInput`
  background-color: #efefef;
  padding: 10px 15px;
  margin-bottom: 40px;
` as unknown as typeof TextInput;

export default function Search() {
  const isDark = useColorScheme() === 'dark';

  const [query, setQuery] = useState('');
  const {
    isLoading: isMoviesLoading,
    data: moviesData,
    refetch: searchMovies,
  } = useQuery(['searchMovies', query], movieAPI.search, {
    enabled: false,
  });

  const {
    isLoading: isTVsLoading,
    data: tvsData,
    refetch: searchTVs,
  } = useQuery(['searchTVs', query], tvAPI.search, {
    enabled: false,
  });

  function onChangeText(text: string) {
    return setQuery(text);
  }

  function onSubmit() {
    if (query === '') return;
    searchMovies();
    searchTVs();
  }

  return (
    <Container>
      <SearchBar
        placeholder="Search for Movie or TV"
        placeholderTextColor="grey"
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
      {isMoviesLoading || isTVsLoading ? <Loader /> : null}
      {moviesData ? (
        <HList isDark={isDark} title="Movies" data={moviesData.results} />
      ) : null}
      {tvsData ? (
        <HList isDark={isDark} title="TVs" data={tvsData.results} />
      ) : null}
    </Container>
  );
}
