import React from 'react';
import {CardSize} from '../models';
import {Button, Icon, Text, View} from 'native-base';
import {StyleSheet} from 'react-native';
import {baseFontSize} from '../styles';
import RefreshCacheButton from '../store/refresh-cache-button';

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
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
  }
});

type SearchPageHeaderProps = {
  onCardSizeButtonPress: () => void;
  cardSize: CardSize;
};

const SearchPageHeader = (props: SearchPageHeaderProps) => (
  <View style={searchPageHeaderStyles.container}>
    <View>
      <Text style={searchPageHeaderStyles.pageTitle}>Search</Text>
    </View>
    <View style={searchPageHeaderStyles.buttonContainer}>
      <RefreshCacheButton />
      <SizeButton cardSize={props.cardSize} onPress={props.onCardSizeButtonPress}/>
    </View>
  </View>
)

type SizeButtonProps = {
  cardSize: CardSize;
  onPress: () => void;
}

const SizeButton = (props: SizeButtonProps) => {
  const iconName = props.cardSize === 0 ? 'th-large' : 'th-list';
  return (
    <Button onPress={props.onPress}
            info transparent large>
      <Icon type="FontAwesome5" name={iconName} />
    </Button>
  );
};

export default SearchPageHeader;
