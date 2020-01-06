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
  query: string;
};
type InputContainerState = {
  loading: boolean;
};

class InputContainer extends React.Component<InputContainerProps, InputContainerState> {
  private loadingPeriod = 1;

  constructor(props: InputContainerProps) {
    super(props);

    this.state = {boolean: false};
  }

  setQuery = (query: string) => {
    this.setState({loading: true}, () => this.debouncedPassToPropUpdateQuery(query));
  };

  debouncedPassToPropUpdateQuery = debounce(loadingPeriod * 1000, (query: string) => {
    this.props.setQuery(query);
    this.setState({loading: false})
  });

  render() {
    return (
      <Item style={inputContainerStyles.wrapper}>
        <Input value={this.props.query}
               onChange={(e) => this.setQuery(e.nativeEvent.text)}
               placeholder="Search for movies"
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
