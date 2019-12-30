import React from 'react';
import {Movie} from '../models';
import MovieCardInfo from './movie-card-info';
import {Body, Card, CardItem, Image, Left, Text, Thumbnail} from 'native-base';
import {StyleSheet} from 'react-native';

type MovieCardProps = {
  movie: Movie;
};

const movieCardStyles = StyleSheet.create({
  card: {
    width: '95%'
  }
});

const MovieCard = (props: MovieCardProps) => (
  <Card style={movieCardStyles.card}>
    <CardItem header>
      <Left>
        <Thumbnail source={{uri: props.movie.imageUrl}} />
        <Body>
          <Text>{props.movie.title}</Text>
          <Text note>
            {props.movie.studio}
            {props.movie.year ? ', ' + props.movie.year : null}
          </Text>
        </Body>
      </Left>
    </CardItem>
    <CardItem>
      <Text>{props.movie.knownIssues}</Text>
    </CardItem>
  </Card>
);

export default MovieCard;
