import React from 'react';
import {View, Text} from 'react-native';
import {initializeStore} from './movies.store';

const LoadingPage = (props: any) => {
  initializeStore().then(() => {
    props.navigation.navigate('Home')
  });
  return (
    <View>
      <Text>Loading movies</Text>
    </View>
  );
};

export default LoadingPage;
