import React from 'react';
import {View} from 'native-base';
import InputBox from './input/input-box';
import FilterBox from './input/filter-box';
import {SearchPageProps} from './search.page.container';
import {MovieFilters, PresetSearch} from '../models';
import {anyValueTruthy} from '../utils';
import {DynamicStyleSheet, DynamicValue, useDynamicStyleSheet} from 'react-native-dark-mode';
import {lightBackgroundColor} from '../styles';
import SuggestedSearches from './suggested-searches';
import {FlatList} from "react-native-gesture-handler";
import MovieCard from './results/movie-card/movie-card';
import {Keyboard} from 'react-native';
import {resultsContainerStyles} from './results/results-box';
import {getMovieKey} from './results/results-box';
import {LoadMoreButton} from './results/results-box';
import {NoResultsMessage} from './results/results-box';

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
  return (
    <View style={[movieCardStyles.container] as any[]}>
      <View style={movieCardStyles.content}>
        <View style={resultsContainerStyles.containerWithButton}>
          <FlatList data={props.results}
                    initialNumToRender={props.cardSize === 0 ? 10 : 3}
                    renderItem={(itemInfo) => {
                      return (
                        <MovieCard cardSize={props.cardSize}
                                   movie={itemInfo.item} />
                      );
                    }}
                    keyExtractor={getMovieKey}
                    ListHeaderComponent={() => (
                      <View>
                        <InputBox query={props.query}
                                  setQuery={props.setQuery}
                                  clearQuery={props.clearQuery}
                                  isLoading={props.isLoading} />
                        <FilterBox setFilter={setFilter}
                                   resetFilters={props.clearFilters}
                                   filters={props.filters}
                                   visible={props.filtersVisible}
                                   toggleFilterVisibility={props.toggleFiltersVisible} />
                      </View>
                    )}
                    ListFooterComponent={() => {
                      return props.results.length ? (
                        <LoadMoreButton onPress={props.loadMore}
                                        disabled={props.noMoreResults} />
                      ) : null;
                    }}
                    onScroll={Keyboard.dismiss} />
          {props.showNoResultsMessage && !props.results.length ? (
            <NoResultsMessage />
          ): null}
        </View>
        {!props.results.length && !props.query && !anyValueTruthy(props.filters) ? (
          <SuggestedSearches setSearch={presetSearch} />
        ) : null}
      </View>
    </View>
  );
};

export default SearchPage;
