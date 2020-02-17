import React from 'react';
import {headerDynamicSheet} from '../search-header/search.page.header';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import {sharedDynamicStyleSheet} from '../styles';
import {Text, View} from 'native-base';
import {withNavigation} from 'react-navigation';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {BackButton, HiddenBackButton} from '../shared-components';

type MovieDetailsPageHeaderProps = {} & NavigationStackScreenProps;

const MovieDetailsPageHeader = (props: MovieDetailsPageHeaderProps) => {
  const searchHeaderStyles = useDynamicStyleSheet(headerDynamicSheet);
  const sharedStyles = useDynamicStyleSheet(sharedDynamicStyleSheet);
  const goBack = () => props.navigation.goBack();
  return (
    <View style={[
      searchHeaderStyles.container,
      sharedStyles.dynamicBackgroundColor
    ]}>
      <View style={searchHeaderStyles.centerStyle}>
        <BackButton onPress={goBack} />
      </View>
      <View style={searchHeaderStyles.centerStyle}>
        <Text style={searchHeaderStyles.pageTitle}>Details</Text>
      </View>
      <HiddenBackButton />
    </View>
  );
};

export default withNavigation(MovieDetailsPageHeader);
