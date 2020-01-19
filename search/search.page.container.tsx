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
  clearFilters
} from '../redux/actions';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import SearchPage from './search.page';

const mapStateToProps = (state: GlobalState) => {
  return {
    query: state.query,
    filters: state.filters,
    results: state.results,
    cardSize: state.cardSize,
    filtersVisible: state.filtersVisible,
    noMoreResults: state.noMoreResults,
    isLoading: state.isLoading
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
  clearFilters
};

export type SearchPageProps = ReturnType<typeof mapStateToProps> & (typeof mapDispatchToProps) & {
  navToLoadingPage: () => void;
};
type SearchPageContainerProps = SearchPageProps & NavigationStackScreenProps;

const SearchPageContainer = (props: SearchPageContainerProps) => (
  <SearchPage query={props.query}
              filters={props.filters}
              results={props.results}
              cardSize={props.cardSize}
              filtersVisible={props.filtersVisible}
              noMoreResults={props.noMoreResults}
              isLoading={props.isLoading}
              setQuery={props.setQuery}
              setFilters={props.setFilters}
              setFiltersVisible={props.setFiltersVisible}
              setCardSize={props.setCardSize}
              setIsLoading={props.setIsLoading}
              toggleFiltersVisible={props.toggleFiltersVisible}
              clearQuery={props.clearQuery}
              clearFilters={props.clearFilters}
              navToLoadingPage={() => props.navigation.navigate('LoadingPage')} />
);

export default connect(mapStateToProps, mapDispatchToProps)(SearchPageContainer);
