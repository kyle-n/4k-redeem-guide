import React from 'react';
import {Container, Content} from 'native-base';
import LoadingRedirect from './loading-redirect';
import {getMovies} from '../store';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {Movie, MovieFilters} from '../models';
import {StyleSheet} from 'react-native';
import ResultsContainer from './results-container';
import InputBox from '../input/input-box';
import {debounce} from 'throttle-debounce';
import FilterBox from '../input/filter-box';

type SearchPageProps = NavigationStackScreenProps;
type SearchPageState = {
  movies: Movie[];
  query: string;
  debouncedQuery: string;
  isLoading: boolean;
  showFilters: boolean;
  filters: MovieFilters;
}

const movieCardStyles = StyleSheet.create({
  content: {
    alignItems: 'center',
  }
});

class SearchPage extends React.Component<SearchPageProps, SearchPageState> {

  private static readonly defaultFilters: MovieFilters = {
    vuduUhd: false,
    fandangoNowUhd: false,
    itunesUhd: false,
    itunesCodeRedeemsUhd: false,
    moviesAnywhere: false,
    dolbyVision: false,
    hdr: false,
    googlePlayUhd: false,
    amazonVideoUhd: false,
    microsoftUhd: false
  };

  constructor(props: SearchPageProps) {
    super(props);

    this.state = {
      movies: [],
      query: '',
      debouncedQuery: '',
      isLoading: false,
      showFilters: false,
      filters: Object.assign({}, SearchPage.defaultFilters)
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

  toggleFilterVisibility = (): void => this.setState({showFilters: !this.state.showFilters});

  setFilter = (property: string, value: boolean): void => {
    const filters = Object.assign({}, this.state.filters, {[property]: value});
    this.setState({filters});
  };

  resetFilters = (): void => this.setState({filters: Object.assign({}, SearchPage.defaultFilters)});

  render() {
    return (
      <Container>
        <LoadingRedirect redirect={this.navToLoadingPage}/>
        <Content contentContainerStyle={movieCardStyles.content}>
          <InputBox query={this.state.query}
                    setQuery={this.setQuery}
                    isLoading={this.state.isLoading} />
          <FilterBox setFilter={this.setFilter}
                     resetFilters={this.resetFilters}
                     visible={this.state.showFilters}
                     filters={this.state.filters}
                     toggleFilterVisibility={this.toggleFilterVisibility} />
          <ResultsContainer query={this.state.debouncedQuery}
                            setQuery={this.setQuery}
                            filters={this.state.filters}
                            setFilter={this.setFilter} />
        </Content>
      </Container>
    );
  }
}

export default SearchPage;
