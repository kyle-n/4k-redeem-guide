import React from 'react';
import {connect} from 'react-redux';
import LoadingPage from './loading.page';
import {GlobalState} from '../models';
import {NavigationStackScreenProps} from 'react-navigation-stack';

const mapStateToProps = (state: GlobalState): LoadingPageContainerProps => {
  return {
    moviesNotDownloaded: !state.movies.length && !state.isLoading
  };
};

type LoadingPageContainerProps = {
  moviesNotDownloaded: boolean;
} & NavigationStackScreenProps;

const LoadingPageContainer = (props: LoadingPageContainerProps) => (
  <LoadingPage moviesNotDownloaded={props.moviesNotDownloaded} />
);

export default connect(mapStateToProps, null)(LoadingPageContainer);
