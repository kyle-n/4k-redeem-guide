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
  cardSize: CardSize;
};

class App extends React.Component<AppProps, AppState>{
  private static readonly defaultCardSize = 0;

  constructor(props: AppProps) {
    super(props);

    this.state = {cardSize: App.defaultCardSize};
  }

  MainNavigator = createStackNavigator({
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
    }
  });
  AppContainer = createAppContainer(this.MainNavigator);

  toggleSize = (): void => {
    const cardSize = this.state.cardSize === 0 ? 1 : 0;
    this.setState({cardSize});
  };

  render() {
    return (
      <this.AppContainer screenProps={{
        cardSize: this.state?.cardSize || App.defaultCardSize
      }} />
    );
  }
}

export default App;
