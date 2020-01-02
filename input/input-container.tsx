import React from 'react';
import {Input, Item} from 'native-base';
import {StyleSheet} from 'react-native';
import {baseFontSize} from '../styles';

const inputContainerStyles = StyleSheet.create({
  wrapper: {
    marginBottom: baseFontSize
  }
});

type InputContainerProps = {};
type InputContainerState = {
  query: string;
};

class InputContainer extends React.Component<InputContainerProps, InputContainerState> {
  constructor(props: InputContainerProps) {
    super(props);

    this.state = {query: ''};
  }

  setQuery = (query: string) => {
    this.setState({query});
  };

  render() {
    return (
      <Item style={inputContainerStyles.wrapper}>
        <Input value={this.state.query} onChange={(e: any) => this.setQuery(e.nativeEvent.target.value)} />
      </Item>
    );
  }
}

export default InputContainer;
