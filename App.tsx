import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {LoadingPage} from './store';
import SearchPage from './search/search.page';
import SearchPageHeader from './search/search-page-header';

const MainNavigator = createStackNavigator({
  Home: {
    screen: SearchPage,
    navigationOptions: {
      header: () => <SearchPageHeader/>
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
