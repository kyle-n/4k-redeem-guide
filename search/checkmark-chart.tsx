import React from 'react';
import {Button, Icon, Left, List, ListItem, Right, Text, View} from 'native-base';
import {Movie, MoviePropertyDisplayPair} from '../models';
import {baseFontSize} from '../styles';
import {StyleProp, StyleSheet} from 'react-native';

const checkmarkValues: MoviePropertyDisplayPair[] = [
  {
    displayName: 'UHD on Vudu',
    moviePropertyName: 'vuduUhd'
  },
  {
    displayName: 'UHD on FandangoNOW',
    moviePropertyName: 'fandangoNowUhd'
  },
  {
    displayName: 'UHD on iTunes',
    moviePropertyName: 'itunesUhd'
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
    displayName: 'iTunes code redeems UHD',
    moviePropertyName: 'itunesCodeRedeemsUhd'
  },
  {
    displayName: 'Movies Anywhere',
    moviePropertyName: 'moviesAnywhere'
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
    {checkmarkValues.map(checkmarkValue => {
      // @ts-ignore
      const val = props.movie[checkmarkValue.moviePropertyName];
      return (
        <MoviePropertyStatus key={checkmarkValue.moviePropertyName}
                             displayName={checkmarkValue.displayName}
                             value={val} />
      );
    })}
  </List>
);

type MoviePropertyStatusProps = {
  displayName: string;
  value: boolean;
}

const MoviePropertyStatus = (props: MoviePropertyStatusProps) => (
  <ListItem>
    <Left>
      <Text note={!props.value}>{props.displayName}</Text>
    </Left>
    <Checkmark true={props.value}/>
  </ListItem>
);

const checkmarkStyles: StyleProp<any> = StyleSheet.create({
  icon: {
    backgroundColor: 'rgba(0,0,0,0)',
    display: 'flex',
    justifyContent: 'center',
  }
});

const yesColors: StyleProp<any> = StyleSheet.create({
  icon: {
    color: 'green'
  }
});

const yesStyles: StyleProp<any> = StyleSheet.compose(checkmarkStyles, yesColors);

type CheckmarkProps = {
  true: boolean;
}

const Checkmark = (props: CheckmarkProps) => (
  <Right>
      {props.true ? (
        <Icon ios="ios-checkmark-circle" android="md-checkmark"
              style={yesStyles}/>
      ) : (
        <Icon ios="ios-close" android="md-close" type="Ionicons" style={checkmarkStyles.icon}/>
      )}
  </Right>
);

export default CheckmarkChart;
