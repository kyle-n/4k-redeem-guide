/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {Fragment} from 'react';
import {
  View,
  Text,
} from 'react-native';
import {Navigation} from 'react-native-navigation';

Navigation.events().registerAppLaunchedListener(async () => {
  console.log('launched')
  await Navigation.setRoot({
    root: {
      stack: {
        children: [
          {component: {name: 'startup'}}
        ]
      }
    }
  });
  await Navigation.push('startup', {
    component: {
      name: 'startup',
      options: {
        topBar: {title: {text: 'Loading..'}}
      }
    }
  });
});

const App = () => {
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
};

export default App;
