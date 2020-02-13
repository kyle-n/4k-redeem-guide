import React from 'react';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import {headerDynamicSheet} from '../search-header/search.page.header';
import {Button, Icon, Text, View} from 'native-base';
import {sharedDynamicStyleSheet} from '../styles';
import {Platform, StyleSheet} from 'react-native';
import {withNavigation} from 'react-navigation';
import {NavigationStackScreenProps} from 'react-navigation-stack';

const redeemStyles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start'
  }
});

type RedeemLinksHeaderProps = NavigationStackScreenProps;

const RedeemLinksHeader = (props: RedeemLinksHeaderProps) => {
  const headerStyles = useDynamicStyleSheet(headerDynamicSheet);
  const sharedStyles = useDynamicStyleSheet(sharedDynamicStyleSheet);
  const goBack = () => props.navigation.goBack();
  return (
    <View style={[
      headerStyles.container,
      sharedStyles.dynamicColor,
      redeemStyles.container
    ]}>
      <View style={headerStyles.centerStyle}>
        <BackButton onPress={goBack} />
      </View>
      <View style={headerStyles.centerStyle}>
        <Text style={headerStyles.pageTitle}>Redeem links</Text>
      </View>
    </View>
  );
};

type BackButtonProps = {
  onPress: () => void;
}

const BackButton = (props: BackButtonProps) => {
  const sharedStyles = useDynamicStyleSheet(sharedDynamicStyleSheet);
  return (
    <Button onPress={props.onPress}
            dark transparent large iconLeft={Platform.OS === 'ios'}>
      <Icon name="ios-arrow-back" ios="ios-arrow-back" android="md-arrow-back"
            style={[sharedStyles.dynamicTextColor]} />
      <Text style={sharedStyles.dynamicTextColor}>Back</Text>
    </Button>
  );
};

export default withNavigation(RedeemLinksHeader);
