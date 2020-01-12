import React from 'react';
import {ActivityIndicator, Alert, Modal, StyleSheet, View} from 'react-native';
import {hasValidLocalCache, initializeStore} from './movies.store';
import LoadingMessage from './loading-message';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {baseFontSize} from '../styles';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';
import {Button, Icon, Text} from 'native-base';

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
        this.init();
      } else {
        const netInfo = await NetInfo.fetch();
        if (!netInfo.details?.isConnectionExpensive) {
          // warn the user if they're about to download ~2.5MB on data
          Alert.alert(
            'Download movies on data?',
            'This will require approximately 3 MB.',
            [
              {text: 'Cancel', onPress: () => this.setState({showDownloadLaterMessage: true}), style: 'cancel'},
              {text: 'OK', onPress: () => this.init(), style: 'default'}
            ]
          )
        }
      }
    };
    checkBeforeDownload();

  }

  init = () => {
    initializeStore().then(() => {
      this.props.navigation.navigate('Home');
    });
  };


  render() {

    return (
      <View style={loadingPageStyles.topContainer}>
        <View style={loadingPageStyles.innerContainer}>
          {this.state.showDownloadLaterMessage ? null : (
            <ActivityIndicator size="large" />
          )}
        </View>
        <View style={loadingPageStyles.innerContainer}>
          {this.state.showDownloadLaterMessage ? (
            <Button onPress={() => this.setState({showDownloadLaterMessage: false}, this.init)}
                    warning rounded large>
              <Icon name="ios-download" ios="ios-download" android="md-download"
                    style={{fontSize: 2 * baseFontSize}} />
              <Text>Download movies</Text>
            </Button>
          ) : (
            <LoadingMessage navigation={this.props.navigation} />
          )}
        </View>
      </View>
    );
  }
}

export default LoadingPage;
