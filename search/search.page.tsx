import React from 'react';
import {Container, Content} from 'native-base';
import {StyleSheet} from 'react-native';
import InputBox from './input/input-box';
import FilterBox from './input/filter-box';
import {SearchPageProps} from './search.page.container';
import ResultsBox from './results/results-box';
import {MovieFilters} from '../models';
import {anyValueTruthy} from '../utils';

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
      <Content contentContainerStyle={movieCardStyles.content}>
        <InputBox query={props.query}
                  setQuery={props.setQuery}
                  clearQuery={props.clearQuery}
                  isLoading={props.isLoading} />
        <FilterBox setFilter={setFilter}
                   resetFilters={props.clearFilters}
                   filters={props.filters}
                   visible={props.filtersVisible}
                   toggleFilterVisibility={props.toggleFiltersVisible} />
        <ResultsBox results={props.results}
                    cardSize={props.cardSize}
                    loadMore={props.loadMore}
                    showNoResultsMessage={(props.query || anyValueTruthy(props.filters)) && !props.isLoading}
                    noMoreResults={props.noMoreResults} />
      </Content>
    </Container>
  );
};

export default SearchPage;
