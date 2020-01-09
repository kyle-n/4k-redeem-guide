import React from 'react';
import {Body, CheckBox, ListItem, Text} from 'native-base';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const booleanFilterStyles = StyleSheet.create({
  container: {
    alignSelf: 'stretch'
  },
});

type BooleanFilterProps = {
  name: string;
  value: boolean;
  onChange: () => void;
}
const BooleanFilter = (props: BooleanFilterProps) => (
  <TouchableOpacity onPress={props.onChange} style={booleanFilterStyles.container}>
    <ListItem>
      <CheckBox checked={props.value} />
      <Body>
        <Text>{props.name}</Text>
      </Body>
    </ListItem>
  </TouchableOpacity>
);

export default BooleanFilter;
