import React from 'react';
import {GlobalState} from '../models';
import {Text, View} from 'native-base';
import {Platform} from 'react-native';
import {
  baseFontSize,
  darkBackgroundColor,
  lightGray,
  sharedDynamicStyleSheet, tabletMode
} from '../styles';
import RefreshCacheButton from './refresh-cache-button';
import CameraButton from './camera-button';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {connect} from 'react-redux';
import {clearMovieCache, setQuery} from '../redux/actions';
import {DynamicStyleSheet, DynamicValue, useDynamicStyleSheet} from 'react-native-dark-mode';
import TabletHeaderInputs from '../search/tablet-header-inputs';

const dynamicStyleSheet = new DynamicStyleSheet({
  container: {
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
    borderBottomWidth: new DynamicValue(1, 0),
    borderBottomColor: new DynamicValue(lightGray, darkBackgroundColor)
  },
  pageTitle: {
    fontSize: 2 * baseFontSize,
    padding: baseFontSize,
    color: new DynamicValue('black', 'white')
  },
  centerStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
});

const mapStateToProps = (state: GlobalState) => {
  return {
    needsToDownloadMovies: !state.movies?.length
  };
};
const mapDispatchToProps = {clearMovieCache, setQuery};

type SearchPageHeaderProps = ReturnType<typeof mapStateToProps> & (typeof mapDispatchToProps);

const SearchPageHeader = (props: SearchPageHeaderProps) => {
  const searchPageHeaderStyles = useDynamicStyleSheet(dynamicStyleSheet);
  const sharedStyles = useDynamicStyleSheet(sharedDynamicStyleSheet);
  return props.needsToDownloadMovies ? (<View></View>) : (
    <View style={[searchPageHeaderStyles.container, sharedStyles.dynamicBackgroundColor]}>
      <View style={searchPageHeaderStyles.centerStyle}>
        <Text style={searchPageHeaderStyles.pageTitle}>Search</Text>
      </View>
      {tabletMode() ? (
        <TabletHeaderInputs />
      ) : null}
      <View style={searchPageHeaderStyles.centerStyle}>
        <RefreshCacheButton onPress={props.clearMovieCache} />
        <CameraButton />
      </View>
    </View>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPageHeader);
