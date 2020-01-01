import React from 'react';
import {View} from 'native-base';
import {Movie} from '../models';
import TextInfoPairDisplay from './movie-card-text-info';
import CheckmarkChart from './checkmark-chart';

type MovieCardBodyProps = {
  movie: Movie
};

const MovieCardBody = (props: MovieCardBodyProps) => {
  return (
    <View>
      <TextInfoPairs movie={props.movie}/>
      <CheckmarkChart movie={props.movie}/>
    </View>
  );
};

type TextInfoPair = {
  property: string;
  moviePropertyName: string;
}

const textInfoPairs: TextInfoPair[] = [
  {
    property: 'Movies Anywhere 4K location',
    moviePropertyName: 'maCodeLocation'
  },
  {
    property: 'Vudu / FandangoNOW 4K location',
    moviePropertyName: 'vuduFandangoCodeLocation'
  },
  {
    property: 'Known Issues',
    moviePropertyName: 'knownIssues'
  }
];

const TextInfoPairs = (props: MovieCardBodyProps) => (
  <View>
    {textInfoPairs.map(pair => {
      // @ts-ignore
      const value = props.movie[pair.moviePropertyName];
      if (value) return (
        <TextInfoPairDisplay property={pair.property}
                             value={value}
                             key={pair.property}/>
      );
      else return null;
    })}
  </View>
);

export default MovieCardBody;
