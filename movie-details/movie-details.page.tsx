import React from 'react';
import {Movie} from '../models';
import MovieCard from './movie-card';

type MovieDetailsPageProps = {
  movie: Movie;
};

const MovieDetailsPage = (props: MovieDetailsPageProps) => {
  return (
    <MovieCard movie={props.movie} open={true} />
  );
};

export default MovieDetailsPage;
