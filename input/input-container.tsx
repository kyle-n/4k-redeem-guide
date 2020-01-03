import React from 'react';
import {StyleSheet} from 'react-native';
import {Item, Input} from 'native-base';
import {baseFontSize} from '../styles';
import {debounce} from 'throttle-debounce';

const inputContainerStyles = StyleSheet.create({
  wrapper: {
    marginBottom: baseFontSize
  }
});

type InputContainerProps = {
  setQuery: (query: string) => void;
};
type InputContainerState = {
  query: string;
};

class InputContainer extends React.Component<InputContainerProps, InputContainerState> {
  constructor(props: InputContainerProps) {
    super(props);

    this.state = {query: ''};
  }

  setQuery = (query: string) => {
    this.setState({query}, () => this.debouncedPassToPropUpdateQuery(this.state.query));
  };

  debouncedPassToPropUpdateQuery = debounce(400, (query: string) => {
    this.props.setQuery(query);
  });

  render() {
    return (
      <Item style={inputContainerStyles.wrapper}>
        <Input value={this.state.query}
               onChange={(e) => this.setQuery(e.nativeEvent.text)}
               placeholder="Search for movie titles"
        />
      </Item>
    );
  }
}

export default InputContainer;
