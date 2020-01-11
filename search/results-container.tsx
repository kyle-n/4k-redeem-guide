import React from 'react';
import {Movie, MovieFilters, PresetSearch} from '../models';
import {Button, Item, Text, View} from 'native-base';
import MovieCard from '../movie-card/movie-card';
import {StyleSheet} from 'react-native';
import {searchMovies} from '../store';
import {baseFontSize} from '../styles';
import SuggestedSearches from './suggested-searches';
import {anyValueTruthy} from '../utils';
import loadMovies from '../store/spreadsheet.connector';

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
};

class ResultsContainer extends React.Component<ResultsContainerProps, ResultsContainerState> {
  private static readonly initialState: ResultsContainerState = {movies: [], offset: 0};

  constructor(props: ResultsContainerProps) {
    super(props);

    this.state = ResultsContainer.initialState;
  }

  componentDidUpdate(
    prevProps: Readonly<ResultsContainerProps>
  ): void {
    if (prevProps !== this.props) {
      this.setState({offset: 0}, () => {
        if (this.props.query || anyValueTruthy(this.props.filters)) {
          this.loadMoreMovies(true);
        } else {
          this.setState(ResultsContainer.initialState);
        }
      });
    }
  }

  private loadMoreMovies = (clearPreviousMovies?: boolean): void => {
    const doLoad = () => {
      const movies = this.state.movies.concat(searchMovies(
        this.props.query,
        this.props.filters,
        this.state.offset
      ));
      this.setState({movies, offset: movies.length});
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
            <LoadMoreButton loadMoreMovies={this.loadMoreMovies} />
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
};

const LoadMoreButton = (props: LoadMoreButtonProps) => (
  <View style={resultsContainerStyles.bottomButton}>
    <Button onPress={props.loadMoreMovies} full primary>
      <Text>Load more</Text>
    </Button>
  </View>
);

export default ResultsContainer;
