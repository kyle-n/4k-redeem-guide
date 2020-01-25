import React from 'react';
import {CardSize, GlobalState} from '../models';
import {Button, Icon, Text, View} from 'native-base';
import {Platform, StyleSheet} from 'react-native';
import {baseFontSize} from '../styles';
import RefreshCacheButton from './refresh-cache-button';
import CameraButton from './camera-button';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {connect} from 'react-redux';
import {toggleCardSize, setQuery} from '../redux/actions';

const searchPageHeaderStyles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0
  },
  pageTitle: {
    fontSize: 2 * baseFontSize,
    padding: baseFontSize
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
  }
});

const mapStateToProps = (state: GlobalState) => {
  return {
    cardSize: state.cardSize,
    needsToDownloadMovies: !state.movies?.length
  };
};
const mapDispatchToProps = {toggleCardSize, setQuery};

type SearchPageHeaderProps = ReturnType<typeof mapStateToProps> & (typeof mapDispatchToProps);

const SearchPageHeader = (props: SearchPageHeaderProps) => {
  return props.needsToDownloadMovies ? (<View></View>) : (
    <View style={searchPageHeaderStyles.container}>
      <View>
        <Text style={searchPageHeaderStyles.pageTitle}>Search</Text>
      </View>
      <View style={searchPageHeaderStyles.buttonContainer}>
        {/*<RefreshCacheButton />*/}
        <SizeButton cardSize={props.cardSize} onPress={props.toggleCardSize}/>
        {/*<CameraButton />*/}
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
