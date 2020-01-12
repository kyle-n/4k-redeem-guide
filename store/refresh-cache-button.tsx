import React from 'react';
import {Button, Icon} from 'native-base';

type RefreshCacheButtonProps = {};

const RefreshCacheButton = (props: RefreshCacheButtonProps) => {
  const showAlert = () => {};
  return (
    <Button onPress={showAlert}
            info transparent large>
      <Icon name="ios-refresh" ios="ios-refresh" android="md-refresh" />
    </Button>
  );
};

export default RefreshCacheButton;
