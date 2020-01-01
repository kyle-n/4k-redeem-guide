import React from 'react';
import {Button, Icon, Left, List, ListItem, Right, Text, View} from 'native-base';
import {Movie, MoviePropertyDisplayPair} from '../models';

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
      <Text>{props.displayName}</Text>
    </Left>
    <Checkmark true={props.value}/>
  </ListItem>
);

type CheckmarkProps = {
  true: boolean;
}

const Checkmark = (props: CheckmarkProps) => (
  <Right>
    {props.true ? (
      <Icon name="ios-checkmark-circle" style={{backgroundColor: 'rgba(0,0,0,0)', color: 'green'}} />
    ) : (
      <Icon name="close" style={{backgroundColor: 'rgba(0,0,0,0)', color: 'lightgray'}} />
    )}
  </Right>
);

export default CheckmarkChart;
