import React from 'react';
import {View} from 'native-base';
import InputBox from './input/input-box';
import FilterBox from './input/filter-box';
import {SearchPageProps} from './search.page.container';
import ResultsBox from './results/results-box';
import {MovieFilters, PresetSearch} from '../models';
import {anyValueTruthy} from '../utils';
import {DynamicStyleSheet, DynamicValue, useDynamicStyleSheet} from 'react-native-dark-mode';
import {lightBackgroundColor, sharedDynamicStyleSheet} from '../styles';
import SuggestedSearches from './suggested-searches';

const dynamicStyleSheet = new DynamicStyleSheet({
  content: {
    alignItems: 'center'
  },
  container: {
    backgroundColor: new DynamicValue(lightBackgroundColor, 'rgb(28,28,30)'),
    flexGrow: 1
  }
});

const SearchPage = (props: SearchPageProps) => {
  const setFilter = (filter: string, value: boolean): void => {
    const newFilters: MovieFilters = Object.assign({}, props.filters, {[filter]: value});
    props.setFilters(newFilters);
  };

  const presetSearch = (preset: PresetSearch): void => {
    if (preset.filters) {
      props.setFilters(preset.filters);
    }
    if (preset.query) {
      props.setQuery(preset.query);
    }
  };

  const movieCardStyles = useDynamicStyleSheet(dynamicStyleSheet);
  const sharedStyles = useDynamicStyleSheet(sharedDynamicStyleSheet);
  return (
    <View style={[movieCardStyles.container] as any[]}>
      <View style={movieCardStyles.content}>
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
        {!props.results.length && !props.query && !anyValueTruthy(props.filters) ? (
          <SuggestedSearches setSearch={presetSearch} />
        ) : null}
      </View>
    </View>
  );
};

export default SearchPage;
