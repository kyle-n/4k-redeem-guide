import React from 'react';
import {Body, CardItem, Icon, Left, Right, Text, Thumbnail} from 'native-base';
import {Movie} from '../../../models';

type MovieCardHeaderProps = {
  movie: Movie;
  open: boolean;
}

const MovieCardHeader = (props: MovieCardHeaderProps) => (
  <CardItem header>
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
