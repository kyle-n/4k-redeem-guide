import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import LoadingMessage from './loading-message';
import {baseFontSize} from '../styles';
import {Button, Icon, Text} from 'native-base';
import {ExitOnBackButton} from '../shared-components';
import CheckBeforeDownload from './check-before-download';
import {NavigationStackProp} from 'react-navigation-stack';

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
  navigation: NavigationStackProp;
};
type LoadingPageState = {
  downloading: boolean;
  showDownloadAlert: boolean;
  initialRenderDone: boolean;
}

class LoadingPage extends React.Component<LoadingPageProps, LoadingPageState> {

  constructor(props: LoadingPageProps) {
    super(props);

    this.state = {
      downloading: false,
      showDownloadAlert: true,
      initialRenderDone: false
    };

  }

  downloadMovies = (): void => {
    this.setState({downloading: true}, () => {
      this.props.downloadMovies();
    });
  };

  render() {
    const onDownloadAlertCancel = (): void => {
      this.setState({showDownloadAlert: false, downloading: false, initialRenderDone: true});
    };
    const onDownloadAlertConfirm = (): void => {
      this.setState({showDownloadAlert: false, initialRenderDone: true}, this.downloadMovies);
    };

    return (
      <View style={loadingPageStyles.topContainer}>

        {/* Back listener util */}
        <ExitOnBackButton />

        {/* Download movies if on WiFi, show alert if not */}
        {this.state.showDownloadAlert ? (
          <CheckBeforeDownload onCancel={onDownloadAlertCancel}
                               onConfirm={onDownloadAlertConfirm} />
        ) : null}

        {/* Loading spinner if downloading */}
        <View style={loadingPageStyles.innerContainer}>
          {this.state.downloading ? (
            <ActivityIndicator size="large" />
          ) : null}
        </View>

        {/* Loading messages if downloading, download button if not */}
        <View style={loadingPageStyles.innerContainer}>
          {this.state.downloading && !this.state.showDownloadAlert ? (
            <LoadingMessage navigation={this.props.navigation} />
          ) : ( this.state.initialRenderDone ? (
              <DownloadMoviesButton onPress={this.downloadMovies}/>
            ) : null
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
