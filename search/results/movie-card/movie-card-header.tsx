import React from 'react';
import {Body, CardItem, Left, Right, Text} from 'native-base';
import {Movie} from '../../../models';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import {baseFontSize, sharedDynamicStyleSheet} from '../../../styles';
import {DropdownIcon} from '../../../shared-components';
import {ImageBackground, StyleSheet} from 'react-native';

const movieCardHeaderStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width: '100%',
    height: baseFontSize * 12
  }
});

type MovieCardHeaderProps = {
  movie: Movie;
  open: boolean;
  backgroundImgUrl: string;
}

const MovieCardHeader = (props: MovieCardHeaderProps) => {
  const sharedStyles = useDynamicStyleSheet(sharedDynamicStyleSheet);
  return (
    <ImageBackground source={{uri: props.backgroundImgUrl}}
                     style={movieCardHeaderStyles.container}>
      <CardItem header style={[sharedStyles.squareEntity, {backgroundColor: 'rgba(0,0,0,0)'}]}>
        <Left>
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
    </ImageBackground>
  );
};

export default MovieCardHeader;
