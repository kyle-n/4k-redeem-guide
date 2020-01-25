import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {Item, Input, View, Icon, Button} from 'native-base';
import {baseFontSize} from '../../styles';

const inputContainerStyles = StyleSheet.create({
  wrapper: {
    marginBottom: baseFontSize
  },
  loadingSpinner: {
    marginHorizontal: baseFontSize
  },
  searchIcon: {
    marginLeft: baseFontSize
  }
});

type InputBoxProps = {
  setQuery: (query: string) => void;
  clearQuery: () => void;
  query: string;
  isLoading: boolean;
};

const InputBox = (props: InputBoxProps) => {
  const setOrClearQuery = (query: string): void => {
    if (query.length) props.setQuery(query);
    else props.clearQuery();
  };

  return (
    <Item style={inputContainerStyles.wrapper}>
      <Icon name="ios-search" android="md-search" ios="ios-search"
            style={inputContainerStyles.searchIcon} />
      <Input value={props.query}
             onChange={(e) => setOrClearQuery(e.nativeEvent.text)}
             placeholder="Search for movies"
             autoCorrect={false}
      />
      {props.isLoading ? (<LoadingIndicator />) : null}
      {props.query.length ? (
        <ClearButton disabled={!props.query.length} onPress={props.clearQuery} />
      ) : null}
    </Item>
  );
};

type ClearButtonProps = {
  disabled: boolean;
  onPress: () => void;
}

const ClearButton = (props: ClearButtonProps) => (
  <Button onPress={props.onPress} disabled={props.disabled}
          dark={!props.disabled} light={props.disabled} transparent>
    <Icon name="ios-close" android="md-close" ios="ios-close" />
  </Button>
)

const LoadingIndicator = () => (
  <View style={inputContainerStyles.loadingSpinner}>
    <ActivityIndicator size="small" />
  </View>
);

export default InputBox;
