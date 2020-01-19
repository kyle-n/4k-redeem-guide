import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {LoadingPage} from './store';
import SearchPage from './search/search.page';
import SearchPageHeader from './search/search-page-header';
import CameraPage from './barcode-lookup/camera.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from './redux/reducers';

const store = createStore(reducers);

const MainNavigator = createStackNavigator({
  Home: {
    screen: SearchPage,
    navigationOptions: {
      header: () => (<SearchPageHeader onCardSizeButtonPress={this.toggleSize}
                                       cardSize={this.state?.cardSize || App.defaultCardSize} />)
    }
  },
  LoadingPage: {
    screen: LoadingPage,
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
