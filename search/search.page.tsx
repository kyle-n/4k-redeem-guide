import React from 'react';
import {Container, Content} from 'native-base';
import LoadingRedirect from './loading-redirect';
import {getMovies} from '../store';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {Movie} from '../models';
import {StyleSheet} from 'react-native';
import ResultsContainer from './results-container';
import InputBox from '../input/input-box';
import {debounce} from 'throttle-debounce';

type SearchPageProps = NavigationStackScreenProps;
type SearchPageState = {
  movies: Movie[];
  query: string;
  debouncedQuery: string;
  isLoading: boolean;
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
      query: '',
      debouncedQuery: '',
      isLoading: false
    };

    props.navigation.addListener('willFocus', () => {
      const movies = getMovies();
      if (!movies.length) {
        this.navToLoadingPage();
      } else this.setState({movies});
    });
  }

  navToLoadingPage = () => this.props.navigation.navigate('LoadingPage');

  setQuery = (query: string): void => {
    if (query.length) {
      this.setState({isLoading: true, query}, () => {
        this.setDebouncedQuery(this.state.query);
      });
    } else {
      this.setState({query, debouncedQuery: query});
    }
  }

  setDebouncedQuery = debounce(1 * 1000, (query: string) => {
    this.setState({debouncedQuery: query, isLoading: false});
  });

  render() {
    return (
      <Container>
        <LoadingRedirect redirect={this.navToLoadingPage}/>
        <Content contentContainerStyle={movieCardStyles.content}>
          <InputBox query={this.state.query}
                    setQuery={this.setQuery}
                    isLoading={this.state.isLoading} />
          <ResultsContainer query={this.state.debouncedQuery} setQuery={this.setQuery} />
        </Content>
      </Container>
    );
  }
}

export default SearchPage;
