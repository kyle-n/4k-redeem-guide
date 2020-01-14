import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {LoadingPage} from './store';
import SearchPage from './search/search.page';
import SearchPageHeader from './search/search-page-header';
import {CardSize} from './models';
import AsyncStorage from '@react-native-community/async-storage';
import CameraPage from './barcode-lookup/camera.page';
import {Barcode} from 'react-native-camera';
import {getMovieFromBarcode} from './barcode-lookup/barcode-spider.connector';
import {throttle} from 'throttle-debounce';

type AppProps = {};
type AppState = {
  cardSize: CardSize;
};

class App extends React.Component<AppProps, AppState>{
  private static readonly defaultCardSize = 0;
  private static readonly cardSizePrefName = 'cardSizePref';

  constructor(props: AppProps) {
    super(props);

    this.state = {cardSize: App.defaultCardSize};
    this.getSavedSizePref().then(cardSize => {
      if (cardSize) this.setState({cardSize});
    });
  }

  onBarCodeRead = async (barcode: Barcode): Promise<void> => {
    console.log(barcode)
    const upc = barcode.data.slice(1);
    const foundMovie = await getMovieFromBarcode(upc);
    console.log(foundMovie)
  };

  throttledBarCodeRead = throttle(10 * 1000, this.onBarCodeRead);

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
    },
    CameraPage: {
      screen: CameraPage,
      params: {onBarCodeRead: this.onBarCodeRead},
      navigationOptions: {
        headerShown: false
      }
    }
  });
  AppContainer = createAppContainer(this.MainNavigator);

  getSavedSizePref = async (): Promise<CardSize | null> => {
    const savedSizePref: string | null = await AsyncStorage.getItem(App.cardSizePrefName);
    if (savedSizePref) {
      return parseInt(savedSizePref) as CardSize;
    } else return null;
  };

  saveSizePref = async (size: CardSize): Promise<void> => {
    await AsyncStorage.setItem(App.cardSizePrefName, size.toString());
  };

  toggleSize = (): void => {
    const cardSize = this.state.cardSize === 0 ? 1 : 0;
    this.setState({cardSize}, () => this.saveSizePref(this.state.cardSize));
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
