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

const LoadingPageContainer = (props: LoadingPageContainerProps) => {
  if (!props.moviesNotDownloaded) {
    console.log('GOT MOVIES')
    props.navigation.navigate('Home');
  }
  return props.moviesNotDownloaded ? (
    <LoadingPage moviesNotDownloaded={props.moviesNotDownloaded}
                 downloadMovies={props.downloadMovies} />
  ) : null;
};

const mapStateToProps = (state: GlobalState): any => {
  return {
    moviesNotDownloaded: !state.movies.length
  };
};
const mapDispatchToProps = {downloadMovies};

export default connect(mapStateToProps, mapDispatchToProps)(LoadingPageContainer);
