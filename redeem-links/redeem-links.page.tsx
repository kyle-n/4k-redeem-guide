import React from 'react';
import {Button, Icon, Text, View} from 'native-base';
import {Platform, StyleSheet} from 'react-native';
import {InfoLink} from '../search/results/movie-card/movie-card-text-info';
import {baseFontSize} from '../styles';
import {CustomTabs} from 'react-native-custom-tabs';
import SafariView from 'react-native-safari-view';
import {openInAppBrowser} from '../shared-components';

type RedeemLinksProps = {};

const redeemPageStyles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  buttonBox: {
    margin: baseFontSize
  }
});

const links: Array<{title: string, href: string}> = [
  {title: 'Movies Anywhere', href: ''},
  {title: 'iTunes', href: ''},
  {title: 'Vudu', href: ''},
  {title: 'FandangoNOW', href: ''},
  {title: 'Amazon Video', href: ''},
  {title: 'Microsoft', href: ''}
];

const RedeemLinks = () => {
  return (
    <View style={redeemPageStyles.container}>
      {links.map(link => {
        return (
          <View key={link.title} style={redeemPageStyles.buttonBox}>
            <Button onPress={() => openInAppBrowser(link.href)}
                    info rounded iconLeft>
              <Icon name="external-link" type="EvilIcons" />
              <Text>{link.title}</Text>
            </Button>
          </View>
        );
      })}
    </View>
  );
};

export default RedeemLinks;
