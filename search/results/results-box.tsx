import React from 'react';
import {CardSize, Movie, PresetSearch} from '../../models';
import {Button, Item, Text, View} from 'native-base';
import MovieCard from './movie-card/movie-card';
import {StyleSheet} from 'react-native';
import {baseFontSize} from '../../styles';
import SuggestedSearches from '../suggested-searches';
import {anyValueTruthy} from '../../utils';

const resultsContainerStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    borderBottomWidth: 0
  },
  containerWithButton: {
    alignSelf: 'stretch'
  },
  bottomButton: {
    marginVertical: baseFontSize,
    alignSelf: 'stretch'
  }
});

type ResultsPageProps = {
  results: Movie[];
  cardSize: CardSize;
  noMoreResults: boolean;
  showNoResultsMessage: boolean;
};

const ResultsBox = (props: ResultsPageProps) => {
  return (
    <View style={resultsContainerStyles.containerWithButton}>
      <Item style={resultsContainerStyles.container}>
        {props.results.map((movie, i) => {
          return (
            <MovieCard key={i}
                       cardSize={props.cardSize}
                       movie={movie}/>
          );
        })}
        {props.results.length ? (
          <LoadMoreButton loadMoreMovies={this.loadMoreMovies}
                          disabled={props.noMoreResults} />
        ) : null}
        {props.showNoResultsMessage ? (
          <Text>
            No matches found
          </Text>
        ): null}
      </Item>
    </View>
  );
};

type LoadMoreButtonProps = {
  loadMoreMovies: () => void;
  disabled: boolean;
};

const LoadMoreButton = (props: LoadMoreButtonProps) => (
  <View style={resultsContainerStyles.bottomButton}>
    <Button onPress={props.loadMoreMovies} full primary rounded
            disabled={props.disabled}>
      <Text>Load more</Text>
    </Button>
  </View>
);

export default ResultsBox;
