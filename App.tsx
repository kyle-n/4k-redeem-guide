import React from 'react';
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
          {component: {name: 'LoadingPage'}}
        ]
      }
    }
  });
  await Navigation.push('LoadingPage', {
    component: {
      name: 'LoadingPage',
      options: {
        topBar: {title: {text: 'Loading..'}}
      }
    }
  });
});

const App = () => {
  console.log('rendered')
  return (
    <View>
      <Text>Hello 3</Text>
    </View>
  );
};

export default App;
