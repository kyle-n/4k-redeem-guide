import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {LoadingPage} from './store';

const MainNavigator = createStackNavigator({
  Loading: {screen: LoadingPage}
});

const App = () => createAppContainer(MainNavigator);

export default App;
