import React from 'react';
import {Movie} from '../models';
import {Item, Text} from 'native-base';
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
}
type ResultsContainerState = {
  movies: Movie[];
}

class ResultsContainer extends React.Component<ResultsContainerProps, ResultsContainerState> {
  constructor(props: ResultsContainerProps) {
    super(props);

    this.state = {movies: []};
  }

  componentDidUpdate(
    prevProps: Readonly<ResultsContainerProps>
  ): void {
    if (prevProps !== this.props && this.props.query) {
      const movies = searchMovies(this.props.query);
      this.setState({movies});
    }
  }

  render() {
    return (
      <Item style={resultsContainerStyles.container}>
        {this.state.movies.map((movie, i) => {
          return (
            <MovieCard key={i} movie={movie}/>
          );
        })}
      </Item>
    );
  }
}

export default ResultsContainer;
