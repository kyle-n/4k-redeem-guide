import React from 'react';
import {MovieDetailsResponse} from '../store/tmdb.connector';
import {Text, View} from 'native-base';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import {baseFontSize, sharedDynamicStyleSheet} from '../styles';
import NumberFormat from 'react-number-format';
import {StyleSheet} from 'react-native';

const asideStyles = StyleSheet.create({
  container: {
    padding: baseFontSize
  },
  regularText: {
    fontSize: baseFontSize
  },
  taglineText: {
    fontSize: baseFontSize * 2.5,
    marginBottom: baseFontSize * 2.5 / 2
  }
});

type MovieInfoAsideBoxProps = {
  details: MovieDetailsResponse;
};

const MovieInfoAsideBox = (props: MovieInfoAsideBoxProps) => {
  const sharedStyles = useDynamicStyleSheet(sharedDynamicStyleSheet);
  const genres: string = props.details.genres.map(genre => genre.name).join(', ');
  return (
    <View style={[
      sharedStyles.dynamicColor,
      sharedStyles.squareEntity,
      asideStyles.container
    ]}>
      {props.details.tagline ? (
        <Text style={asideStyles.taglineText}>
          {props.details.tagline}
        </Text>
      ) : null}
      <AsideTextInfo property="Release date" info={props.details.release_date} />
      {props.details.overview ? (
        <AsideTextInfo property="Overview" info={props.details.overview} />
      ) : null}
      {genres ? (
        <AsideTextInfo property="Genres" info={genres} />
      ) : null}
      {props.details.budget ? (
        <AsideTextInfo property="Budget" info={props.details.budget} currency={true} />
      ) : null}
      <AsideTextInfo property="Revenue" info={props.details.revenue} currency={true} />
      <AsideTextInfo property="Original language" info={props.details.original_language.toUpperCase()} />
    </View>
  );
};

type AsideTextInfoProps = {
  property: string;
  info: string | number;
  currency?: boolean;
};

const AsideTextInfo = (props: AsideTextInfoProps) => {
  let roundedVal: number;
  if (props.currency) {
    roundedVal = props.info as number / 1000000;
    roundedVal = Math.round((roundedVal + Number.EPSILON) * 100) / 100;
  }
  return (
    <Text style={{marginBottom: baseFontSize / 2}}>
      <RegularText text={props.property} style={[{fontWeight: 'bold'}]} />
      <Text style={[
        asideStyles.regularText
      ]}>
        &nbsp;
        {props.currency ? (
          // @ts-ignore
          <NumberFormat prefix="$" suffix=" million" value={roundedVal}
                        thousandSeparator={true} displayType="text"
                        renderText={num => <RegularText text={num} />}
          />
        ) : props.info}
      </Text>
    </Text>
  );
};

type RegularTextProps = {
  text: string;
  style?: any[];
}

const RegularText = (props: RegularTextProps) => {
  const sharedStyles = useDynamicStyleSheet(sharedDynamicStyleSheet);
  let componentStyle = [sharedStyles.dynamicColor, asideStyles.regularText];
  if (props.style?.length) {
    componentStyle = componentStyle.concat(props.style);
  }
  return (
    <Text style={componentStyle}>
      {props.text}
    </Text>
  );
};

export default MovieInfoAsideBox;
