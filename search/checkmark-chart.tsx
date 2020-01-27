import React from 'react';
import {Icon, Left, List, ListItem, Right, Text} from 'native-base';
import {Movie, MoviePropertyDisplayPair} from '../models';
import {StyleProp, StyleSheet} from 'react-native';
import {DynamicStyleSheet, DynamicValue, useDynamicStyleSheet} from 'react-native-dark-mode';
import {darkBackgroundColor, darkColor, darkerLightGray, lightBackgroundColor, lightColor} from '../styles';

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

const dynamicStyleSheet = new DynamicStyleSheet({
  colorText: {
    backgroundColor: new DynamicValue(lightBackgroundColor, darkBackgroundColor),
    color: new DynamicValue(lightColor, darkColor)
  },
  disabledText: {
    color: darkerLightGray
  }
});

const MoviePropertyStatus = (props: MoviePropertyStatusProps) => {
  const styles = useDynamicStyleSheet(dynamicStyleSheet);
  return (
    <ListItem>
      <Left>
        <Text style={props.value ? styles.colorText : styles.disabledText}>
          {props.displayName}
        </Text>
      </Left>
      <Checkmark true={props.value}/>
    </ListItem>
  );
};

const checkmarkStyles: StyleProp<any> = StyleSheet.create({
  icon: {
    backgroundColor: 'rgba(0,0,0,0)',
    textAlign: 'center'
  }
});

const yesIconStyle: StyleProp<any> = StyleSheet.create({
  icon: {
    color: 'green'
  }
});

const noIconStyle: StyleProp<any> = StyleSheet.create({
  icon: {
    color: 'lightgray'
  }
});

type CheckmarkProps = {
  true: boolean;
}

const Checkmark = (props: CheckmarkProps) => (
  <Right>
      {props.true ? (
        <Icon name="ios-checkmark-circle"
              ios="ios-checkmark-circle"
              android="md-checkmark"
              style={[checkmarkStyles.icon, yesIconStyle.icon]}/>
      ) : (
        <Icon name="ios-close"
              ios="ios-close"
              android="md-close"
              type="Ionicons"
              style={[checkmarkStyles.icon, noIconStyle.icon]}/>
      )}
  </Right>
);

export default CheckmarkChart;
