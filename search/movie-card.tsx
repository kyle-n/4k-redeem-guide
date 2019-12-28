import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Movie} from '../models';
import {baseFontSize} from '../styles';

type MovieCardProps = {
  movie: Movie;
};

const movieCardStyle = StyleSheet.create({
  mainCard: {
    flexDirection: 'column',
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
    width: '95%',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 50,
    shadowRadius: 5,
    zIndex: 1,
    position: 'relative',
    padding: baseFontSize,
    alignSelf: 'center',
    marginVertical: baseFontSize
  },
  title: {
    fontSize: 2 * baseFontSize
  },
  regular: {
    fontSize: baseFontSize
  }
});

const MovieCard = (props: MovieCardProps) => (
  <View style={movieCardStyle.mainCard}>
    <View>
      <Text style={movieCardStyle.title}>{props.movie.title}</Text>
    </View>
    <View>
      <Text style={movieCardStyle.regular}>{props.movie.studio}</Text>
    </View>
  </View>
);

export default MovieCard;
