import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SearchPage from './search/search.page';
import SearchPageHeader from './search/search-page-header';
import CameraPage from './barcode-lookup/camera.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from './redux/reducers';
import LoadingPageContainer from './loading/loading.page.container';

const store = createStore(reducers);

const MainNavigator = createStackNavigator({
  Home: {
    screen: SearchPage,
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
