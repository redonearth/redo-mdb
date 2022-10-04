import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, useColorScheme, View } from 'react-native';
import Poster from './Poster';
import Votes from './Votes';
import { useNavigation } from '@react-navigation/native';
import { Movie, TV } from '../api';

const HMovie = styled.View`
  flex-direction: row;
  padding: 0px 30px;
` as unknown as typeof View;

const HColumn = styled.View`
  flex-direction: column;
  width: 80%;
  margin-left: 15px;
` as unknown as typeof View;

const Title = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? 'white' : 'black')};
  font-weight: 600;
  margin-top: 8px;
  margin-bottom: 2px;
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

interface HMediaProps {
  posterPath: string | null;
  originalTitle: string;
  releaseDate?: string;
  overview: string;
  voteAverage?: number;
  fullData: Movie | TV;
}

export default function HMedia({
  posterPath,
  originalTitle,
  releaseDate,
  overview,
  voteAverage,
  fullData,
}: HMediaProps) {
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
      <HMovie>
        <Poster path={posterPath || ''} />
        <HColumn>
          <Title isDark={isDark}>
            {originalTitle.length > 30
              ? `${originalTitle.slice(0, 30)}...`
              : originalTitle}
          </Title>
          {releaseDate && (
            <ReleaseDate isDark={isDark}>
              {new Date(releaseDate).toLocaleDateString('ko', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </ReleaseDate>
          )}
          {voteAverage ? <Votes votes={voteAverage} /> : null}
          <Overview isDark={isDark}>
            {overview !== '' && overview.length > 140
              ? `${overview.slice(0, 140)}...`
              : overview}
          </Overview>
        </HColumn>
      </HMovie>
    </TouchableOpacity>
  );
}
