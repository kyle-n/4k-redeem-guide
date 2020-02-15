import React from 'react';
import {Movie} from '../models';
import MovieCard from './movie-card';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import {sharedDynamicStyleSheet, tabletMode} from '../styles';
import {View} from 'native-base';

const pageStyles = StyleSheet.create({
  container: {
    overflow: 'scroll',
    alignSelf: 'stretch',
    flex: 1,
  },
  tabletContainer: {
    display: 'flex',
    flexDirection: 'row'
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

type LayoutProps = {
  movie: Movie;
};

const TabletLayout = (props: LayoutProps) => (
  <View style={[pageStyles.tabletContainer]}>
    <PhoneLayout movie={props.movie} />
    <View></View>
  </View>
);

const PhoneLayout = (props: LayoutProps) => (
  <MovieCard movie={props.movie} open={true} />
);

export default MovieDetailsPage;
