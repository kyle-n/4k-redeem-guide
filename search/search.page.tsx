import React from 'react';
import {Button, Text, View} from 'react-native';
import LoadingRedirect from './loading-redirect';
import {getMovies} from '../store';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {Movie} from '../models';

type SearchPageProps = NavigationStackScreenProps;
type SearchPageState = {
  movies: Movie[]
}

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
      <View>
        <LoadingRedirect redirect={this.navToLoadingPage}/>
        <Text>Search</Text>
        <Button title="Go load" onPress={this.navToLoadingPage} />
        {this.state.movies.map(movie => {
          return (
            <Text key={movie.title}>{movie.title}</Text>
          );
        })}
      </View>
    );
  }
}

export default SearchPage;
