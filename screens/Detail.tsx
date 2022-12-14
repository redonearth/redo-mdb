import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Share,
} from 'react-native';
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
import Votes from '../components/Votes';

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

const Info = styled.View`
  flex-direction: row;
`;

const Column = styled.View`
  align-self: flex-end;
  margin-left: 15px;
  flex-shrink: 1;
`;

const Title = styled.Text`
  color: white;
  font-weight: 500;
  font-size: 32px;
  line-height: 32px;
  letter-spacing: -0.5px;
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

const isAndroid = Platform.OS === 'android';

export default function Detail({
  navigation: { setOptions },
  route: { params },
}: DetailScreenProps) {
  const isMovie = 'original_title' in params;

  const { isLoading, data } = useQuery(
    [isMovie ? 'movie' : 'tv', params.id],
    isMovie ? movieAPI.detail : tvAPI.detail
  );

  async function shareMedia() {
    const homepage =
      isMovie && 'imdb_id' in data
        ? `https://www.imdb.com/title/${data?.imdb_id}`
        : data?.homepage;

    if (isAndroid) {
      await Share.share({
        message: `${params.overview}\nCheck it out: ${homepage}`,
        title: isMovie ? params.original_title : params.original_name,
      });
    } else {
      await Share.share({
        url: homepage,
        title: isMovie ? params.original_title : params.original_name,
      });
    }
  }

  async function openYouTubeLink(videoId: string) {
    const baseUrl = `http://m.youtube.com/watch?v=${videoId}`;
    let browserPackage: string | undefined;

    if (isAndroid) {
      const tabsSupportingBrowsers =
        await WebBrowser.getCustomTabsSupportingBrowsersAsync();
      browserPackage = tabsSupportingBrowsers?.defaultBrowserPackage;
    }
    await WebBrowser.openBrowserAsync(baseUrl, { browserPackage });
  }

  useEffect(() => {
    setOptions({
      title: isMovie ? 'Movie' : 'TV',
    });
  }, []);

  useEffect(() => {
    if (data) {
      setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={shareMedia}>
            <Ionicons name="share-outline" color="white" size={24} />
          </TouchableOpacity>
        ),
      });
    }
  }, [data]);

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
        <Info>
          <Poster path={params.poster_path || ''} />
          <Column>
            <Title>
              {isMovie ? params.original_title : params.original_name}
            </Title>
            <Votes
              votes={params.vote_average}
              style={{
                marginTop: 8,
                fontSize: 16,
                color: '#f6e58d',
              }}
            />
          </Column>
        </Info>
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
