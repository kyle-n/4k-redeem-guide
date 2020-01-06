import React from 'react';
import {Container, Content} from 'native-base';
import LoadingRedirect from './loading-redirect';
import {getMovies} from '../store';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {Movie} from '../models';
import {StyleSheet} from 'react-native';
import InputContainer from '../input/input-container';
import ResultsContainer from './results-container';

type SearchPageProps = NavigationStackScreenProps;
type SearchPageState = {
  movies: Movie[];
  query: string;
}

const movieCardStyles = StyleSheet.create({
  content: {
    alignItems: 'center',
  }
});

class SearchPage extends React.Component<SearchPageProps, SearchPageState> {
  constructor(props: SearchPageProps) {
    super(props);

    this.state = {
      movies: [],
      query: ''
    };

    props.navigation.addListener('willFocus', () => {
      const movies = getMovies();
      if (!movies.length) {
        this.navToLoadingPage();
      } else this.setState({movies});
    });
  }

  navToLoadingPage = () => this.props.navigation.navigate('LoadingPage');

  setQuery = (query: string): void => this.setState({query});

  render() {
    return (
      <Container>
        <LoadingRedirect redirect={this.navToLoadingPage}/>
        <Content contentContainerStyle={movieCardStyles.content}>
          <InputContainer setQuery={this.setQuery} query={this.state.query} />
          <ResultsContainer query={this.state.query} setQuery={this.setQuery} />
        </Content>
      </Container>
    );
  }
}

export default SearchPage;
