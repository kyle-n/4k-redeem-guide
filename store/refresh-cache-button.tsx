import React from 'react';
import {Button, Icon} from 'native-base';
import {Alert} from 'react-native';
import {clearMovieCache} from './movies.store';

type RefreshCacheButtonProps = {};

const RefreshCacheButton = () => {
  const clearCacheAndNavToLoadingPage = async () => {
    await clearMovieCache();
  };
  const showAlert = () => {
    Alert.alert(
      'Refresh movie catalog?',
      'It is recommended to do this on a good internet connection.',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', style: 'default', onPress: clearCacheAndNavToLoadingPage}
      ]
    );
  };
  return (
    <Button onPress={showAlert}
            info transparent large>
      <Icon name="ios-refresh" ios="ios-refresh" android="md-refresh" />
    </Button>
  );
};

export default RefreshCacheButton;
