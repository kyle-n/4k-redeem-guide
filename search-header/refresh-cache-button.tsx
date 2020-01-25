import React, {Ref} from 'react';
import {Button, Icon} from 'native-base';
import {Alert} from 'react-native';
import {clearMovieCache} from '../store/movies.store';
import {withNavigation} from 'react-navigation';
import {NavigationStackScreenProps} from 'react-navigation-stack';

type RefreshCacheButtonProps = NavigationStackScreenProps & {
  onPress: () => void;
};

const RefreshCacheButton = (props: RefreshCacheButtonProps) => {
  const clearCacheAndNavToLoadingPage = async () => {
    props.onPress();
    props.navigation.navigate('LoadingPage');
  };
  const showAlert = () => {
    Alert.alert(
      'Refresh movie catalog?',
      'It will automatically refresh after a week.',
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

export default withNavigation(RefreshCacheButton);
