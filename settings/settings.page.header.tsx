import React from 'react';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import {headerDynamicSheet} from '../search-header/search.page.header';
import {Text, View} from 'native-base';
import {sharedDynamicStyleSheet} from '../styles';
import {withNavigation} from 'react-navigation';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {CloseButton, HiddenBackButton, BackButton} from '../shared-components';

type SettingsPageHeaderProps = NavigationStackScreenProps & {};

const SettingsPageHeader = (props: SettingsPageHeaderProps) => {
  const headerStyles = useDynamicStyleSheet(headerDynamicSheet);
  const sharedStyles = useDynamicStyleSheet(sharedDynamicStyleSheet);
  const goBack = (): void => {
    props.navigation.goBack();
  };
  return (
    <View style={[
      headerStyles.container,
      sharedStyles.dynamicColor,
      headerStyles.centerStyle
    ]}>
      <View style={headerStyles.centerStyle}>
        <BackButton onPress={goBack} />
      </View>
      <View style={headerStyles.centerStyle}>
        <Text style={headerStyles.pageTitle}>Settings</Text>
      </View>
      <View>
        <HiddenBackButton/>
      </View>
    </View>
  );
};

export default withNavigation(SettingsPageHeader);
