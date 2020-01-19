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

const mapStateToProps = (state: GlobalState): any => {
  return {
    query: state.query,
    filters: state.filters,
    results: state.results,
    cardSize: state.cardSize,
    filtersVisible: state.filtersVisible,
    hasMoreResults: state.hasMoreResults,
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

export type SearchPageProps = ReturnType<typeof mapStateToProps> & (typeof mapDispatchToProps);
type SearchPageContainerProps = SearchPageProps & NavigationStackScreenProps;

const SearchPageContainer = (props: SearchPageContainerProps) => (
  <SearchPage query={props.query}
              filters={props.filters}
              results={props.results}
              cardSize={props.cardSize}
              filtersVisible={props.filtersVisible}
              hasMoreResults={props.hasMoreResults}
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchPageContainer);
