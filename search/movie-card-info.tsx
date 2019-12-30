import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Movie} from '../models';
import {baseColor} from '../styles';

type MovieCardInfoProps = {
  movie: Movie;
}

const MovieCardInfo = (props: MovieCardInfoProps) => (
  <View nativeID="movie-card-info">
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
