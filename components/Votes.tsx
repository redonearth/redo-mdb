import React from 'react';
import styled from 'styled-components/native';
import { useColorScheme } from 'react-native';

const Text = styled.Text<{ isDark: boolean }>`
  color: ${(props) =>
    props.isDark ? 'rgba(255, 255, 255, 0.75)' : 'rgba(0, 0, 0, 0.75)'};
  font-size: 10px;
  font-weight: 500;
`;

interface VotesProps {
  votes: number;
}

export default function Votes({ votes }: VotesProps) {
  const isDark = useColorScheme() === 'dark';
  return (
    <Text isDark={isDark}>{votes > 0 ? `★ ${votes}/10` : `Coming Soon`}</Text>
  );
}
