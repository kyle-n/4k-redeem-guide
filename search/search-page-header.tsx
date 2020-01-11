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

  toggleSize = (): void => {
    const size = this.state.size === 0 ? 1 : 0;
    this.setState({size});
  };
  
  render() {
    return (
      <View style={searchPageHeaderStyles.container}>
        <View>
          <Text style={searchPageHeaderStyles.pageTitle}>Search</Text>
        </View>
        <View>
          <SizeButton size={this.state.size} onPress={this.toggleSize}/>
        </View>
      </View>
    );
  }
}

type SizeButtonProps = {
  size: CardSize;
  onPress: () => void;
}

const SizeButton = (props: SizeButtonProps) => {
  const iconName = props.size === 0 ? 'expand' : 'contract';
  return (
    <Button onPress={props.onPress}
            dark transparent large>
      <Icon name={'ios-' + iconName} ios={'ios-' + iconName} android={'md-' + iconName} />
    </Button>
  );
};

export default SearchPageHeader;
