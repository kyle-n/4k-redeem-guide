import React from 'react';
import {Accordion, Button, Icon, Text, View} from 'native-base';
import {MovieFilters} from '../../models';
import BooleanFilter from './boolean-filter';
import {StyleSheet} from 'react-native';
import {baseFontSize} from '../../styles';

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

// NativeBase accordion uses content to fill in a text box, but I'm rendering custom components instead
const accordionDataArray = [
  {title: 'Filters', content: ''}
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
    alignSelf: 'stretch'
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
    // @ts-ignore
    const filterVal = props.filters[filter.filterName];
    const toggleFilter = (): void => props.setFilter(filter.filterName, !filterVal);
    return (
      <BooleanFilter key={filter.filterName}
                     name={filter.displayName}
                     value={filterVal}
                     onChange={toggleFilter} />
    );
  });
  const resetButtonDisabled = Object.values(props.filters)
    .reduce((noneChecked, val) => noneChecked && !val, true);

  return (
    <View style={filterBoxStyles.container}>
      <Accordion dataArray={accordionDataArray}
                 expanded={props.visible ? 0 : -1}
                 renderContent={() => (
                   <View>
                     {filterMarkup}
                     <ResetFilterButton onPress={props.resetFilters} disabled={resetButtonDisabled} />
                   </View>
                 )}
                 style={filterBoxStyles.filterBox} />
    </View>
  );
};

const resetFilterButtonStyles = StyleSheet.create({
  container: {
    marginVertical: baseFontSize,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  button: {
    alignSelf: 'center',
    opacity: 50
  }
});

type ResetFilterButtonProps = {
  onPress: () => void;
  disabled: boolean;
};

const ResetFilterButton = (props: ResetFilterButtonProps) => (
  <View style={resetFilterButtonStyles.container}>
    <Button onPress={props.onPress} disabled={props.disabled}
            warning={!props.disabled} light={props.disabled}
            transparent={props.disabled} rounded={!props.disabled}
            icon iconRight style={resetFilterButtonStyles.button}>
      <Text>Clear filters</Text>
      <Icon name="md-close" ios="ios-close" android="md-close" />
    </Button>
  </View>
);

export default FilterBox;
