import React from 'react';
import {connect} from 'react-redux';
import {View} from "native-base";
import InputBox from './input/input-box';
import FilterBox from './input/filter-box';
import {GlobalState, MovieFilters} from '../models';
import {setQuery, clearQuery, clearFilters, setFiltersVisible, setFiltersAndSearch, toggleFiltersVisible} from '../redux/actions';

const mapStateToProps = (state: GlobalState) => {
  return {
    query: state.query,
    isLoading: state.isLoading,
    filters: state.filters,
    visible: state.filtersVisible
  };
};
const mapDispatchToProps = {
  setQuery,
  clearQuery,
  clearFilters,
  setFiltersVisible,
  setFiltersAndSearch,
  toggleFiltersVisible
};

type TabletHeaderInputsProps = ReturnType<typeof mapStateToProps> &
  (typeof mapDispatchToProps);

const TabletHeaderInputs = (props: TabletHeaderInputsProps) => {
  const setFilter = (filter: string, value: boolean): void => {
    const newFilters: MovieFilters = Object.assign({}, props.filters, {[filter]: value});
    props.setFiltersAndSearch(newFilters);
  };
  return (
    <View>
      <InputBox setQuery={props.setQuery}
                clearQuery={props.clearQuery}
                query={props.query}
                isLoading={props.isLoading} />
      <FilterBox setFilter={setFilter}
                 resetFilters={props.clearFilters}
                 filters={props.filters}
                 visible={props.visible}
                 toggleFilterVisibility={props.toggleFiltersVisible} />
    </View>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(TabletHeaderInputs);