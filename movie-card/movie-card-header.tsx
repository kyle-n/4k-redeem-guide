import React from 'react';
import {Body, CardItem, Left, Text, Thumbnail} from 'native-base';

type MovieCardHeaderProps = {
  imageUrl: string;
  title: string;
  studio: string;
  year?: number;
}

const MovieCardHeader = (props: MovieCardHeaderProps) => (
  <CardItem header>
    <Left>
      <Thumbnail source={{uri: props.imageUrl}} />
      <Body>
        <Text>{props.title}</Text>
        <Text note>
          {props.studio}
          {props.year ? ', ' + props.year : null}
        </Text>
      </Body>
    </Left>
  </CardItem>
);

export default MovieCardHeader;
