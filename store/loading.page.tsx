import React from 'react';
import {View, Text} from 'react-native';
import {Navigation} from 'react-native-navigation';

const LoadingPage = () => {
  console.log('loading page')
  return (
    <View>
      <Text>Loading movies</Text>
    </View>
  );
};

Navigation.registerComponent('LoadingPage', () => LoadingPage);

export default LoadingPage;
