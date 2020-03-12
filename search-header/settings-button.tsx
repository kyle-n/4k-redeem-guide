import React from 'react';
import {withNavigation} from 'react-navigation';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {Button, Icon} from 'native-base';

type SettingsButtonProps = NavigationStackScreenProps & {};

const SettingsButton = (props: SettingsButtonProps) => {
  const navToSettings = (): void => {
    props.navigation.navigate('SettingsPage');
  };

  return (
    <Button onPress={navToSettings}
            info transparent large>
      <Icon name="ios-settings" android="md-settings" ios="ios-settings" />
    </Button>
  )
};

export default withNavigation(SettingsButton);
