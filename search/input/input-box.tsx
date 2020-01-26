import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {Item, Input, View, Icon, Button} from 'native-base';
import {baseFontSize, darkColor, lightColor, lightGray} from '../../styles';
import {DynamicStyleSheet, DynamicValue, useDarkMode, useDynamicStyleSheet} from 'react-native-dark-mode';

const dynamicStyleSheet = new DynamicStyleSheet({
  wrapper: {
    marginBottom: baseFontSize,
  },
  searchIcon: {
    marginLeft: baseFontSize
  },
  color: {
    color: new DynamicValue(lightColor, darkColor)
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

  const inputContainerStyles = useDynamicStyleSheet(dynamicStyleSheet);
  const isDark = useDarkMode();
  return (
    <Item style={inputContainerStyles.wrapper}>
      <Icon name="ios-search" android="md-search" ios="ios-search"
            style={[inputContainerStyles.searchIcon, inputContainerStyles.color]} />
      <Input value={props.query}
             onChange={(e) => setOrClearQuery(e.nativeEvent.text)}
             placeholder="Search for movies"
             style={[inputContainerStyles.color]}
             placeholderTextColor={isDark ? darkColor : lightGray}
             autoCorrect={false}
      />
      {props.isLoading ? (<LoadingIndicator />) : null}
      {props.query.length ? (
        <ClearButton disabled={!props.query.length}
                     onPress={props.clearQuery}
                     style={[inputContainerStyles.color]} />
      ) : null}
    </Item>
  );
};

type ClearButtonProps = {
  disabled: boolean;
  onPress: () => void;
  style: any;
}

const ClearButton = (props: ClearButtonProps) => (
  <Button onPress={props.onPress} disabled={props.disabled}
          dark={!props.disabled} light={props.disabled} transparent>
    <Icon name="ios-close" android="md-close" ios="ios-close"
          style={props.style} />
  </Button>
);

const loadingIndicatorStyles = StyleSheet.create({
  loadingSpinner: {
    marginHorizontal: baseFontSize
  },
});

const LoadingIndicator = () => (
  <View style={loadingIndicatorStyles.loadingSpinner}>
    <ActivityIndicator size="small" />
  </View>
);

export default InputBox;
