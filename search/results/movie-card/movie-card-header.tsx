import React from 'react';
import {Body, CardItem, Icon, Left, Right, Text, Thumbnail} from 'native-base';
import {Movie} from '../../../models';
import {DynamicStyleSheet, DynamicValue, useDynamicStyleSheet} from 'react-native-dark-mode';
import {
  baseFontSize,
  darkBackgroundColor,
  darkColor,
  darkerLightGray,
  lightBackgroundColor,
  lightColor
} from '../../../styles';
import {DropdownIcon} from '../../../shared-components';

type MovieCardHeaderProps = {
  movie: Movie;
  open: boolean;
}

const dynamicStyleSheet = new DynamicStyleSheet({
  dynamicColor: {
    backgroundColor: new DynamicValue(lightBackgroundColor, darkBackgroundColor),
    color: new DynamicValue(lightColor, darkColor),
  }
});

const MovieCardHeader = (props: MovieCardHeaderProps) => {
  const headerStyles = useDynamicStyleSheet(dynamicStyleSheet);
  return (
    <CardItem header style={headerStyles.dynamicColor}>
      <Left>
        <Thumbnail source={{uri: props.movie.imageUrl}} />
        <Body>
          <Text style={[headerStyles.dynamicColor, {fontSize: baseFontSize * 1.5}]}>
            {props.movie.title}
          </Text>
          <Text note>
            {props.movie.studio}
            {props.movie.year ? ', ' + props.movie.year : null}
          </Text>
        </Body>
        <Right>
          <DropdownIcon open={props.open} />
        </Right>
      </Left>
    </CardItem>
  );
};

export default MovieCardHeader;
