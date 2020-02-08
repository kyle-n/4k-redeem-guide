import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {Item, Input, View, Icon, Button} from 'native-base';
import {baseFontSize, darkColor, lightGray, sharedDynamicStyleSheet} from '../../styles';
import {useDarkMode, useDynamicStyleSheet} from 'react-native-dark-mode';

const inputContainerStyles = StyleSheet.create({
  wrapper: {
    marginBottom: baseFontSize
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
  grow?: boolean;
};

const InputBox = (props: InputBoxProps) => {
  const setOrClearQuery = (query: string): void => {
    if (query.length) props.setQuery(query);
    else props.clearQuery();
  };

  const sharedStyles = useDynamicStyleSheet(sharedDynamicStyleSheet);
  const isDark = useDarkMode();
  return (
    <Item style={[
      inputContainerStyles.wrapper,
      props.grow ? {flexGrow: 1} : null
    ]}>
      <Icon name="ios-search" android="md-search" ios="ios-search"
            style={[inputContainerStyles.searchIcon, sharedStyles.dynamicTextColor]} />
      <Input value={props.query}
             onChange={(e) => setOrClearQuery(e.nativeEvent.text)}
             placeholder="Search for movies"
             style={[sharedStyles.dynamicTextColor]}
             placeholderTextColor={isDark ? darkColor : lightGray}
             autoCorrect={false}
      />
      {props.isLoading ? (<LoadingIndicator />) : null}
      {props.query.length ? (
        <ClearButton disabled={!props.query.length}
                     onPress={props.clearQuery}
                     style={[sharedStyles.dynamicTextColor, {fontSize: baseFontSize * 2}]} />
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
