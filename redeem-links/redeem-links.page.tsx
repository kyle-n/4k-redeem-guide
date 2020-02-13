import React from 'react';
import {Button, Icon, Text, View} from 'native-base';
import {StyleSheet} from 'react-native';
import {baseFontSize, sharedDynamicStyleSheet} from '../styles';
import {openInAppBrowser} from '../shared-components';
import {useDynamicStyleSheet} from 'react-native-dark-mode';

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
  {title: 'Movies Anywhere', href: 'https://moviesanywhere.com/redeem'},
  {title: 'MovieRedeem.com (LionsGate)', href: 'https://movieredeem.com/'},
  {title: 'Paramount Digital Copy', href: 'https://www.paramountdigitalcopy.com/'},
  {title: 'Vudu', href: 'https://www.vudu.com/content/redeem.html?pn=generic'},
  {title: 'FandangoNOW', href: 'https://www.fandangonow.com/redeem'},
  {title: 'Microsoft', href: 'http://www.microsoft.com/redeem'},
];

const RedeemLinks = () => {
  const sharedStyles = useDynamicStyleSheet(sharedDynamicStyleSheet);
  return (
    <View style={[redeemPageStyles.container, sharedStyles.dynamicBackgroundColor]}>
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
