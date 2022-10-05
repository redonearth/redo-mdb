import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { Dimensions, Image, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/Stack';
import { makeImagePath } from '../utils';
import { LinearGradient } from 'expo-linear-gradient';
import Poster from '../components/Poster';
import COLORS from '../colors';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Header = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content: flex-end;
  padding: 0px 20px;
`;

const Background = styled.Image`` as unknown as typeof Image;

const Column = styled.View`
  flex-direction: row;
`;

const Title = styled.Text`
  color: white;
  align-self: flex-end;
  font-weight: 500;
  font-size: 32px;
  line-height: 32px;
  letter-spacing: -0.5px;
  margin-left: 15px;
  flex-shrink: 1;
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin-top: 30px;
  padding: 0px 20px;
  font-size: 18px;
  line-height: 22px;
`;

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function Detail({
  navigation: { setOptions },
  route: { params },
}: DetailScreenProps) {
  useEffect(() => {
    setOptions({
      title: 'original_title' in params ? 'Movie' : 'TV',
    });
  }, []);
  return (
    <Container>
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImagePath(params.backdrop_path || '') }}
        />
        <LinearGradient
          colors={['transparent', COLORS.black]}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster path={params.poster_path || ''} />
          <Title>
            {'original_title' in params
              ? params.original_title
              : params.original_name}
          </Title>
        </Column>
      </Header>
      <Overview>{params.overview}</Overview>
    </Container>
  );
}
