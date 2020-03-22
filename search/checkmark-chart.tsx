import React from 'react';
import {Left, List, ListItem, Text} from 'native-base';
import {Movie, MoviePropertyDisplayPair} from '../models';
import {StyleSheet} from 'react-native';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import {darkLightGray, sharedDynamicStyleSheet} from '../styles';
import {Checkmark} from '../shared-components';

const checkmarkValues: MoviePropertyDisplayPair[] = [
  {
    displayName: 'Movies Anywhere',
    moviePropertyName: 'moviesAnywhere'
  },
  {
    displayName: 'iTunes code redeems in UHD',
    moviePropertyName: 'itunesCodeRedeemsUhd'
  },
  {
    displayName: 'Dolby Vision',
    moviePropertyName: 'dolbyVision'
  },
  {
    displayName: 'HDR',
    moviePropertyName: 'hdr'
  },
  {
    displayName: 'UHD on iTunes',
    moviePropertyName: 'itunesUhd'
  },
  {
    displayName: 'UHD on Vudu',
    moviePropertyName: 'vuduUhd'
  },
  {
    displayName: 'UHD on FandangoNOW',
    moviePropertyName: 'fandangoNowUhd'
  },
  {
    displayName: 'UHD on Google Play',
    moviePropertyName: 'googlePlayUhd'
  },
  {
    displayName: 'UHD on Amazon Video',
    moviePropertyName: 'amazonVideoUhd'
  },
  {
    displayName: 'UHD on Microsoft',
    moviePropertyName: 'microsoftUhd'
  }
];

type CheckmarkChartProps = {
  movie: Movie;
};

const CheckmarkChart = (props: CheckmarkChartProps) => (
  <List>
    {checkmarkValues.map((checkmarkValue, i) => {
      // @ts-ignore
      const val = props.movie[checkmarkValue.moviePropertyName];
      return (
        <MoviePropertyStatus key={checkmarkValue.moviePropertyName}
                             displayName={checkmarkValue.displayName}
                             last={i === checkmarkValues.length - 1}
                             value={val} />
      );
    })}
  </List>
);

type MoviePropertyStatusProps = {
  displayName: string;
  value: boolean;
  last?: boolean;
}

const moviePropertyStatusStyles = StyleSheet.create({
  disabledText: {
    color: darkLightGray
  }
});

const MoviePropertyStatus = (props: MoviePropertyStatusProps) => {
  const sharedStyles = useDynamicStyleSheet(sharedDynamicStyleSheet);
  return (
    <ListItem style={props.last ? {borderBottomWidth: 0} : null}>
      <Left>
        <Text style={props.value ? sharedStyles.dynamicColor : moviePropertyStatusStyles.disabledText}>
          {props.displayName}
        </Text>
      </Left>
      <Checkmark true={props.value}/>
    </ListItem>
  );
};

export default CheckmarkChart;
