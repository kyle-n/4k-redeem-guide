import React from 'react';
import {MovieDetailsResponse} from '../store/tmdb.connector';
import {Text, View} from 'native-base';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import {sharedDynamicStyleSheet} from '../styles';

const infoPairs: {key: string, property: string, currency?: boolean}[] = [
  {key: 'release_date', property: 'Release date'},
  {key: 'overview', property: 'Overview'},
  {key: 'budget', property: 'Budget', currency: true},
  {key: 'revenue', property: 'Revenue', currency: true},
  {key: 'original_language', property: 'Original language'},
];

type MovieInfoAsideBoxProps = {
  details: MovieDetailsResponse;
};

const MovieInfoAsideBox = (props: MovieInfoAsideBoxProps) => {
  const sharedStyles = useDynamicStyleSheet(sharedDynamicStyleSheet);
  return (
    <View style={[
      sharedStyles.dynamicColor,
      sharedStyles.squareEntity
    ]}>
      {props.details.tagline ? (
        <Text>
          {props.details.tagline}
        </Text>
      ) : null}
      {infoPairs.map(pair => {
        // @ts-ignore
        const info = props.details[pair.key];
        return (
          <AsideTextInfo property={pair.property}
                         key={pair.key}
                         info={info} />
        );
      })}
    </View>
  );
};

type AsideTextInfoProps = {
  property: string;
  info: string;
  currency?: boolean;
};

const AsideTextInfo = (props: AsideTextInfoProps) => {
  return (
    <Text>
      <Text style={{fontWeight: 'bold'}}>
        {props.property}
      </Text>
      <Text>
        &nbsp; {props.info}
      </Text>
    </Text>
  );
};

export default MovieInfoAsideBox;
