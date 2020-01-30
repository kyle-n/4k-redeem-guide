import React from 'react';
import {Body, CheckBox, ListItem, Text} from 'native-base';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import {sharedDynamicStyleSheet} from '../../styles';

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
const BooleanFilter = (props: BooleanFilterProps) => {
  const sharedStyles = useDynamicStyleSheet(sharedDynamicStyleSheet);
  return (
    <TouchableOpacity onPress={props.onChange} style={booleanFilterStyles.container}>
      <ListItem>
        <CheckBox checked={props.value} />
        <Body>
          <Text style={[sharedStyles.dynamicTextColor]}>
            {props.name}
          </Text>
        </Body>
      </ListItem>
    </TouchableOpacity>
  );
};

export default BooleanFilter;
