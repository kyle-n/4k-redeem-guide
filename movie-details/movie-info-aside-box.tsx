import React from 'react';
import {MovieDetailsResponse} from '../store/tmdb.connector';
import {Text, View} from 'native-base';

type MovieInfoAsideBoxProps = {
  details: MovieDetailsResponse;
};

const MovieInfoAsideBox = (props: MovieInfoAsideBoxProps) => {
  return (
    <View>
      <Text>hello</Text>
    </View>
  );
};

export default MovieInfoAsideBox;
