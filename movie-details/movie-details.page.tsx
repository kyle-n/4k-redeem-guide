import React from 'react';
import {Movie} from '../models';
import MovieCard from './movie-card';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import {sharedDynamicStyleSheet, tabletMode} from '../styles';
import TabletLayout from './tablet-layout';

const pageStyles = StyleSheet.create({
  container: {
    overflow: 'scroll',
    alignSelf: 'stretch',
    flex: 1,
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
      {tabletMode() ? (
        <TabletLayout movie={props.movie} />
      ) : (
        <PhoneLayout movie={props.movie} />
      )}
    </ScrollView>
  );
};

export type LayoutProps = {
  movie: Movie;
};

const PhoneLayout = (props: LayoutProps) => (
  <MovieCard movie={props.movie} />
);

export default MovieDetailsPage;
