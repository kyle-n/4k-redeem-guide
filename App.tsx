import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {LoadingPage} from './store';
import SearchPage from './search/search.page';
import SearchPageHeader from './search/search-page-header';
import {CardSize} from './models';
import {Animated} from 'react-native';

type AppProps = {};
type AppState = {
  size: CardSize;
};

class App extends React.Component<AppProps, AppState>{
  private static readonly defaultCardSize = 0;

  constructor(props: AppProps) {
    super(props);

    this.state = {size: App.defaultCardSize};
  }

  MainNavigator = createStackNavigator({
    Home: {
      screen: SearchPage,
      navigationOptions: {
        header: () => <SearchPageHeader onCardSizeButtonPress={this.toggleSize} />
      }
    },
    LoadingPage: {
      screen: LoadingPage,
      navigationOptions: {
        headerShown: false
      }
    }
  });
  AppContainer = createAppContainer(this.MainNavigator);

  toggleSize = (): void => {
    const size = this.state.size === 0 ? 1 : 0;
    this.setState({size});
  };

  render() {
    return (
      <this.AppContainer />
    );
  }
}

export default App;
