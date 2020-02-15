import React from 'react';
import {MovieDetailsResponse} from '../store/tmdb.connector';
import {Text, View} from 'native-base';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import {sharedDynamicStyleSheet} from '../styles';

type AsideTextInfoProps = {
  property: string;
  info: string;
};

const infoPairs: {key: string, property: string}[] = [
  {key: 'release_date', property: 'Release date'}
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
