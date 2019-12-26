import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {LoadingPage} from './store';
import SearchPage from './search/search.page';

const MainNavigator = createStackNavigator({
  Home: {
    screen: SearchPage,
    navigationOptions: {
      title: 'Search'
    }
  },
  LoadingPage: {
    screen: LoadingPage,
    navigationOptions: {
      headerShown: false
    }
  }
});
const AppContainer = createAppContainer(MainNavigator);

const App = () => (
  <AppContainer />
);

export default App;
