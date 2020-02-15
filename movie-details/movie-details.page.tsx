import React from 'react';
import {Movie} from '../models';
import MovieCard from './movie-card';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {DynamicStyleSheet} from 'react-native-dark-mode';

const pageStyles = StyleSheet.create({
  container: {
    overflow: 'scroll',
    alignSelf: 'stretch',
    flex: 1
  }
});

const dynamicStyles = new DynamicStyleSheet()

type MovieDetailsPageProps = {
  movie: Movie;
};

const MovieDetailsPage = (props: MovieDetailsPageProps) => {
  return (
    <ScrollView style={pageStyles.container}>
      <MovieCard movie={props.movie} open={true} />
    </ScrollView>
  );
};

export default MovieDetailsPage;
