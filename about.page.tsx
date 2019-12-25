import React from 'react';
import {View, Text} from 'react-native';
import {Navigation} from 'react-native-navigation';

Navigation.registerComponent('AboutPage', () => AboutPage);

export const AboutPage = () => (
  <View>
    <Text>About this app</Text>
    <Text>Icon: The Twemoji Project</Text>
  </View>
);

export default AboutPage;
