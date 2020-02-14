import React from 'react';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import {headerDynamicSheet} from '../search-header/search.page.header';
import {Button, Icon, Text, View} from 'native-base';
import {baseFontSize, sharedDynamicStyleSheet} from '../styles';
import {Platform} from 'react-native';
import {withNavigation} from 'react-navigation';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {LargeXIcon} from '../shared-components';

type RedeemLinksHeaderProps = NavigationStackScreenProps & {
  isModal?: boolean;
  onPressClose: () => void | undefined;
};

const RedeemLinksHeader = (props: RedeemLinksHeaderProps) => {
  const headerStyles = useDynamicStyleSheet(headerDynamicSheet);
  const sharedStyles = useDynamicStyleSheet(sharedDynamicStyleSheet);
  const goBack = () => props.navigation.goBack();
  return (
    <View style={[
      headerStyles.container,
      sharedStyles.dynamicColor,
      headerStyles.centerStyle
    ]}>
      {props.isModal ? (<HiddenBackButton />) : (
        <View style={headerStyles.centerStyle}>
          <BackButton onPress={goBack} />
        </View>
      )}
      <View style={headerStyles.centerStyle}>
        <Text style={headerStyles.pageTitle}>Redeem links</Text>
      </View>
      {props.isModal ? (
          <CloseButton onPress={props.onPressClose} />
      ) : (
        <HiddenBackButton />
      )}
    </View>
  );
};

type CloseButtonProps = {
  onPress: () => void | undefined;
};

const CloseButton = (props: CloseButtonProps) => {
  const sharedStyles = useDynamicStyleSheet(sharedDynamicStyleSheet);
  return (
    <View style={{margin: baseFontSize}}>
      <Button onPress={props.onPress}
              warning large bordered style={sharedStyles.squareEntity}>
        <LargeXIcon />
      </Button>
    </View>
  );
};

type BackButtonProps = {
  onPress?: () => void;
};

const HiddenBackButton = () => (
  <View style={{opacity: 0}}>
    <BackButton />
  </View>
);

const BackButton = (props: BackButtonProps) => {
  const sharedStyles = useDynamicStyleSheet(sharedDynamicStyleSheet);
  return (
    <Button onPress={props.onPress ? props.onPress : undefined}
            dark transparent large iconLeft={Platform.OS === 'ios'}>
      <Icon name="ios-arrow-back" ios="ios-arrow-back" android="md-arrow-back"
            style={[sharedStyles.dynamicTextColor]} />
      <Text style={sharedStyles.dynamicTextColor}>Back</Text>
    </Button>
  );
};

export default withNavigation(RedeemLinksHeader);
