import React from 'react';
import {Accordion, Text, View} from 'native-base';
import {MovieFilters} from '../models';
import BooleanFilter from './boolean-filter';
import {StyleSheet} from 'react-native';
import {baseFontSize} from '../styles';

type FilterData = {
  displayName: string;
  filterName: string;
};
const filters: FilterData[] = [
  {
    displayName: 'Movies Anywhere',
    filterName: 'moviesAnywhere'
  },
  {
    displayName: 'iTunes code redeems in UHD',
    filterName: 'itunesCodeRedeemsUhd',
  },
  {
    displayName: 'Dolby Vision',
    filterName: 'dolbyVision'
  },
  {
    displayName: 'HDR',
    filterName: 'hdr'
  },
  {
    displayName: 'UHD on iTunes',
    filterName: 'itunesUhd'
  },
  {
    displayName: 'UHD on Vudu',
    filterName: 'vuduUhd'
  },
  {
    displayName: 'UHD on FandangoNOW',
    filterName: 'fandangoNowUhd'
  },
  {
    displayName: 'UHD on Google Play',
    filterName: 'googlePlayUhd'
  },
  {
    displayName: 'UHD on Amazon Video',
    filterName: 'amazonVideoUhd'
  },
  {
    displayName: 'UHD on Microsoft',
    filterName: 'microsoftUhd'
  }
];

const accordionDataArray = [
  {title: 'Filters', content: 'render content'}
];

const filterBoxStyles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    paddingHorizontal: 0.5 * baseFontSize,
    marginBottom: baseFontSize,
    display: 'flex',
    flexDirection: 'column'
  },
  filterBox: {
    alignSelf: 'stretch',
  }
});

type FilterBoxProps = {
  setFilter: (filter: string, value: boolean) => void;
  resetFilters: () => void;
  filters: MovieFilters
  visible: boolean;
  toggleFilterVisibility: () => void;
};

const FilterBox = (props: FilterBoxProps) => {
  const filterMarkup = filters.map(filter => {
    const toggleFilter = (val: boolean): void => props.setFilter(filter.filterName, val);
    return (
      <BooleanFilter key={filter.filterName}
                     name={filter.displayName}
                     // @ts-ignore
                     value={props.filters[filter.filterName]}
                     onChange={toggleFilter} />
    );
  });
  return (
    <View style={filterBoxStyles.container}>
      <Accordion dataArray={accordionDataArray}
                 expanded={props.visible ? 0 : -1}
                 style={filterBoxStyles.filterBox} />
    </View>
  );
};

export default FilterBox;
