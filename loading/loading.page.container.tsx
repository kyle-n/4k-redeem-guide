import React from 'react';
import {connect} from 'react-redux';
import LoadingPage from './loading.page';
import {GlobalState} from '../models';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {downloadMovies} from '../redux/actions';

type LoadingPageContainerProps = {
  autoDownloadOnData: boolean;
  moviesNotDownloaded: boolean;
  downloadMovies: Function;
} & NavigationStackScreenProps;

export const LoadingPageContainer = (props: LoadingPageContainerProps) => {
  if (!props.moviesNotDownloaded) {
    props.navigation.navigate('Home');
  }
  return props.moviesNotDownloaded ? (
    <LoadingPage moviesNotDownloaded={props.moviesNotDownloaded}
                 autoDownloadOnData={props.autoDownloadOnData}
                 downloadMovies={props.downloadMovies} />
  ) : null;
};

const mapStateToProps = (state: GlobalState): any => {
  return {
    moviesNotDownloaded: !state.movies.length,
    autoDownloadOnData: state.autoDownloadOnData
  };
};
const mapDispatchToProps = {downloadMovies};

export default connect(mapStateToProps, mapDispatchToProps)(LoadingPageContainer);
