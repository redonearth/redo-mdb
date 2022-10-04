import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/Stack';
import Poster from '../components/Poster';

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function Detail({
  navigation: { setOptions },
  route: { params },
}: DetailScreenProps) {
  useEffect(() => {
    setOptions({
      title:
        'original_title' in params
          ? params.original_title
          : params.original_name,
    });
  }, []);
  return (
    <Container>
      <Poster path={params.poster_path || ''} />
    </Container>
  );
}
