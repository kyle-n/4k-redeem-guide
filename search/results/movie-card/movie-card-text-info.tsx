import React from 'react';
import {Button, CardItem, Icon, Text, View} from 'native-base';
import {Platform, StyleSheet} from 'react-native';
import isUrl from 'is-url';
import extractDomain from 'extract-domain';
import {CustomTabs} from 'react-native-custom-tabs';
import {baseFontSize, darkerLightGray, lightColor, sharedDynamicStyleSheet} from '../../../styles';
import SafariView from 'react-native-safari-view';
import {DynamicStyleSheet, DynamicValue, useDynamicStyleSheet} from 'react-native-dark-mode';

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
              <Text key={i}>{textSegment}</Text>
            );
          })}
      </View>
    );
  } else {
    return (
      <Text style={useDynamicStyleSheet(dynamicStyleSheet).infoText}>{props.text}</Text>
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
