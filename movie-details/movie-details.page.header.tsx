import React from 'react';
import {headerDynamicSheet} from '../search-header/search.page.header';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import {sharedDynamicStyleSheet} from '../styles';
import {View} from 'native-base';

type MovieDetailsPageHeaderProps = {
  isModal?: boolean;
};

const MovieDetailsPageHeader = () => {
  const searchHeaderStyles = useDynamicStyleSheet(headerDynamicSheet);
  const sharedStyles = useDynamicStyleSheet(sharedDynamicStyleSheet);
  return (
    <View style={[
      searchHeaderStyles.container,
      sharedStyles.dynamicBackgroundColor
    ]}>
      <View style={searchHeaderStyles.centerStyle}>

      </View>
    </View>
  );
};

export default MovieDetailsPageHeader;
