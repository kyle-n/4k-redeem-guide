import React from 'react';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {withNavigation} from 'react-navigation';
import {Button, Icon} from 'native-base';
import {tabletMode} from '../styles';

type RedeemLinksButtonProps = NavigationStackScreenProps & {
  onPressOnTablet: () => void | undefined;
};

const RedeemLinksButton = (props: RedeemLinksButtonProps) => {
  const navToLinksPage = () => props.navigation.navigate('RedeemLinksPage');
  return (
    <Button onPress={tabletMode() ? props.onPressOnTablet : navToLinksPage}
            info transparent large>
      <Icon name="external-link" type="FontAwesome" />
    </Button>
  );
};

export default withNavigation(RedeemLinksButton);
