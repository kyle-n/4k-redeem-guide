import {useDynamicStyleSheet} from 'react-native-dark-mode';
import {darkLightGray, sharedDynamicStyleSheet, slideFromUnder350} from '../styles';
import * as Animatable from 'react-native-animatable';
import {Card} from "native-base";
import {TouchableOpacity} from "react-native-gesture-handler";
import MovieCardHeader from './movie-card-header';
import MovieCardBody from './movie-card-body';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Movie} from '../models';

type MovieCardLayoutProps = {
  backgroundImgUrl: string;
  movie: Movie;
  showCardBody: boolean;
  onPressHeader?: () => void;
  width?: number;
};

const movieCardStyles = StyleSheet.create({
  card: {
    alignSelf: 'stretch',
    borderColor: darkLightGray
  }
});

const MovieCardLayout = (props: MovieCardLayoutProps) => {
  const sharedStyles = useDynamicStyleSheet(sharedDynamicStyleSheet);
  return (
    <Animatable.View animation="slideInUp"
                     duration={750}
                     style={props.width ? {width: props.width} : null}
                     useNativeDriver={false}>
      <Card style={[movieCardStyles.card, sharedStyles.squareEntity, sharedStyles.dynamicColor]}>
        <TouchableOpacity onPress={props.onPressHeader}
                          activeOpacity={props.backgroundImgUrl ? 0.8 : 0.2}>
          <MovieCardHeader movie={props.movie}
                           backgroundImgUrl={props.backgroundImgUrl}
                           open={props.showCardBody} />
        </TouchableOpacity>
        {props.showCardBody ? (
          <Animatable.View animation={slideFromUnder350}
                           duration={350}
                           useNativeDriver={false}>
            <MovieCardBody movie={props.movie} />
          </Animatable.View>
        ) : null}
      </Card>
    </Animatable.View>
  );
};

export default MovieCardLayout;
