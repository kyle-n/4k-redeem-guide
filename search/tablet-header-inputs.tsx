import React from 'react';
import {connect} from 'react-redux';
import {View} from "native-base";
import InputBox from './input/input-box';
import FilterBox from './input/filter-box';
import {GlobalState, MovieFilters} from '../models';
import {setQueryAndSearch, clearQuery, clearFilters, setFiltersVisible, setFiltersAndSearch, toggleFiltersVisible} from '../redux/actions';
import {StyleSheet} from 'react-native';

const mapStateToProps = (state: GlobalState) => {
  return {
    query: state.query,
    isLoading: state.isLoading,
    filters: state.filters,
    visible: state.filtersVisible
  };
};
const mapDispatchToProps = {
  setQueryAndSearch,
  clearQuery,
  clearFilters,
  setFiltersVisible,
  setFiltersAndSearch,
  toggleFiltersVisible
};

const tabletHeaderStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row'
  }
});

type TabletHeaderInputsProps = ReturnType<typeof mapStateToProps> &
  (typeof mapDispatchToProps);

const TabletHeaderInputs = (props: TabletHeaderInputsProps) => {
  const setFilter = (filter: string, value: boolean): void => {
    const newFilters: MovieFilters = Object.assign({}, props.filters, {[filter]: value});
    props.setFiltersAndSearch(newFilters);
  };
  return (
    <View style={tabletHeaderStyles.container}>
      <InputBox setQuery={props.setQueryAndSearch}
                clearQuery={props.clearQuery}
                query={props.query}
                isLoading={props.isLoading}
                grow={true} />
      <FilterBox setFilter={setFilter}
                 resetFilters={props.clearFilters}
                 filters={props.filters}
                 visible={props.visible}
                 toggleFilterVisibility={props.toggleFiltersVisible}
                 grow={true}
                 displayDropdownAbove={true} />
    </View>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(TabletHeaderInputs);