import React from 'react';
import {Accordion, Text} from 'native-base';
import {MovieFilters} from '../models';

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

type FilterBoxProps = {
  setFilter: (filter: string, value: boolean) => void;
  resetFilters: () => void;
  filters: MovieFilters
  visible: boolean;
  toggleFilterVisibility: () => void;
};

const FilterBox = (props: FilterBoxProps) => {
  const filterMarkup = checkmarkValues.map(checkmarkValue => {
    if (props.filters.)
    return {
      name: checkmarkValue.displayName,
      // @ts-ignore
      value: props.filters[checkmarkValue.moviePropertyName]
    }
  })
  return (
    <Accordion dataArray={} expanded={props.visible} />
  );
};

export default FilterBox;
