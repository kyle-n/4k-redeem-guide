import React from 'react';
import {Button, CardItem, Icon, Text, View} from 'native-base';
import {StyleSheet} from 'react-native';
import isUrl from 'is-url';
import extractDomain from 'extract-domain';
import {baseFontSize, darkerLightGray, lightColor, sharedDynamicStyleSheet} from '../styles';
import {DynamicStyleSheet, DynamicValue, useDynamicStyleSheet} from 'react-native-dark-mode';
import {openInAppBrowser} from '../utils';

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

const TextInfoPairDisplay = (props: TextInfoPairDisplayProps) => {
  const sharedStyles = useDynamicStyleSheet(sharedDynamicStyleSheet);
  return (
    <View>
      <CardItem style={[movieCardBodyStyles.labelContainer, sharedStyles.dynamicColor]}>
        <Text style={[movieCardBodyStyles.label, sharedStyles.dynamicColor]}>
          {props.property}
        </Text>
      </CardItem>
      <CardItem style={sharedStyles.dynamicColor}>
        <TextOrLink text={props.value}/>
      </CardItem>
    </View>
  );
};

const dynamicStyleSheet = new DynamicStyleSheet({
  infoText: {
    color: new DynamicValue(lightColor, darkerLightGray)
  }
});

const textOrLinkStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    alignItems: 'center'
  }
});

type TextOrLinkProps = {
  text: string;
};

const TextOrLink = (props: TextOrLinkProps) => {
  const sharedStyles = useDynamicStyleSheet(sharedDynamicStyleSheet);
  if (isUrl(props.text)) {
    return (
      <InfoLink link={props.text}/>
    );
  } else if (props.text.includes(' ') && props.text.includes('http')) {
    return (
      <View style={textOrLinkStyles.container}>
          {props.text.split(' ').map((textSegment, i) => {
            if (isUrl(textSegment)) {
              return (
                <InfoLink key={i} link={textSegment} addVerticalMargin={true} />
              );
            } else return (
            <Text style={sharedStyles.dynamicTextColor} key={i}>{textSegment}&nbsp;</Text>
            );
          })}
      </View>
    );
  } else {
    return (
      <Text style={[useDynamicStyleSheet(dynamicStyleSheet).infoText, sharedStyles.dynamicTextColor]}>
        {props.text}
      </Text>
    );
  }
};

type InfoLinkProps = {
  link: string;
  addVerticalMargin?: boolean;
};

const InfoLink = (props: InfoLinkProps) => {
  return (
    <View style={{alignSelf: 'flex-start', display: 'flex', flexDirection: 'row'}}>
      <Button onPress={() => openInAppBrowser(props.link)}
              info rounded small
              style={props.addVerticalMargin ? {marginVertical: 0.5 * baseFontSize} : null}>
        <Text>
          {extractDomain(props.link)}
        </Text>
        <Icon style={{marginLeft: 0}} name="external-link" type="EvilIcons" />
      </Button>
      <Text>&nbsp;</Text>
    </View>
  );
};

export default TextInfoPairDisplay;
