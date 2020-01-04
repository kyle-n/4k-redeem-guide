import React from 'react';
import {CardItem, Text, View} from 'native-base';
import {StyleSheet} from 'react-native';
import isUrl from 'is-url';
import {CustomTabs} from 'react-native-custom-tabs';

const movieCardBodyStyles = StyleSheet.create({
  label: {
    fontWeight: 'bold'
  },
  labelContainer: {
    paddingBottom: 0
  },
});

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
      <TextOrLink text={props.value}/>
    </CardItem>
  </View>
);

type TextOrLinkProps = {
  text: string;
};

const TextOrLink = (props: TextOrLinkProps) => {
  return isUrl(props.text) ? (
    <InfoLink link={props.text} />
  ) : (
    <Text>{props.text}</Text>
  );
};

type InfoLinkProps = {
  link: string;
};

const InfoLink = (props: InfoLinkProps) => {
  const openLink = () => {
    return CustomTabs.openURL(props.link, {
      enableUrlBarHiding: true,
      showPageTitle: true,
    });
  };
  return (
    <Text onPress={openLink}>
      {props.link}
    </Text>
  );
};

export default TextInfoPairDisplay;
