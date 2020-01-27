import React from 'react';
import {Body, CardItem, Icon, Left, Right, Text, Thumbnail} from 'native-base';
import {Movie} from '../../../models';
import {DynamicStyleSheet, DynamicValue, useDynamicStyleSheet} from 'react-native-dark-mode';
import {darkBackgroundColor, darkColor, lightBackgroundColor, lightColor} from '../../../styles';

type MovieCardHeaderProps = {
  movie: Movie;
  open: boolean;
}

const dynamicStyleSheet = new DynamicStyleSheet({
  cardHeader: {
    backgroundColor: new DynamicValue(lightBackgroundColor, darkBackgroundColor),
    color: new DynamicValue(lightColor, darkColor),
  }
});

const MovieCardHeader = (props: MovieCardHeaderProps) => (
  <CardItem header style={useDynamicStyleSheet(dynamicStyleSheet).cardHeader}>
    <Left>
      <Thumbnail source={{uri: props.movie.imageUrl}} />
      <Body>
        <Text>{props.movie.title}</Text>
        <Text note>
          {props.movie.studio}
          {props.movie.year ? ', ' + props.movie.year : null}
        </Text>
      </Body>
      <Right>
        <Icon name={props.open ? 'ios-arrow-up' : 'ios-arrow-down'} />
      </Right>
    </Left>
  </CardItem>
);

export default MovieCardHeader;
