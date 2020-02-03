import React from 'react';
import {CardSize, Movie} from '../../models';
import {Button, Text, View} from 'native-base';
import MovieCard from './movie-card/movie-card';
import {Keyboard, StyleSheet} from 'react-native';
import {baseFontSize, sharedDynamicStyleSheet} from '../../styles';
import {FlatList} from 'react-native-gesture-handler';
import {useDynamicStyleSheet} from 'react-native-dark-mode';

const resultsContainerStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    borderBottomWidth: 0,
    paddingHorizontal: baseFontSize / 1.5
  },
  containerWithButton: {
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    paddingBottom: baseFontSize * 2
  },
  bottomButton: {
    marginVertical: baseFontSize,
    alignSelf: 'stretch'
  }
});

const getMovieKey = (movie: Movie): string => {
  return movie.title + ' ' + movie.year;
};

type ResultsBoxProps = {
  results: Movie[];
  cardSize: CardSize;
  noMoreResults: boolean;
  loadMore: () => void;
  showNoResultsMessage: boolean;
};

const ResultsBox = (props: ResultsBoxProps) => {
  return (
    <View style={resultsContainerStyles.containerWithButton}>
      <FlatList data={props.results}
                initialNumToRender={props.cardSize === 0 ? 10 : 3}
                renderItem={(itemInfo) => {
                  return (
                    <MovieCard cardSize={props.cardSize}
                               movie={itemInfo.item} />
                  );
                }}
                keyExtractor={getMovieKey}
                ListFooterComponent={() => {
                  return props.results.length ? (
                    <LoadMoreButton onPress={props.loadMore}
                                    disabled={props.noMoreResults} />
                  ) : null;
                }}
                onScroll={Keyboard.dismiss} />
      {props.showNoResultsMessage && !props.results.length ? (
        <NoResultsMessage />
      ): null}
    </View>
  );
};

type LoadMoreButtonProps = {
  onPress: () => void;
  disabled: boolean;
};

const NoResultsMessage = () => {
  const sharedStyles = useDynamicStyleSheet(sharedDynamicStyleSheet);
  return (
    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
      <Text style={sharedStyles.dynamicTextColor}>
        No results found
      </Text>
    </View>
  );
};

const LoadMoreButton = (props: LoadMoreButtonProps) => (
  <View style={resultsContainerStyles.bottomButton}>
    <Button onPress={props.onPress} full primary rounded
            disabled={props.disabled}>
      <Text>Load more</Text>
    </Button>
  </View>
);

export default ResultsBox;
