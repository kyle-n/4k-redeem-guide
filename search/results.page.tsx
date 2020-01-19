import React from 'react';
import {CardSize, GlobalState, Movie, MovieFilters, PresetSearch} from '../models';
import {Button, Item, Text, View} from 'native-base';
import MovieCard from '../movie-card/movie-card';
import {StyleSheet} from 'react-native';
import {searchMovies} from '../store';
import {baseFontSize} from '../styles';
import SuggestedSearches from './suggested-searches';
import {anyValueTruthy, samePrimitiveValues} from '../utils';
import {connect} from 'react-redux';
import {setQuery, setFilters} from '../redux/actions';

const mapStateToProps = (state: GlobalState) => {
  return {
    cardSize: state.cardSize,
    filters: state.filters,
    noMoreResults: !state.hasMoreResults,
    query: state.query,
    results: state.results
  };
};
const mapDispatchToProps = {setQuery, setFilters};

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

type ResultsPageProps = ReturnType<typeof mapStateToProps> & (typeof mapDispatchToProps);

const ResultsPage = (props: ResultsPageProps) => {
  const setSearch = (presetSearch: PresetSearch): void => {
    if (presetSearch.query) {
      props.setQuery(presetSearch.query);
    }
    if (presetSearch.filters) {
      props.setFilters(presetSearch.filters);
    }
  };

  const anyFilterSelected = anyValueTruthy(props.filters);
  const showNoResultsMessage = (anyFilterSelected || props.query) && !props.results.length;
  const showPresetSearches = !anyFilterSelected && !props.results.length && !showNoResultsMessage;
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
        {showNoResultsMessage ? (
          <Text>
            No matches found
          </Text>
        ): null}
        {showPresetSearches ? (
          <SuggestedSearches setSearch={this.setSearch} />
        ) : null}
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

export default ResultsPage;
