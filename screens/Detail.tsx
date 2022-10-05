import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { Dimensions, Image, Platform, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/Stack';
import { makeImagePath } from '../utils';
import { LinearGradient } from 'expo-linear-gradient';
import Poster from '../components/Poster';
import COLORS from '../colors';
import { useQuery } from 'react-query';
import { movieAPI, tvAPI } from '../api';
import Loader from '../components/Loader';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';

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

const Data = styled.View`
  padding: 0px 20px;
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 18px;
  line-height: 22px;
  margin: 30px 0px 20px;
`;

const VideoButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  padding: 8px 0px;
  margin-left: 8px;
`;

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function Detail({
  navigation: { setOptions },
  route: { params },
}: DetailScreenProps) {
  const isMovie = 'original_title' in params;
  const { isLoading, data } = useQuery(
    [isMovie ? 'movie' : 'tv', params.id],
    isMovie ? movieAPI.detail : tvAPI.detail
  );

  useEffect(() => {
    setOptions({
      title: 'original_title' in params ? 'Movie' : 'TV',
    });
  }, []);

  async function openYouTubeLink(videoId: string) {
    const baseUrl = `http://m.youtube.com/watch?v=${videoId}`;
    let browserPackage: string | undefined;

    if (Platform.OS === 'android') {
      const tabsSupportingBrowsers =
        await WebBrowser.getCustomTabsSupportingBrowsersAsync();
      browserPackage = tabsSupportingBrowsers?.defaultBrowserPackage;
    }
    await WebBrowser.openBrowserAsync(baseUrl, { browserPackage });
  }

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
      <Data>
        <Overview>{params.overview}</Overview>
        {isLoading ? <Loader /> : null}
        {data?.videos?.results?.map((video: any) => (
          <VideoButton
            key={video.key}
            onPress={() => openYouTubeLink(video.key)}
          >
            <Ionicons name="logo-youtube" color="white" size={24} />
            <ButtonText>{video.name}</ButtonText>
          </VideoButton>
        ))}
      </Data>
    </Container>
  );
}
