import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Movie} from '../models';
import {baseColor, baseFontSize} from '../styles';
import MovieCardInfo from './movie-card-info';

type MovieCardProps = {
  movie: Movie;
};

const movieCardStyle = StyleSheet.create({
  mainCard: {
    flexDirection: 'column',
    borderColor: baseColor,
    borderWidth: 1,
    borderStyle: 'solid',
    width: '95%',
    borderRadius: 10,
    shadowColor: baseColor,
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 50,
    shadowRadius: 5,
    zIndex: 1,
    position: 'relative',
    padding: baseFontSize,
    alignSelf: 'center',
    marginVertical: baseFontSize
  },
  header: {
  },
  title: {
    fontSize: 2 * baseFontSize,
    color: baseColor
  },
  regular: {
    fontSize: baseFontSize,
    color: baseColor
  }
});

const MovieCard = (props: MovieCardProps) => (
  <View style={movieCardStyle.mainCard}>
    <View style={movieCardStyle.header}>
      <Text style={movieCardStyle.title}>{props.movie.title}</Text>
    </View>
    <View>
      <Text style={movieCardStyle.regular}>{props.movie.studio}</Text>
      <MovieCardInfo movie={props.movie}/>
    </View>
  </View>
);

export default MovieCard;
