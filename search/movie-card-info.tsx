import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Movie} from '../models';
import {baseColor} from '../styles';

type MovieCardInfoProps = {
  movie: Movie;
}

const movieCardInfoStyles = StyleSheet.create({
  main: {
    color: baseColor
  }
});

const MovieCardInfo = (props: MovieCardInfoProps) => (
  <View style={movieCardInfoStyles.main} nativeID="movie-card-info">
    <View nativeID="uhd-statuses">
      <Text>UHD Status</Text>
      <View>
        <Text>Vudu</Text>
      </View>
      <View>
        <Text>{props.movie.vuduUhd}</Text>
      </View>
    </View>
  </View>
);

export default MovieCardInfo;
