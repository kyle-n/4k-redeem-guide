import React from 'react';
import {CardItem, Text, View} from 'native-base';
import {StyleSheet} from 'react-native';
import isUrl from 'is-url';

const movieCardBodyStyles = StyleSheet.create({
  label: {
    fontWeight: 'bold'
  },
  labelContainer: {
    paddingBottom: 0
  },
});

type TextInfoPairDisplayProps = {
  property: string;
  value: string;
}

const TextInfoPairDisplay = (props: TextInfoPairDisplayProps) => (
  <View>
    <CardItem style={movieCardBodyStyles.labelContainer}>
      <Text style={movieCardBodyStyles.label}>
        {props.property}
      </Text>
    </CardItem>
    <CardItem>
      <Text>
        {props.value}
      </Text>
    </CardItem>
  </View>
);

type InfoLinkProps = {
  link: string;
};

const InfoLink = (props: InfoLinkProps) => (
  <Text></Text>
);

export default TextInfoPairDisplay;
