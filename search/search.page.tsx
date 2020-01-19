import React from 'react';
import {Container, Content} from 'native-base';
import LoadingRedirect from '../loading/loading-redirect';
import {getMovies} from '../store';
import {StyleSheet} from 'react-native';
import InputBox from './input/input-box';
import FilterBox from './input/filter-box';
import {SearchPageProps} from './search.page.container';
import ResultsBox from './results/results-box';
import {MovieFilters} from '../models';

const movieCardStyles = StyleSheet.create({
  content: {
    alignItems: 'center',
  }
});

const SearchPage = (props: SearchPageProps) => {
  const setFilter = (filter: string, value: boolean): void => {
    const newFilters: MovieFilters = Object.assign({}, props.filters, {[filter]: value});
    props.setFilters(newFilters);
  };

  return (
    <Container>
      <LoadingRedirect redirect={props.navToLoadingPage}/>
      <Content contentContainerStyle={movieCardStyles.content}>
        <InputBox query={props.query}
                  setQuery={props.setQuery}
                  isLoading={props.isLoading} />
        <FilterBox setFilter={setFilter}
                   resetFilters={props.clearFilters}
                   filters={props.filters}
                   visible={props.filtersVisible}
                   toggleFilterVisibility={props.toggleFiltersVisible} />
        <ResultsBox results={props.results}
                    cardSize={props.cardSize}
                    noMoreResults={props.noMoreResults} />
      </Content>
    </Container>
  );
};

export default SearchPage;
