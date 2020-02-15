import React from 'react';
import {Movie} from '../models';
import MovieCard from '../search/results/movie-card-link';

type MovieDetailsPageProps = {
  movie: Movie;
};

const MovieDetailsPage = (props: MovieDetailsPageProps) => {
  return (
    <MovieCard movie={props.movie} />
  );
};

export default MovieDetailsPage;
