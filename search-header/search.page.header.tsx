import React from 'react';
import {CardSize, GlobalState} from '../models';
import {Button, Icon, Text, View} from 'native-base';
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
import {clearMovieCache, toggleCardSize, setQuery} from '../redux/actions';
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
    cardSize: state.cardSize,
    needsToDownloadMovies: !state.movies?.length
  };
};
const mapDispatchToProps = {clearMovieCache, toggleCardSize, setQuery};

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
        <SizeButton cardSize={props.cardSize} onPress={props.toggleCardSize}/>
        <CameraButton />
      </View>
    </View>
  )
};

type SizeButtonProps = {
  cardSize: CardSize;
  onPress: () => void;
}

const SizeButton = (props: SizeButtonProps) => {
  const iconName = props.cardSize === 0 ? 'th-large' : 'th-list';
  return (
    <Button onPress={props.onPress}
            info transparent large>
      <Icon type="FontAwesome5" name={iconName} />
    </Button>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPageHeader);
