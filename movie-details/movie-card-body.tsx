import React from 'react';
import {View} from 'native-base';
import {Movie, MoviePropertyDisplayPair} from '../models';
import TextInfoPairDisplay from './movie-card-text-info';
import {Hr} from '../shared-components';
import CheckmarkChart from '../search/checkmark-chart';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import {baseFontSize, sharedDynamicStyleSheet} from '../styles';

type MovieCardBodyProps = {
  movie: Movie;
  roundedCorners?: boolean;
};

const MovieCardBody = (props: MovieCardBodyProps) => {
  const sharedStyles = useDynamicStyleSheet(sharedDynamicStyleSheet);
  return (
    <View style={props.roundedCorners ? {borderTopLeftRadius: baseFontSize / 2, borderTopRightRadius: baseFontSize / 2} : null}>
      <TextInfoPairs movie={props.movie} roundedCorners={props.roundedCorners} />
      <Hr />
      <CheckmarkChart movie={props.movie} />
    </View>
  );
};

const textInfoPairs: MoviePropertyDisplayPair[] = [
  {
    displayName: 'Movies Anywhere 4K location',
    moviePropertyName: 'maCodeLocation'
  },
  {
    displayName: 'Vudu / FandangoNOW 4K location',
    moviePropertyName: 'vuduFandangoCodeLocation'
  },
  {
    displayName: 'Known Issues',
    moviePropertyName: 'knownIssues'
  }
];

const TextInfoPairs = (props: MovieCardBodyProps) => {
  const sharedStyles = useDynamicStyleSheet(sharedDynamicStyleSheet);
  return (
    <View>
      {textInfoPairs.map(pair => {
        // @ts-ignore
        const value = props.movie[pair.moviePropertyName];
        if (value) return (
          <TextInfoPairDisplay property={pair.displayName}
                               value={value}
                               key={pair.displayName}/>
        );
        else return null;
      })}
    </View>
  );
};

export default MovieCardBody;
