import React from 'react';
import styled from 'styled-components/native';
import { useColorScheme } from 'react-native';
import Poster from './Poster';
import Votes from './Votes';

const HMovie = styled.View`
  flex-direction: row;
  padding: 0px 30px;
`;

const HColumn = styled.View`
  flex-direction: column;
  width: 80%;
  margin-left: 15px;
`;

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
  posterPath: string;
  originalTitle: string;
  releaseDate?: string;
  overview: string;
  voteAverage?: number;
}

export default function HMedia({
  posterPath,
  originalTitle,
  releaseDate,
  overview,
  voteAverage,
}: HMediaProps) {
  const isDark = useColorScheme() === 'dark';
  return (
    <HMovie>
      <Poster path={posterPath} />
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
  );
}
