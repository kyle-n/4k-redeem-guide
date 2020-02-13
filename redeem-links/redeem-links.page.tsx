import React from 'react';
import {Button, Icon, Text, View} from 'native-base';
import {StyleSheet} from 'react-native';
import {InfoLink} from '../search/results/movie-card/movie-card-text-info';
import {baseFontSize} from '../styles';

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

const RedeemLinks = (props: RedeemLinksProps) => {
  return (
    <View style={redeemPageStyles.container}>
      {links.map(link => {
        return (
          <View key={link.title} style={redeemPageStyles.buttonBox}>
            <Button
                    info rounded iconLeft>
              <Icon name="external-link" type="EvilIcons" />
              <Text>{link.title}</Text>
            </Button>
          </View>
        );
      })}
    </View>
  )
};

export default RedeemLinks;
