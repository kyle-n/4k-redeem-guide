import React from 'react';
import {withNavigation} from 'react-navigation';
import {Movie} from '../../models';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import MovieCard from '../../movie-details/movie-card';

type MovieCardLinkProps = {
  movie: Movie;
} & NavigationStackScreenProps;

const MovieCardLink = (props: MovieCardLinkProps) => {
  const navToDetailsPage = (): void => props.navigation.navigate('MovieDetailsPage', {movie: props.movie});
  return (
    <MovieCard movie={props.movie} onPressHeader={navToDetailsPage}
               open={false} />
  );
};

export default MovieCardLink;