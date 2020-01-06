import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {Item, Input, View} from 'native-base';
import {baseFontSize} from '../styles';

const inputContainerStyles = StyleSheet.create({
  wrapper: {
    marginBottom: baseFontSize
  },
  loadingSpinner: {
    marginHorizontal: baseFontSize
  }
});

type InputBoxProps = {
  setQuery: (query: string) => void;
  query: string;
  isLoading: boolean;
};

const InputBox = (props: InputBoxProps) => (
	<Item style={inputContainerStyles.wrapper}>
    <Input value={props.query}
           onChange={(e) => props.setQuery(e.nativeEvent.text)}
           placeholder="Search for movies"
    />
    {props.isLoading ? (<LoadingIndicator />) : null}
  </Item>
);

type LoadingIndicatorProps = {};

const LoadingIndicator = (props: LoadingIndicatorProps) => (
  <View style={inputContainerStyles.loadingSpinner}>
    <ActivityIndicator size="small" />
  </View>
);

export default InputBox;
