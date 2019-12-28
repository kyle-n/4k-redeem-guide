import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Movie} from '../models';

type MovieCardProps = {
  movie: Movie;
};

const movieCardStyle = StyleSheet.create({
  mainCard: {
    flexDirection: 'column',
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid'
  }
});

const MovieCard = (props: MovieCardProps) => (
  <View style={movieCardStyle.mainCard}>
    <View>
      <Text>{props.movie.title}</Text>
    </View>
    <View>
      <Text>{props.movie.studio}</Text>
    </View>
  </View>
);

export default MovieCard;
