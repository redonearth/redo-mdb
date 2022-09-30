import React from 'react';
import styled from 'styled-components/native';
import { useColorScheme } from 'react-native';
import Poster from './Poster';
import Votes from './Votes';

const VMovie = styled.View`
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
}

export default function VMedia({
  posterPath,
  originalTitle,
  voteAverage,
}: VMediaProps) {
  const isDark = useColorScheme() === 'dark';
  return (
    <VMovie>
      <Poster path={posterPath} />
      <Title isDark={isDark}>
        {originalTitle.slice(0, 12)}
        {originalTitle.length > 12 && '...'}
      </Title>
      <Votes votes={voteAverage} />
    </VMovie>
  );
}
