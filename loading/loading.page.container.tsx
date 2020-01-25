import React from 'react';
import {connect} from 'react-redux';
import LoadingPage from './loading.page';
import {GlobalState} from '../models';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {downloadMovies} from '../redux/actions';

type LoadingPageContainerProps = {
  moviesNotDownloaded: boolean;
  downloadMovies: Function;
} & NavigationStackScreenProps;

const LoadingPageContainer = (props: LoadingPageContainerProps) => (
  <LoadingPage moviesNotDownloaded={props.moviesNotDownloaded}
               downloadMovies={props.downloadMovies}
               navigation={props.navigation} />
);

const mapStateToProps = (state: GlobalState): any => {
  return {
    moviesNotDownloaded: !state.movies.length && !state.isLoading
  };
};
const mapDispatchToProps = {downloadMovies};

export default connect(mapStateToProps, mapDispatchToProps)(LoadingPageContainer);
