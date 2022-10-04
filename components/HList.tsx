import React from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import VMedia from './VMedia';
import { Movie, TV } from '../api';

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ListTitle = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? 'white' : 'black')};
  font-size: 20px;
  font-weight: 600;
  margin-left: 30px;
  margin-bottom: 15px;
`;

export const HListSeperator = styled.View`
  width: 15px;
`;

interface HListProps {
  isDark: boolean;
  title: string;
  data: any[];
}

export default function HList({ isDark, title, data }: HListProps) {
  return (
    <ListContainer>
      <ListTitle isDark={isDark}>{title}</ListTitle>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 30 }}
        ItemSeparatorComponent={HListSeperator}
        keyExtractor={(item: Movie | TV) => String(item.id)}
        renderItem={({ item }: { item: Movie | TV }) => (
          <VMedia
            posterPath={item.poster_path || ''}
            originalTitle={
              'original_title' in item
                ? item.original_title
                : item.original_name
            }
            voteAverage={item.vote_average}
            fullData={item}
          />
        )}
      />
    </ListContainer>
  );
}
