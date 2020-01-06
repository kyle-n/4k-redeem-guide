import React from 'react';
import {Movie} from '../models';
import {Body, Card, CardItem, Image, Left, Text, Thumbnail} from 'native-base';
import {StyleSheet} from 'react-native';
import MovieCardBody from './movie-card-body';

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

type MovieCardHeaderProps = {
  imageUrl: string;
  title: string;
  studio: string;
  year?: number;
}

const MovieCardHeader = (props: MovieCardHeaderProps) => (
  <CardItem header>
    <Left>
      <Thumbnail source={{uri: props.imageUrl}} />
      <Body>
        <Text>{props.title}</Text>
        <Text note>
          {props.studio}
          {props.year ? ', ' + props.year : null}
        </Text>
      </Body>
    </Left>
  </CardItem>
);

export default MovieCard;
