import React from 'react';
import {Body, CardItem, Left, Right, Text, Thumbnail} from 'native-base';
import {Movie} from '../../../models';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import {baseFontSize, sharedDynamicStyleSheet} from '../../../styles';
import {DropdownIcon} from '../../../shared-components';

type MovieCardHeaderProps = {
  movie: Movie;
  open: boolean;
}

const MovieCardHeader = (props: MovieCardHeaderProps) => {
  const sharedStyles = useDynamicStyleSheet(sharedDynamicStyleSheet);
  return (
    <CardItem header style={[sharedStyles.dynamicColor, sharedStyles.squareEntity]}>
      <Left>
        <Thumbnail source={{uri: props.movie.imageUrl}} />
        <Body>
          <Text style={[sharedStyles.dynamicColor, {fontSize: baseFontSize * 1.5}]}>
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
