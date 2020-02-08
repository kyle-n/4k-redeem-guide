import React from 'react';
import {CardSize, Movie} from '../../models';
import {Button, Icon, Text, View} from 'native-base';
import {StyleSheet} from 'react-native';
import {baseFontSize, sharedDynamicStyleSheet, tabletMode} from '../../styles';
import {useDynamicStyleSheet} from 'react-native-dark-mode';

export const resultsContainerStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    borderBottomWidth: 0,
    paddingHorizontal: baseFontSize / 1.5
  },
  containerWithButton: {
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    paddingBottom: baseFontSize * 2
  },
  bottomButton: {
    marginVertical: baseFontSize,
  },
  bigButton: {
    alignSelf: 'stretch'
  }
});

export const getMovieKey = (movie: Movie): string => {
  return movie.title + ' ' + movie.year;
};

type ResultsBoxProps = {
  results: Movie[];
  cardSize: CardSize;
  noMoreResults: boolean;
  loadMore: () => void;
  showNoResultsMessage: boolean;
};

type LoadMoreButtonProps = {
  onPress: () => void;
  disabled: boolean;
};

export const NoResultsMessage = () => {
  const sharedStyles = useDynamicStyleSheet(sharedDynamicStyleSheet);
  return (
    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
      <Text style={sharedStyles.dynamicTextColor}>
        No results found
      </Text>
    </View>
  );
};

export const LoadMoreButton = (props: LoadMoreButtonProps) => (
  <View style={[
    resultsContainerStyles.bottomButton,
    tabletMode() ? {alignSelf: 'flex-end', marginHorizontal: baseFontSize} : resultsContainerStyles.bigButton
  ]}>
    <Button onPress={props.onPress} full info rounded iconLeft
            disabled={props.disabled}>
      <Icon name="plus" type="FontAwesome5" />
      <Text>Load more</Text>
    </Button>
  </View>
);
