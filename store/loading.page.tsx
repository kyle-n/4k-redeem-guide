import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {initializeStore} from './movies.store';
import LoadingMessage from './loading-message';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {baseFontSize} from '../styles';

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
    justifyContent: 'center',
    paddingHorizontal: 2 * baseFontSize,
    marginBottom: baseFontSize
  }
});

type LoadingPageProps = NavigationStackScreenProps;

const LoadingPage = (props: LoadingPageProps) => {
  initializeStore().then(() => {
    props.navigation.navigate('Home')
  });
  return (
    <View style={loadingPageStyles.topContainer}>
      <View style={loadingPageStyles.innerContainer}>
        <ActivityIndicator size="large" />
      </View>
      <View style={loadingPageStyles.innerContainer}>
        <LoadingMessage navigation={props.navigation} />
      </View>
    </View>
  );
};

export default LoadingPage;
