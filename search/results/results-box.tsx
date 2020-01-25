import React from 'react';
import {CardSize, Movie} from '../../models';
import {Button, Item, Text, View} from 'native-base';
import MovieCard from './movie-card/movie-card';
import {StyleSheet} from 'react-native';
import {baseFontSize} from '../../styles';

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

type ResultsBoxProps = {
  results: Movie[];
  cardSize: CardSize;
  noMoreResults: boolean;
  loadMore: () => void;
};

const ResultsBox = (props: ResultsBoxProps) => {
  const showNoResultsMessage = props.results.length && props.noMoreResults;
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
          <LoadMoreButton onPress={props.loadMore}
                          disabled={props.noMoreResults} />
        ) : null}
        {showNoResultsMessage ? (
          <Text>
            No results found
          </Text>
        ): null}
      </Item>
    </View>
  );
};

type LoadMoreButtonProps = {
  onPress: () => void;
  disabled: boolean;
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
