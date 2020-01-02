import React from 'react';
import {Movie} from '../models';
import {Content, Item} from 'native-base';
import MovieCard from './movie-card';
import {StyleSheet} from 'react-native';

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
