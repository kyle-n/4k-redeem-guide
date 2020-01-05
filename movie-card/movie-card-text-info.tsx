import React from 'react';
import {Button, CardItem, Text, View} from 'native-base';
import {StyleSheet} from 'react-native';
import isUrl from 'is-url';
import extractDomain from 'extract-domain';
import {CustomTabs} from 'react-native-custom-tabs';
import {extractUrls} from '../utils';

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
  if (isUrl(props.text)) {
    return (
      <InfoLink link={props.text}/>
    );
  } else if (props.text.includes(' ')) {
    return (
      <View>
        {extractUrls(props.text).map(url => {
          return (
          <InfoLink key={url} link={url} />
          );
        })}
      </View>
    );
  } else {
    return (
      <Text>{props.text}</Text>
    );
  }
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
    <View style={{textAlign: 'center'}}>
      <Button onPress={openLink} info>
        <Text>
          {extractDomain(props.link)}
        </Text>
      </Button>
    </View>
  );
};

export default TextInfoPairDisplay;
