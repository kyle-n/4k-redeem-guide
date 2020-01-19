import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import LoadingMessage from './loading-message';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {baseFontSize} from '../styles';
import {Button, Icon, Text} from 'native-base';
import {ExitOnBackButton} from '../shared-components';
import CheckBeforeDownload from './check-before-download';

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

type LoadingPageProps = {
  moviesNotDownloaded: boolean;
  downloadMovies: Function;
};

class LoadingPage extends React.Component<LoadingPageProps, LoadingPageState> {

  constructor(props: LoadingPageProps) {
    super(props);

    this.state = {
      showDownloadLaterMessage: false,
      showDownloadAlert: true
    };

  }

  init = (hasCache: boolean) => {
    // initializeStore(hasCache).then(() => {
    //   this.props.navigation.navigate('Home');
    // });
  };

  onDownloadMoviesPress = () => {
    this.setState({showDownloadLaterMessage: false}, () => {
      // this.init(false);
    });
  };

  render() {
    const onDownloadAlertCancel = () => {
      this.setState({showDownloadAlert: false, showDownloadLaterMessage: true});
    };
    const onDownloadAlertConfirm = (hasCache: boolean) => {
      this.setState({showDownloadAlert: false}, () => this.init(hasCache));
    };

    return (
      <View style={loadingPageStyles.topContainer}>

        {/* Back listener util */}
        <ExitOnBackButton />

        {/* Hide download alert after selection */}
        {this.state.showDownloadAlert ? (
          <CheckBeforeDownload onCancel={onDownloadAlertCancel}
                               onConfirm={onDownloadAlertConfirm} />
        ) : null}

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
