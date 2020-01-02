import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {initializeStore} from './movies.store';

const loadingPageStyles = StyleSheet.create({
  topContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'center'
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

const LoadingPage = () => {
  initializeStore().then(() => {
    // props.navigation.navigate('Home')
  });
  return (
    <View style={loadingPageStyles.topContainer}>
      <View style={loadingPageStyles.innerContainer}>
        <ActivityIndicator size="large" />
      </View>
    </View>
  );
};

export default LoadingPage;
