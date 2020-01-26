import React from 'react';
import {Container, Content} from 'native-base';
import InputBox from './input/input-box';
import FilterBox from './input/filter-box';
import {SearchPageProps} from './search.page.container';
import ResultsBox from './results/results-box';
import {MovieFilters} from '../models';
import {anyValueTruthy} from '../utils';
import {DynamicStyleSheet, DynamicValue, useDynamicStyleSheet} from 'react-native-dark-mode';
import {darkColor, lightBackgroundColor, lightColor} from '../styles';

const dynamicStyleSheet = new DynamicStyleSheet({
  content: {
    alignItems: 'center'
  },
  container: {
    backgroundColor: new DynamicValue(lightBackgroundColor, 'rgb(28,28,30)'),
    color: new DynamicValue(lightColor, darkColor)
  }
});

const SearchPage = (props: SearchPageProps) => {
  const setFilter = (filter: string, value: boolean): void => {
    const newFilters: MovieFilters = Object.assign({}, props.filters, {[filter]: value});
    props.setFilters(newFilters);
  };

  const movieCardStyles = useDynamicStyleSheet(dynamicStyleSheet);
  return (
    <Container style={movieCardStyles.container}>
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
