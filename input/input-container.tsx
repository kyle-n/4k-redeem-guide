import React from 'react';
import {Input, Item} from 'native-base';
import {StyleSheet, Text} from 'react-native';
import {baseFontSize} from '../styles';

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
    this.setState({query}, () => this.props.setQuery(this.state.query));
  };

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
