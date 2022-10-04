import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, useColorScheme } from 'react-native';
import Poster from './Poster';
import Votes from './Votes';
import { useNavigation } from '@react-navigation/native';
import { Movie, TV } from '../api';

const Container = styled.View`
  align-items: center;
`;

const Title = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? 'white' : 'black')};
  font-weight: 600;
  margin-top: 8px;
  margin-bottom: 2px;
`;

interface VMediaProps {
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  fullData: Movie | TV;
}

export default function VMedia({
  posterPath,
  originalTitle,
  voteAverage,
  fullData,
}: VMediaProps) {
  const isDark = useColorScheme() === 'dark';
  const navigation = useNavigation();

  function goToDetail() {
    //@ts-ignore
    navigation.navigate('Stack', {
      screen: 'Detail',
      params: {
        ...fullData,
      },
    });
  }

  return (
    <TouchableOpacity onPress={goToDetail}>
      <Container>
        <Poster path={posterPath} />
        <Title isDark={isDark}>
          {originalTitle.slice(0, 12)}
          {originalTitle.length > 12 && '...'}
        </Title>
        <Votes votes={voteAverage} />
      </Container>
    </TouchableOpacity>
  );
}
