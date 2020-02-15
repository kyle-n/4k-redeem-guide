import React from 'react';
import {Movie} from '../models';
import MovieCard from './movie-card';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import {sharedDynamicStyleSheet} from '../styles';

const pageStyles = StyleSheet.create({
  container: {
    overflow: 'scroll',
    alignSelf: 'stretch',
    flex: 1
  }
});

type MovieDetailsPageProps = {
  movie: Movie;
};

const MovieDetailsPage = (props: MovieDetailsPageProps) => {
  const sharedStyles = useDynamicStyleSheet(sharedDynamicStyleSheet);
  return (
    <ScrollView style={[
      pageStyles.container,
      sharedStyles.dynamicPageBackgroundColor
    ]}>
      <MovieCard movie={props.movie} open={true} />
    </ScrollView>
  );
};

export default MovieDetailsPage;
