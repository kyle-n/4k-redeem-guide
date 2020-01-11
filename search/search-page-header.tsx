import React from 'react';
import {CardSize} from '../models';
import {Body, Button, Icon, Left, Right, Text, View} from 'native-base';
import {StyleSheet} from 'react-native';
import {baseFontSize} from '../styles';

const searchPageHeaderStyles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center'
  },
  pageTitle: {
    fontSize: 2 * baseFontSize,
    padding: baseFontSize
  }
});

type SearchPageHeaderProps = {};
type SearchPageHeaderState = {
  size: CardSize;
};

class SearchPageHeader extends React.Component<SearchPageHeaderProps, SearchPageHeaderState> {
  constructor(props: SearchPageHeaderProps) {
    super(props);
    
    this.state = {size: 0};
  }

  setSize = (size: CardSize): void => {
    this.setState({size});
  };
  
  render() {
    return (
      <View style={searchPageHeaderStyles.container}>
        <View>
          <Text style={searchPageHeaderStyles.pageTitle}>Search</Text>
        </View>
        <View>
          <SizeButton size={this.state.size} onPress={this.setSize}/>
        </View>
      </View>
    );
  }
}

type SizeButtonProps = {
  size: CardSize;
  onPress: (size: CardSize) => void;
}

const SizeButton = (props: SizeButtonProps) => {
  const iconName = props.size === 0 ? 'square-outline' : 'list';
  return (
    <Button onPress={() => props.onPress(props.size)}
            dark transparent large>
      <Icon name={'ios-' + iconName} ios={'ios-' + iconName} android={'md-' + iconName} />
    </Button>
  );
};

export default SearchPageHeader;
