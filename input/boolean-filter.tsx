import React from 'react';
import {Text} from 'native-base';

type BooleanFilterProps = {
  name: string;
  value: boolean;
  onChange: (selected: boolean) => void;
}
const BooleanFilter = (props: BooleanFilterProps) => (
  <Text>Filter</Text>
);

export default BooleanFilter;
