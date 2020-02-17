import React from 'react';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {Movie} from '../models';
import MovieDetailsPage from './movie-details.page';

type MovieDetailsPageContainerProps = NavigationStackScreenProps;

const MovieDetailsPageContainer = (props: MovieDetailsPageContainerProps) => {
  const movie: Movie = props.navigation.getParam('movie');
  return (
    <MovieDetailsPage movie={movie} />
  );
};

export default MovieDetailsPageContainer;
