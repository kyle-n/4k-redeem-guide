import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import LoadingRedirect from './loading-redirect';
import {getMovies} from '../store';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {Movie} from '../models';
import MovieCard from './movie-card';
import {baseBackgroundColor, baseColor} from '../styles';

type SearchPageProps = NavigationStackScreenProps;
type SearchPageState = {
  movies: Movie[]
}

const searchPageStyles = StyleSheet.create({
  main: {
    backgroundColor: baseBackgroundColor,
    color: baseColor,
    height: '100%'
  }
});

class SearchPage extends React.Component<SearchPageProps, SearchPageState> {
  constructor(props: SearchPageProps) {
    super(props);

    this.state = {movies: []};

    props.navigation.addListener('willFocus', () => {
      const movies = getMovies();
      if (!movies.length) {
        this.navToLoadingPage();
      } else this.setState({movies});
    });
  }

  navToLoadingPage = () => this.props.navigation.navigate('LoadingPage');

  render() {
    return (
      <View style={searchPageStyles.main}>
        <LoadingRedirect redirect={this.navToLoadingPage}/>
        <Button title="Go load" onPress={this.navToLoadingPage} />
        {this.state.movies.map((movie, i) => {
          return (
            <MovieCard key={i} movie={movie}/>
          );
        })}
      </View>
    );
  }
}

export default SearchPage;
