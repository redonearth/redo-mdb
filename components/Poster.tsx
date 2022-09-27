import React from 'react';
import styled from 'styled-components/native';
import { makeImagePath } from '../utils';

const Image = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.5);
`;

interface PosterProps {
  path: string;
}

export default function Poster({ path }: PosterProps) {
  return <Image source={{ uri: makeImagePath(path) }} />;
}
