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
  },
  containerWithImage: {
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
                     style={[
                       movieCardHeaderStyles.container,
                       props.backgroundImgUrl ? movieCardHeaderStyles.containerWithImage : null
                     ]}>
      <CardItem header style={[sharedStyles.squareEntity, {backgroundColor: 'rgba(0,0,0,0)'}]}>
        <Left style={{display: 'flex', flexDirection: 'row'}}>
          <Body style={[{width: '100%', flexGrow: 7}]}>
            <Text>
              <Text style={[sharedStyles.dynamicColor, {fontSize: baseFontSize * 1.5}]}>
                &nbsp;{props.movie.title}&nbsp;
              </Text>
            </Text>
            <Text>
              <Text note style={[sharedStyles.dynamicColor]}>
                &nbsp;{props.movie.studio}
                {props.movie.year ? ', ' + props.movie.year : null}&nbsp;
              </Text>
            </Text>
          </Body>
          <Right style={[{alignSelf: 'center', flexGrow: 1}]}>
            <DropdownIcon open={props.open} />
          </Right>
        </Left>
      </CardItem>
    </ImageBackground>
  );
};

export default MovieCardHeader;
