import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const Movies = ({ navigation: { navigate } }) => (
  <TouchableOpacity
    onPress={() => navigate('Stack', { screen: 'Three' })}
    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
  >
    <Text>Movies</Text>
  </TouchableOpacity>
);

export default Movies;
