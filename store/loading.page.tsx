import React from 'react';
import {ActivityIndicator, Alert, Modal, StyleSheet, View} from 'react-native';
import {hasValidLocalCache, initializeStore} from './movies.store';
import LoadingMessage from './loading-message';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {baseFontSize} from '../styles';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';

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

  // setup

  const init = () => {
    initializeStore().then(() => {
      props.navigation.navigate('Home');
    });
  };

  const startup = async () => {
    await AsyncStorage.removeItem('movies');
    const hasCache = await hasValidLocalCache();
    if (hasCache) {
      init();
    } else {
      const netInfo = await NetInfo.fetch();
      if (!netInfo.details?.isConnectionExpensive) {
        // warn the user if they're about to download ~2.5MB on data
        Alert.alert(
          'Download movies on data?',
          'This will require approximately 3 MB.',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'OK', onPress: () => init(), style: 'default'}
          ]
        )
      }
    }
  };
  startup();

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
