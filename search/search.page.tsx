import React from 'react';
import {View} from 'native-base';
import InputBox from './input/input-box';
import FilterBox from './input/filter-box';
import {SearchPageProps} from './search.page.container';
import {MovieFilters, PresetSearch} from '../models';
import {anyValueTruthy} from '../utils';
import {DynamicStyleSheet, DynamicValue, useDynamicStyleSheet} from 'react-native-dark-mode';
import {lightBackgroundColor, tabletMode} from '../styles';
import SuggestedSearches from './suggested-searches';
import {FlatList} from "react-native-gesture-handler";
import MovieCard from './results/movie-card/movie-card';
import {resultsContainerStyles} from './results/results-box';
import {getMovieKey} from './results/results-box';
import {LoadMoreButton} from './results/results-box';
import {NoResultsMessage} from './results/results-box';
import {Dimensions} from 'react-native';

const dynamicStyleSheet = new DynamicStyleSheet({
  content: {
    alignItems: 'center'
  },
  container: {
    flexGrow: 1
  },
  specialBackground: {
    backgroundColor: new DynamicValue(lightBackgroundColor, 'rgb(28,28,30)'),
  }
});

type SearchPageState = {
  isPortrait: boolean;
};
class SearchPage extends React.Component<SearchPageProps, SearchPageState> {
  constructor(props: SearchPageProps) {
    super(props);

    this.state = {isPortrait: this.getIsPortrait()};
  }

  getIsPortrait = () => {
    const { width, height } = Dimensions.get('window');
    return height > width;
  };

  onListRender = () => {
    const isPortrait = this.getIsPortrait();
    if (isPortrait !== this.state.isPortrait) this.setState({isPortrait});
  }

  render() {
    return (
      <SearchPageMarkup parentProps={this.props} onListRender={this.onListRender} />
    );
  }

}

type SearchPageMarkupProps = {
  parentProps: SearchPageProps;
  onListRender: () => void;
};
const SearchPageMarkup = (props: SearchPageMarkupProps) => {
  const setFilter = (filter: string, value: boolean): void => {
    const newFilters: MovieFilters = Object.assign({}, props.parentProps.filters, {[filter]: value});
    props.parentProps.setFilters(newFilters);
  };

  const presetSearch = (preset: PresetSearch): void => {
    if (preset.filters) {
      props.parentProps.setFilters(preset.filters);
    }
    if (preset.query) {
      props.parentProps.setQuery(preset.query);
    }
  };

  const movieCardStyles = useDynamicStyleSheet(dynamicStyleSheet);

  // calculate columns in flatList
  const maxCardWidth = 400;
  let cols = 1;
  let colWidth: number;
  const windowWidth = Dimensions.get('window').width;
  cols = Math.floor(windowWidth / maxCardWidth);
  if (cols < 1) cols = 1;
  colWidth = Math.floor(windowWidth / cols);

  let initialRenderNumber = props.parentProps.cardSize === 0 ? 10 : 3;
  initialRenderNumber = initialRenderNumber * cols;
  return (
    <View style={[movieCardStyles.container, movieCardStyles.specialBackground] as any[]}>
      <View style={movieCardStyles.content}>
        <View style={resultsContainerStyles.containerWithButton}>
          <FlatList data={props.parentProps.results}
                    onLayout={props.onListRender}
                    initialNumToRender={initialRenderNumber}
                    renderItem={(itemInfo) => {
                      return (
                        <MovieCard cardSize={props.parentProps.cardSize}
                                   movie={itemInfo.item}
                                   width={colWidth} />
                      );
                    }}
                    key={cols}
                    stickyHeaderIndices={tabletMode() ? [] : [0]}
                    keyExtractor={getMovieKey}
                    numColumns={cols}
                    columnWrapperStyle={cols > 1 ? {display: 'flex', flexDirection: 'row', flexWrap: 'wrap'} : null}
                    ListHeaderComponent={tabletMode() ? null : (
                      <View style={[movieCardStyles.specialBackground]}>
                        <InputBox query={props.parentProps.query}
                                  setQuery={props.parentProps.setQuery}
                                  clearQuery={props.parentProps.clearQuery}
                                  isLoading={props.parentProps.isLoading} />
                        <FilterBox setFilter={setFilter}
                                   resetFilters={props.parentProps.clearFilters}
                                   filters={props.parentProps.filters}
                                   visible={props.parentProps.filtersVisible}
                                   toggleFilterVisibility={props.parentProps.toggleFiltersVisible} />
                      </View>
                    )}
                    ListFooterComponent={() => {
                      return props.parentProps.results.length ? (
                        <LoadMoreButton onPress={props.parentProps.loadMore}
                                        disabled={props.parentProps.noMoreResults} />
                      ) : ((!props.parentProps.results.length && (props.parentProps.query || anyValueTruthy(props.parentProps.filters)) && !props.parentProps.isLoading) ? (
                        <NoResultsMessage />
                      ) : null);
                    }}
                    keyboardDismissMode="on-drag" />
        </View>
        {!props.parentProps.results.length && !props.parentProps.query && !anyValueTruthy(props.parentProps.filters) ? (
          <SuggestedSearches setSearch={presetSearch} />
        ) : null}
      </View>
    </View>
  );
};

export default SearchPage;
