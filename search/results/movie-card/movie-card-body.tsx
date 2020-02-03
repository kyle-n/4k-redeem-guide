import React from 'react';
import {View} from 'native-base';
import {Movie, MoviePropertyDisplayPair} from '../../../models';
import TextInfoPairDisplay from './movie-card-text-info';
import {Hr} from '../../../shared-components';
import CheckmarkChart from '../../checkmark-chart';
import {ImageBackground} from 'react-native';
import {getMovieImage} from '../../../store/omdb.connector';

type MovieCardBodyProps = {
  movie: Movie
};

const MovieCardBody = (props: MovieCardBodyProps) => {
  return (
    <ImageBackground source={{uri: 'https://facebook.github.io/react-native/img/opengraph.png'}}
                     style={{width: '100%', height: 'auto'}}>
      <View>
        <TextInfoPairs movie={props.movie}/>
        <Hr />
        <CheckmarkChart movie={props.movie} />
      </View>
    </ImageBackground>
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

const TextInfoPairs = (props: MovieCardBodyProps) => (
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

export default MovieCardBody;
