import React from 'react';
import {Button, Icon, Text, View} from 'native-base';
import {MovieFilters} from '../../models';
import BooleanFilter from './boolean-filter';
import {GestureResponderEvent, StyleSheet} from 'react-native';
import {baseFontSize, lightGray, sharedDynamicStyleSheet, slideFromUnder350} from '../../styles';
import {DynamicStyleSheet, DynamicValue, useDynamicStyleSheet} from 'react-native-dark-mode';
import {DropdownIcon} from '../../shared-components';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';

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

const filterBoxStyles = StyleSheet.create({
  boxSizing: {
    // paddingHorizontal: 0.5 * baseFontSize,
  },
  container: {
    alignSelf: 'stretch',
    paddingHorizontal: 0.5 * baseFontSize,
    marginBottom: baseFontSize,
    display: 'flex',
    flexDirection: 'column'
  },
  filterBox: {
    alignSelf: 'stretch'
  },
  dropdownAbove: {
    position: 'absolute',
    top: baseFontSize * 4,
    left: baseFontSize / 2,
    zIndex: 200,
    width: '100%',
    marginHorizontal: 'auto'
  }
});

type FilterBoxProps = {
  setFilter: (filter: string, value: boolean) => void;
  resetFilters: () => void;
  filters: MovieFilters
  visible: boolean;
  toggleFilterVisibility: () => void;
  grow?: boolean;
  displayDropdownAbove?: boolean;
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

  const sharedStyles = useDynamicStyleSheet(sharedDynamicStyleSheet);
  return (
    <View style={[
      filterBoxStyles.container,
      props.grow ? {flexGrow: 1} : null
    ]}>
      <AccordionHeader onPress={props.toggleFilterVisibility}
                       expanded={props.visible} />
      {props.visible ? (
        <Animatable.View animation={slideFromUnder350}
                         duration={350}
                         style={props.displayDropdownAbove ? [
                           filterBoxStyles.dropdownAbove,
                           filterBoxStyles.boxSizing,
                           sharedStyles.squareEntity,
                           sharedStyles.dynamicBackgroundColor
                         ] : null}>
          <View style={filterBoxStyles.filterBox}>
            {filterMarkup}
            <ResetFilterButton onPress={props.resetFilters} disabled={resetButtonDisabled} />
          </View>
        </Animatable.View>
      ) : null}
    </View>
  );
};

const resetFilterButtonStyles = StyleSheet.create({
  container: {
    marginVertical: baseFontSize,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    alignSelf: 'center',
    opacity: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

type ResetFilterButtonProps = {
  onPress: () => void;
  disabled: boolean;
};

const headerStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    fontWeight: '600',
    fontSize: baseFontSize * 1.5
  }
});

const dynamicStyleSheet = new DynamicStyleSheet({
  dynamicBorder: {
    borderWidth: new DynamicValue(1, 0),
    borderColor: new DynamicValue(lightGray, 'black')
  }
});

type AccordionHeaderProps = {
  onPress: (event: GestureResponderEvent) => void;
  expanded: boolean;
};
const AccordionHeader = (props: AccordionHeaderProps) => {
  const sharedStyles = useDynamicStyleSheet(sharedDynamicStyleSheet);
  const dynamicStyles = useDynamicStyleSheet(dynamicStyleSheet);
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[
        headerStyles.container,
        sharedStyles.dynamicColor,
        sharedStyles.squareEntity,
        dynamicStyles.dynamicBorder
      ]}>
        <Text style={[headerStyles.title, sharedStyles.dynamicColor]}>
          Filters
        </Text>
        <DropdownIcon open={props.expanded} />
      </View>
    </TouchableOpacity>
  );
};

const ResetFilterButton = (props: ResetFilterButtonProps) => (
  <View style={resetFilterButtonStyles.container}>
    <Button onPress={props.onPress} disabled={props.disabled}
            warning={!props.disabled} light={props.disabled}
            transparent={props.disabled} rounded={!props.disabled}
            icon iconRight style={resetFilterButtonStyles.button}>
      <Text>Clear filters</Text>
      <Icon name="md-close" ios="ios-close" android="md-close"
            style={{fontSize: baseFontSize * 2, alignSelf: 'center'}} />
    </Button>
  </View>
);

export default FilterBox;
