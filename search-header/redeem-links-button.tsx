import React from 'react';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {withNavigation} from 'react-navigation';
import {Button, Icon} from 'native-base';

type RedeemLinksButtonProps = NavigationStackScreenProps;

const RedeemLinksButton = (props: RedeemLinksButtonProps) => {
  const navToLinksPage = () => props.navigation.navigate('RedeemLinksPage');
  return (
    <Button onPress={navToLinksPage}
            info transparent large>
      <Icon name="external-link" type="FontAwesome" />
    </Button>
  );
};

export default withNavigation(RedeemLinksButton);
