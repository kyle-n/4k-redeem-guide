import React from 'react';
import {Button, Icon} from 'native-base';

type CameraButtonProps = {};

const CameraButton = (props: CameraButtonProps) => (
  <Button onPress={() => {}}
          info transparent large>
    <Icon name="ios-camera" ios="ios-camera" android="md-camera" />
  </Button>
);

export default CameraButton;
