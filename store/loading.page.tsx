import React from 'react';
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Modal,
  NativeEventSubscription,
  Platform,
  StyleSheet,
  View
} from 'react-native';
import {hasValidLocalCache, initializeStore} from './movies.store';
import LoadingMessage from './loading-message';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {baseFontSize} from '../styles';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';
import {Button, Icon, Text} from 'native-base';
import {ExitOnBackButton} from '../shared-components';

const loadingPageStyles = StyleSheet.create({
  topContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'center'
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 2 * baseFontSize,
    marginBottom: baseFontSize
  }
});

type LoadingPageProps = NavigationStackScreenProps;
type LoadingPageState = {
  showDownloadLaterMessage: boolean;
};

class LoadingPage extends React.Component<LoadingPageProps, LoadingPageState> {

  constructor(props: LoadingPageProps) {
    super(props);

    this.state = {showDownloadLaterMessage: false};

    const checkBeforeDownload = async () => {
      await AsyncStorage.removeItem('movies');
      const hasCache = await hasValidLocalCache();
      if (hasCache) {
        this.init(hasCache);
      } else {
        const netInfo = await NetInfo.fetch();
        if (!netInfo.details?.isConnectionExpensive) {
          // warn the user if they're about to download ~2.5MB on data
          Alert.alert(
            'Download 3 MB on data?',
            'It may take a few minutes on a slow connection.',
            [
              {text: 'Cancel', onPress: () => this.setState({showDownloadLaterMessage: true}), style: 'cancel'},
              {text: 'OK', onPress: () => this.init(hasCache), style: 'default'}
            ]
          )
        }
      }
    };
    checkBeforeDownload();
  }

  init = (hasCache: boolean) => {
    initializeStore(hasCache).then(() => {
      this.props.navigation.navigate('Home');
    });
  };

  onDownloadMoviesPress = () => {
    this.setState({showDownloadLaterMessage: false}, () => {
      this.init(false);
    });
  };

  render() {

    return (
      <View style={loadingPageStyles.topContainer}>
        <ExitOnBackButton />
        <View style={loadingPageStyles.innerContainer}>
          {this.state.showDownloadLaterMessage ? null : (
            <ActivityIndicator size="large" />
          )}
        </View>
        <View style={loadingPageStyles.innerContainer}>
          {this.state.showDownloadLaterMessage ? (
            <DownloadMoviesButton onPress={this.onDownloadMoviesPress}/>
          ) : (
            <LoadingMessage navigation={this.props.navigation} />
          )}
        </View>
      </View>
    );
  }
}

type DownloadMoviesButtonProps = {
  onPress: () => void;
}
const DownloadMoviesButton = (props: DownloadMoviesButtonProps) => (
  <Button onPress={props.onPress}
          warning rounded large>
    <Icon name="ios-download" ios="ios-download" android="md-download"
          style={{fontSize: 2 * baseFontSize}} />
    <Text>Download movies</Text>
  </Button>
);

export default LoadingPage;
