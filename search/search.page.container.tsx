import React from 'react';
import {connect} from 'react-redux';
import {GlobalState} from '../models';
import {
  setQuery,
  setFilters,
  setFiltersVisible,
  setCardSize,
  setIsLoading,
  toggleFiltersVisible,
  clearQuery,
  clearFilters,
  loadMoreResults
} from '../redux/actions';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import SearchPage from './search.page';

const mapStateToProps = (state: GlobalState): any => {
  return {
    query: state.query,
    filters: state.filters,
    results: state.results,
    cardSize: state.cardSize,
    filtersVisible: state.filtersVisible,
    noMoreResults: state.noMoreResults,
    isLoading: state.isLoading,
    needsToDownloadMovies: !state.movies.length
  };
};
const mapDispatchToProps = {
  setQuery,
  setFilters,
  setFiltersVisible,
  setCardSize,
  setIsLoading,
  toggleFiltersVisible,
  clearQuery,
  clearFilters,
  loadMoreResults
};

export type SearchPageProps = ReturnType<typeof mapStateToProps> & (typeof mapDispatchToProps);
type SearchPageContainerProps = SearchPageProps & NavigationStackScreenProps;

const SearchPageContainer = (props: SearchPageContainerProps) => {
  props.navigation.addListener('willFocus', () => {
    if (props.needsToDownloadMovies) {
      props.navigation.navigate('LoadingPage');
    }
  });

  return props.needsToDownloadMovies ? null : (
    <SearchPage query={props.query}
                filters={props.filters}
                results={props.results}
                cardSize={props.cardSize}
                filtersVisible={props.filtersVisible}
                loadMore={props.loadMoreResults}
                noMoreResults={props.noMoreResults}
                needsToDownloadMovies={props.needsToDownloadMovies}
                isLoading={props.isLoading}
                setQuery={props.setQuery}
                setFilters={props.setFilters}
                setFiltersVisible={props.setFiltersVisible}
                setCardSize={props.setCardSize}
                setIsLoading={props.setIsLoading}
                toggleFiltersVisible={props.toggleFiltersVisible}
                clearQuery={props.clearQuery}
                clearFilters={props.clearFilters} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPageContainer);
