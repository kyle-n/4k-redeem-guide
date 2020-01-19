import React from 'react';
import {Container, Content} from 'native-base';
import LoadingRedirect from '../loading/loading-redirect';
import {getMovies} from '../store';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {Movie, MovieFilters} from '../models';
import {StyleSheet} from 'react-native';
import InputBox from './input/input-box';
import {debounce} from 'throttle-debounce';
import FilterBox from './input/filter-box';
import {anyValueTruthy} from '../utils';
import {SearchPageProps} from './search.page.container';
import ResultsBox from './results/results-box';

type SearchPageState = {
  movies: Movie[];
  query: string;
  debouncedQuery: string;
  isLoading: boolean;
  showFilters: boolean;
  filters: MovieFilters;
  debouncedFilters: MovieFilters;
  screenProps: NavigationStackScreenProps;
}

const movieCardStyles = StyleSheet.create({
  content: {
    alignItems: 'center',
  }
});

const SearchPage = (props: SearchPageProps) => (
  <Container>
    <LoadingRedirect redirect={props.navToLoadingPage}/>
    <Content contentContainerStyle={movieCardStyles.content}>
      <InputBox query={props.query}
                setQuery={props.setQuery}
                isLoading={props.isLoading} />
      <FilterBox setFilter={props.setFilters}
                 resetFilters={props.clearFilters}
                 filters={props.filters}
                 visible={props.filtersVisible}
                 toggleFilterVisibility={props.toggleFiltersVisible} />
      <ResultsBox
    </Content>
  </Container>
);

class SearchPage extends React.Component<SearchPageProps, SearchPageState> {

  private static readonly debounceTime = 1 * 1000;

  constructor(props: SearchPageProps) {
    super(props);

    this.state = {
      movies: [],
      query: '',
      debouncedQuery: '',
      isLoading: false,
      showFilters: false,
      filters: Object.assign({}, SearchPage.defaultFilters),
      debouncedFilters: Object.assign({}, SearchPage.defaultFilters)
    };

    props.navigation.addListener('willFocus', () => {
      const movies = getMovies();
      if (!movies.length) {
        this.navToLoadingPage();
      } else this.setState({movies});
    });
  }

  // -----------------------------------------------------------------------------
  // callbacks

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

  setDebouncedQuery = debounce(SearchPage.debounceTime, (query: string) => {
    this.setState({debouncedQuery: query, isLoading: false});
  });

  toggleFilterVisibility = (): void => this.setState({showFilters: !this.state.showFilters});

  setFilter = (property: string, value: boolean): void => {
    const filters = Object.assign({}, this.state.filters, {[property]: value});
    if (anyValueTruthy(filters)) {
      this.setState({filters, isLoading: true}, () => {
        this.setDebouncedFilters(Object.assign({}, filters));
      });
    } else {
      this.setState({filters, debouncedFilters: filters});
    }
  };

  setDebouncedFilters = debounce(SearchPage.debounceTime, (filters: MovieFilters) => {
    this.setState({debouncedFilters: filters, isLoading: false});
  });

  setAllFilters = (newFilters: MovieFilters): void => {
    const filters = Object.assign({}, newFilters);
    const debouncedFilters = Object.assign({}, newFilters);
    this.setState({filters, debouncedFilters});
  };

  resetFilters = (): void => {
    this.setAllFilters(SearchPage.defaultFilters);
  };

  // -----------------------------------------------------------------------------

  render() {
    return (
    );
  }
}

export default SearchPage;
