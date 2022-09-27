import React from 'react';
import styled from 'styled-components/native';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { makeImagePath } from '../utils';

const BgImg = styled.Image``;

const Poster = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
`;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  width: 90%;
  margin: 0 auto;
  justify-content: space-around;
  align-items: center;
`;

const Column = styled.View`
  width: 60%;
`;

const Title = styled.Text<{ isDark: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isDark ? 'white' : props.theme.textColor)};
`;

const Overview = styled.Text<{ isDark: boolean }>`
  margin-top: 8px;
  color: ${(props) =>
    props.isDark ? 'rgba(255, 255, 255, 0.75)' : 'rgba(0, 0, 0, 0.75)'};
`;

const Votes = styled(Overview)`
  font-size: 12px;
  font-weight: 600;
`;

interface SlideProps {
  backdropPath: string;
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  overview: string;
}

export default function Slide({
  backdropPath,
  posterPath,
  originalTitle,
  voteAverage,
  overview,
}: SlideProps) {
  const isDark = useColorScheme() === 'dark';
  return (
    <View style={{ flex: 1 }}>
      <BgImg
        source={{ uri: makeImagePath(backdropPath) }}
        style={StyleSheet.absoluteFill}
      />
      <BlurView
        tint={isDark ? 'dark' : 'light'}
        intensity={80}
        style={StyleSheet.absoluteFill}
      >
        <Wrapper>
          <Poster source={{ uri: makeImagePath(posterPath) }} />
          <Column>
            <Title isDark={isDark}>{originalTitle}</Title>
            {voteAverage > 0 ? (
              <Votes isDark={isDark}>★ {voteAverage}/10</Votes>
            ) : null}
            <Overview isDark={isDark}>{overview.slice(0, 120)}...</Overview>
          </Column>
        </Wrapper>
      </BlurView>
    </View>
  );
}
