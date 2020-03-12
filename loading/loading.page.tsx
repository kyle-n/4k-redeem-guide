import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import LoadingMessage from './loading-message';
import {baseFontSize, sharedDynamicStyleSheet} from '../styles';
import {Button, Icon, Text} from 'native-base';
import {DownloadIcon, ExitOnBackButton} from '../shared-components';
import CheckBeforeDownload from './check-before-download';
import {useDynamicStyleSheet} from 'react-native-dark-mode';

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

  private downloadMovies = (): void => {
    this.setState({downloading: true}, () => {
      this.props.downloadMovies();
    });
  };

  private onDownloadAlertCancel = (): void => {
    this.setState({showDownloadAlert: false, downloading: false, initialRenderDone: true});
  };
  private onDownloadAlertConfirm = (): void => {
    this.setState({showDownloadAlert: false, initialRenderDone: true}, this.downloadMovies);
  };

  render() {

    return (
      <LoadingPageLayout downloadMovies={this.downloadMovies}
                         onDownloadAlertCancel={this.onDownloadAlertCancel}
                         onDownloadAlertConfirm={this.onDownloadAlertConfirm}
                         downloading={this.state.downloading}
                         showDownloadAlert={this.state.showDownloadAlert}
                         initialRenderDone={this.state.initialRenderDone}
                         />
    );
  }
}

type LoadingPageLayoutProps = {
  onDownloadAlertCancel: () => void;
  onDownloadAlertConfirm: () => void;
  downloading: boolean;
  showDownloadAlert: boolean;
  downloadMovies: () => void;
  initialRenderDone: boolean;
};

const LoadingPageLayout = (props: LoadingPageLayoutProps) => {
  const sharedStyles = useDynamicStyleSheet(sharedDynamicStyleSheet);
  return (
    <View style={[loadingPageStyles.topContainer, sharedStyles.dynamicColor]}>

      {/* Back listener util */}
      <ExitOnBackButton />

      {/* Download movies if on WiFi, show alert if not */}
      {props.showDownloadAlert ? (
        <CheckBeforeDownload onCancel={props.onDownloadAlertCancel}
                             onConfirm={props.onDownloadAlertConfirm} />
      ) : null}

      {/* Loading spinner if downloading */}
      <View style={loadingPageStyles.innerContainer}>
        {props.downloading ? (
          <ActivityIndicator size="large" />
        ) : null}
      </View>

      {/* Loading messages if downloading, download button if not */}
      <View style={loadingPageStyles.innerContainer}>
        {props.downloading && !props.showDownloadAlert ? (
          <LoadingMessage />
        ) : ( props.initialRenderDone ? (
            <DownloadMoviesButton onPress={props.downloadMovies}/>
          ) : null
        )}
      </View>
    </View>
  );
};

type DownloadMoviesButtonProps = {
  onPress: () => void;
}
const DownloadMoviesButton = (props: DownloadMoviesButtonProps) => (
  <Button onPress={props.onPress}
          warning rounded large iconLeft>
    <DownloadIcon />
    <Text>Download movies</Text>
  </Button>
);

export default LoadingPage;
