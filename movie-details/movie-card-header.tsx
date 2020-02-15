import React from 'react';
import {Body, CardItem, Left, Right, Text, View} from 'native-base';
import {Movie} from '../models';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import {baseFontSize, sharedDynamicStyleSheet} from '../styles';
import {DropdownIcon} from '../shared-components';
import {ImageBackground, StyleSheet} from 'react-native';

const movieCardHeaderStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width: '100%',
  },
  containerHeight: {
    height: baseFontSize * 12
  },
  colBottom: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  }
});

type MovieCardHeaderProps = {
  movie: Movie;
  open: boolean;
  backgroundImgUrl: string;
}

const MovieCardHeader = (props: MovieCardHeaderProps) => {
  const sharedStyles = useDynamicStyleSheet(sharedDynamicStyleSheet);
  return props.backgroundImgUrl ? (
    <ImageBackground source={{uri: props.backgroundImgUrl}}
                     style={[
                       movieCardHeaderStyles.container,
                       props.backgroundImgUrl ? movieCardHeaderStyles.containerHeight : sharedStyles.dynamicBackgroundColor,
                     ]} imageStyle={[
                       sharedStyles.squareEntity,
                       props.open ? {borderBottomLeftRadius: 0, borderBottomRightRadius: 0} : null
                     ]}>
      <MovieCardHeaderMarkup parentProps={props} />
    </ImageBackground>
  ) : (
    <View style={[
      movieCardHeaderStyles.containerHeight,
      movieCardHeaderStyles.colBottom
    ]}>
      <MovieCardHeaderMarkup parentProps={props} />
    </View>
  );
};

type MovieCardHeaderMarkupProps = {
  parentProps: MovieCardHeaderProps;
};

const MovieCardHeaderMarkup = (props: MovieCardHeaderMarkupProps) => {
  const sharedStyles = useDynamicStyleSheet(sharedDynamicStyleSheet);
  return (
    <CardItem header style={[sharedStyles.squareEntity, {backgroundColor: 'rgba(0,0,0,0)'}]}>
      <Left style={{display: 'flex', flexDirection: 'row'}}>
        <Body style={[{width: '100%', flexGrow: 7}]}>
          <Text>
            <Text style={[sharedStyles.dynamicColor, {fontSize: baseFontSize * 1.5}]}>
              &nbsp;{props.parentProps.movie.title}&nbsp;
            </Text>
          </Text>
          <Text>
            <Text note style={[sharedStyles.dynamicColor]}>
              &nbsp;{props.parentProps.movie.studio}
              {props.parentProps.movie.year ? ', ' + props.parentProps.movie.year : null}&nbsp;
            </Text>
          </Text>
        </Body>
      </Left>
    </CardItem>
  )
};

export default MovieCardHeader;
