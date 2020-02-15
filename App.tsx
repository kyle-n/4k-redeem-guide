import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import thunk from 'redux-thunk';
import SearchPageHeader from './search-header/search.page.header';
import CameraPage from './barcode-lookup/camera.page';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore, Store} from 'redux';
import reducers, {getCachedState} from './redux/reducers';
import LoadingPageContainer from './loading/loading.page.container';
import SearchPageContainer from './search/search.page.container';
import RedeemLinksPageContainer from './redeem-links/redeem-links.page.container';
import RedeemLinksHeader from './redeem-links/redeem-links.page.header';
import MovieDetailsPageContainer from './movie-details/movie-details.page.container';

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
    navigationOptions: {
      headerShown: false
    }
  },
  RedeemLinksPage: {
    screen: RedeemLinksPageContainer,
    navigationOptions: {
      headerTitle: 'Redeem codes',
      header: () => (<RedeemLinksHeader />)
    }
  },
  MovieDetailsPage: {
    screen: MovieDetailsPageContainer,
    navigationOptions: {
      headerTitle: 'Movie details'
    }
  }
});

const AppContainer = createAppContainer(MainNavigator);

type AppProps = {};
type AppState = {
  store: Store | null;
}
class App extends React.Component<AppProps, AppState>{
  constructor(props: AppProps) {
    super(props);
    this.state = {store: null};
  }

  componentDidMount(): void {
    getCachedState().then(cachedState => {
      if (cachedState) {
        this.setState({store: createStore(reducers, cachedState, applyMiddleware(thunk))});
      } else this.setState({store: createStore(reducers, applyMiddleware(thunk))});
    });
  }

  render() {
    return this.state.store ? (
      <Provider store={this.state.store}>
        <AppContainer />
      </Provider>
    ) : null;
  }

}

export default App;
