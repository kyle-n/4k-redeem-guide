import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {Item, Input, View} from 'native-base';
import {baseFontSize} from '../styles';
import {debounce} from 'throttle-debounce';

const inputContainerStyles = StyleSheet.create({
  wrapper: {
    marginBottom: baseFontSize
  },
  loadingSpinner: {
    marginHorizontal: baseFontSize
  }
});

type InputContainerProps = {
  setQuery: (query: string) => void;
};
type InputContainerState = {
  query: string;
  loading: boolean;
};

class InputContainer extends React.Component<InputContainerProps, InputContainerState> {
  constructor(props: InputContainerProps) {
    super(props);

    this.state = {query: '', boolean: false};
  }

  setQuery = (query: string) => {
    this.setState({query, loading: true}, () => this.debouncedPassToPropUpdateQuery(this.state.query));
  };

  debouncedPassToPropUpdateQuery = debounce(1 * 1000, (query: string) => {
    this.props.setQuery(query);
    this.setState({loading: false})
  });

  render() {
    return (
      <Item style={inputContainerStyles.wrapper}>
        <Input value={this.state.query}
               onChange={(e) => this.setQuery(e.nativeEvent.text)}
               placeholder="Search for movie titles"
        />
        {this.state.loading ? (<LoadingIndicator isLoading={this.state.loading} />) : null}
      </Item>
    );
  }
}

type LoadingIndicatorProps = {
  isLoading: boolean;
};

const LoadingIndicator = (props: LoadingIndicatorProps) => (
  <View style={inputContainerStyles.loadingSpinner}>
    <ActivityIndicator size="small" />
  </View>
);

export default InputContainer;
