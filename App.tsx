import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import thunk from 'redux-thunk';
import SearchPageHeader from './search-header/search.page.header';
import CameraPage from './barcode-lookup/camera.page';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import reducers from './redux/reducers';
import LoadingPageContainer from './loading/loading.page.container';
import SearchPageContainer from './search/search.page.container';

const store = createStore(reducers, applyMiddleware(thunk));

const MainNavigator = createStackNavigator({
  Home: {
    screen: SearchPageContainer,
    navigationOptions: {
      header: () => (<SearchPageHeader />)
    }
  },
  LoadingPage: {
    screen: LoadingPageContainer,
    navigationOptions: {
      headerShown: false
    }
  },
  CameraPage: {
    screen: CameraPage,
    params: {onBarCodeRead: null},
    navigationOptions: {
      headerShown: false
    }
  }
});

const AppContainer = createAppContainer(MainNavigator);

const App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);

export default App;
