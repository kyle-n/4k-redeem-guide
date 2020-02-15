import React from 'react';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import {headerDynamicSheet} from '../search-header/search.page.header';
import {Text, View} from 'native-base';
import {sharedDynamicStyleSheet} from '../styles';
import {withNavigation} from 'react-navigation';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {CloseButton, HiddenBackButton, BackButton} from '../shared-components';

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

export default withNavigation(RedeemLinksHeader);
