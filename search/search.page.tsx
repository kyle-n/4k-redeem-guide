import React from 'react';
import {Container, Content} from 'native-base';
import LoadingRedirect from './loading-redirect';
import {getMovies} from '../store';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {Movie} from '../models';
import MovieCard from './movie-card';
import {StyleSheet} from 'react-native';

type SearchPageProps = NavigationStackScreenProps;
type SearchPageState = {
  movies: Movie[]
}

const movieCardStyles = StyleSheet.create({
  content: {
    alignItems: 'center'
  },
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
      <Container>
        <LoadingRedirect redirect={this.navToLoadingPage}/>
        <Content contentContainerStyle={movieCardStyles.content}>
          {this.state.movies.map((movie, i) => {
            return (
              <MovieCard key={i} movie={movie}/>
            );
          })}
        </Content>
      </Container>
    );
  }
}

export default SearchPage;
