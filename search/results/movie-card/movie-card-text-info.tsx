import React from 'react';
import {Button, CardItem, Icon, Text, View} from 'native-base';
import {Platform, StyleSheet} from 'react-native';
import isUrl from 'is-url';
import extractDomain from 'extract-domain';
import {CustomTabs} from 'react-native-custom-tabs';
import {extractUrls} from '../../../utils';
import {baseFontSize} from '../../../styles';
import SafariView from 'react-native-safari-view';

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
  } else if (props.text.includes(' ') && props.text.includes('http')) {
    return (
      <View>
        {extractUrls(props.text).map(url => {
          return (
          <InfoLink key={url} link={url} addVerticalMargin={true} />
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
  addVerticalMargin?: boolean;
};

const InfoLink = (props: InfoLinkProps) => {
  const openLink = (): void => {
    if (Platform.OS === 'android') {
      CustomTabs.openURL(props.link, {
        enableUrlBarHiding: true,
        showPageTitle: true,
      });
    } else if (Platform.OS === 'ios') {
      SafariView.show({url: props.link});
    }
  };
  return (
    <View style={{alignSelf: 'flex-start'}}>
      <Button onPress={openLink}
              info rounded
              style={props.addVerticalMargin ? {marginVertical: 0.5 * baseFontSize} : null}>
        <Text>
          {extractDomain(props.link)}
        </Text>
        <Icon style={{marginLeft: 0}} name="external-link" type="EvilIcons" />
      </Button>
    </View>
  );
};

export default TextInfoPairDisplay;
