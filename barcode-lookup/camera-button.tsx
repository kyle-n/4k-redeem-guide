import React from 'react';
import {Button, Icon} from 'native-base';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {withNavigation} from 'react-navigation';

type CameraButtonProps = NavigationStackScreenProps;

const CameraButton = (props: CameraButtonProps) => {
  const navigateToCameraPage = () => props.navigation.navigate('CameraPage');
  return (
    <Button onPress={navigateToCameraPage}
            info transparent large>
      <Icon name="ios-camera" ios="ios-camera" android="md-camera" />
    </Button>
  );
};

export default withNavigation(CameraButton);
