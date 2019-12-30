import React from 'react';
import {Movie} from '../models';
import MovieCardInfo from './movie-card-info';
import {Body, Card, CardItem, Image, Left, Text, Thumbnail} from 'native-base';

type MovieCardProps = {
  movie: Movie;
};

const MovieCard = (props: MovieCardProps) => (
  <Card>
    <CardItem>
      <Left>
        <Thumbnail source={{uri: props.movie.imageUrl}} />
        <Body>
          <Text>{props.movie.title}</Text>
          <Text note>{props.movie.studio}</Text>
        </Body>
      </Left>
    </CardItem>
    <CardItem cardBody>
      <Text>{props.movie.knownIssues}</Text>
      <Text>{props.movie.imageUrl}</Text>
    </CardItem>
  </Card>
);

export default MovieCard;
