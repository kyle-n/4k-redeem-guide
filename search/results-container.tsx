import React from 'react';
import {Movie, MovieFilters, PresetSearch} from '../models';
import {Button, Item, Text, View} from 'native-base';
import MovieCard from '../movie-card/movie-card';
import {StyleSheet} from 'react-native';
import {searchMovies} from '../store';
import {baseFontSize} from '../styles';
import SuggestedSearches from './suggested-searches';

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
  setFilter: (property: string, value: boolean) => void;
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
      if (this.props.query) {
        this.loadMoreMovies();
      } else {
        this.setState(ResultsContainer.initialState);
      }
    }
  }

  private loadMoreMovies = (): void => {
    const movies = this.state.movies.concat(searchMovies(this.props.query, this.state.offset));
    this.setState({movies, offset: movies.length});
  };

  private setSearch = (presetSearch: PresetSearch): void => {
    if (presetSearch.query) {
      this.props.setQuery(presetSearch.query);
    }
  };

  render() {
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
          ) : (
            <SuggestedSearches setSearch={this.setSearch} />
          )}
        </Item>
      </View>
    );
  }
}

type LoadMoreButtonProps = {
  loadMoreMovies: Function;
};

const LoadMoreButton = (props: LoadMoreButtonProps) => (
  <View style={resultsContainerStyles.bottomButton}>
    <Button onPress={props.loadMoreMovies} full primary>
      <Text>Load more</Text>
    </Button>
  </View>
);

export default ResultsContainer;
