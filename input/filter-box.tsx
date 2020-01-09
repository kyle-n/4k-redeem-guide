import React from 'react';
import {Text} from 'native-base';
import {MovieFilters} from '../models';

type FilterBoxProps = {
  setFilters: (filters: MovieFilters) => void;
};

const FilterBox = (props: FilterBoxProps) => (
  <Text>filter box</Text>
);

export default FilterBox;
