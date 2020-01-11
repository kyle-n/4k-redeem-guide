import React from 'react';
import {Movie, MovieFilters, PresetSearch} from '../models';
import {Button, Item, Text, View} from 'native-base';
import MovieCard from '../movie-card/movie-card';
import {StyleSheet} from 'react-native';
import {searchMovies} from '../store';
import {baseFontSize} from '../styles';
import SuggestedSearches from './suggested-searches';
import {anyValueTruthy, samePrimitiveValues} from '../utils';

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

type ResultsContainerProps = {
  setQuery: Function;
  query: string;
  filters: MovieFilters;
  setAllFilters: (filters: MovieFilters) => void;
};
type ResultsContainerState = {
  movies: Movie[];
  offset: number;
  noMoreResults: boolean;
};

class ResultsContainer extends React.Component<ResultsContainerProps, ResultsContainerState> {
  private static readonly initialState: ResultsContainerState = {movies: [], offset: 0, noMoreResults: false};

  constructor(props: ResultsContainerProps) {
    super(props);

    this.state = Object.assign({}, ResultsContainer.initialState);
  }

  componentDidUpdate(
    prevProps: Readonly<ResultsContainerProps>
  ): void {
    if (
      // prevent infinite loop
      prevProps !== this.props &&

      // run search only if search data changes, not just the props object
      (prevProps.query !== this.props.query ||
      !samePrimitiveValues(prevProps.filters, this.props.filters))
    ) {
      this.setState({offset: 0, noMoreResults: false}, () => {
        if (this.props.query || anyValueTruthy(this.props.filters)) {
          this.loadMoreMovies(true);
        } else {
          this.setState(Object.assign({}, ResultsContainer.initialState));
        }
      });
    }
  }

  private loadMoreMovies = (clearPreviousMovies?: boolean): void => {
    const doLoad = () => {
      const newMovies = searchMovies(this.props.query, this.props.filters, {offset: this.state.offset});
      const noMoreResults = !Boolean(
        searchMovies(
          this.props.query,
          this.props.filters,
          {offset: this.state.offset + newMovies.length, limit: 1}
        ).length
      );
      const movies = this.state.movies.concat(newMovies);
      this.setState({
        movies,
        offset: movies.length,
        noMoreResults
      });
    };

    if (clearPreviousMovies) {
      this.setState({movies: []}, doLoad);
    } else {
      doLoad();
    }
  };

  private setSearch = (presetSearch: PresetSearch): void => {
    if (presetSearch.query) {
      this.props.setQuery(presetSearch.query);
    }
    if (presetSearch.filters) {
      this.props.setAllFilters(presetSearch.filters);
    }
  };

  render() {
    const anyFilterSelected = anyValueTruthy(this.props.filters);
    const showNoResultsMessage = (anyFilterSelected || this.props.query) && !this.state.movies.length;
    const showPresetSearches = !anyFilterSelected && !this.state.movies.length && !showNoResultsMessage;
    return (
      <View style={resultsContainerStyles.containerWithButton}>
        <Item style={resultsContainerStyles.container}>
          {this.state.movies.map((movie, i) => {
            return (
              <MovieCard key={i} movie={movie}/>
            );
          })}
          {this.state.movies.length ? (
            <LoadMoreButton loadMoreMovies={this.loadMoreMovies}
                            disabled={this.state.noMoreResults} />
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
  }
}

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

export default ResultsContainer;
