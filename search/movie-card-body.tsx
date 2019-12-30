import React from 'react';
import {CardItem, Container, Text, View} from 'native-base';
import {Movie} from '../models';
import {StyleSheet} from 'react-native';

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

type MovieCardBodyProps = {
  movie: Movie
};

const movieCardBodyStyles = StyleSheet.create({
  label: {
    fontWeight: 'bold'
  },
  labelContainer: {
    paddingBottom: 0
  },
});

const MovieCardBody = (props: MovieCardBodyProps) => {
  return (
    <View>
      {textInfoPairs.map(pair => {
        // @ts-ignore
        const value = props.movie[pair.moviePropertyName];
        if (value) return (
          <TextInfoPairDisplay property={pair.property}
                               value={value}
                               key={pair.property} />
        );
        else return null;
      })}
    </View>
  );
};

type TextInfoPairDisplayProps = {
  property: string;
  value: string;
}

const TextInfoPairDisplay = (props: TextInfoPairDisplayProps) => (
  <View>
    <CardItem style={movieCardBodyStyles.labelContainer}>
      <Text style={movieCardBodyStyles.label}>
        {props.property}
      </Text>
    </CardItem>
    <CardItem>
      <Text>
        {props.value}
      </Text>
    </CardItem>
  </View>
);

export default MovieCardBody;
