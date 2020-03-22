import React from 'react';
import {Button} from 'native-base';
import {Alert} from 'react-native';
import {withNavigation} from 'react-navigation';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {DownloadIcon} from '../shared-components';

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
      <DownloadIcon />
    </Button>
  );
};

export default withNavigation(RefreshCacheButton);
