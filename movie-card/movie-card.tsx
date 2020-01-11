import React from 'react';
import {Movie} from '../models';
import {Body, Card, CardItem, Image, Left, Text, Thumbnail} from 'native-base';
import {StyleSheet} from 'react-native';
import MovieCardBody from './movie-card-body';
import MovieCardHeader from './movie-card-header';

type MovieCardProps = {
  movie: Movie;
};

const movieCardStyles = StyleSheet.create({
  card: {
    alignSelf: 'stretch'
  }
});

const MovieCard = (props: MovieCardProps) => (
  <Card style={movieCardStyles.card}>
    <MovieCardHeader imageUrl={props.movie.imageUrl}
                     title={props.movie.title}
                     studio={props.movie.studio}
                     year={props.movie.year} />
    <MovieCardBody movie={props.movie} />
  </Card>
);

export default MovieCard;
