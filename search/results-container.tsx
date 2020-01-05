import React from 'react';
import {Movie} from '../models';
import {Button, Item, Text, View} from 'native-base';
import MovieCard from '../movie-card/movie-card';
import {StyleSheet} from 'react-native';
import {searchMovies} from '../store';

const resultsContainerStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column'
  }
});

type ResultsContainerProps = {
  query: string;
};
type ResultsContainerState = {
  movies: Movie[];
  offset: number;
};

class ResultsContainer extends React.Component<ResultsContainerProps, ResultsContainerState> {
  constructor(props: ResultsContainerProps) {
    super(props);

    this.state = {movies: [], offset: 0};
  }

  componentDidUpdate(
    prevProps: Readonly<ResultsContainerProps>
  ): void {
    if (prevProps !== this.props && this.props.query) {
      this.loadMoreMovies();
    }
  }

  private loadMoreMovies = (): void => {
    const movies = this.state.movies.concat(searchMovies(this.props.query, this.state.offset));
    this.setState({movies, offset: movies.length});
  };

  render() {
    return (
      <View>
        <Item style={resultsContainerStyles.container}>
          {this.state.movies.map((movie, i) => {
            return (
              <MovieCard key={i} movie={movie}/>
            );
          })}
        </Item>
        <Button onPress={this.loadMoreMovies} full primary>
          <Text>Load more</Text>
        </Button>
      </View>
    );
  }
}

export default ResultsContainer;
