import React from 'react';
import {Button, Icon, View} from 'native-base';
import {Alert, BackHandler, NativeEventSubscription, StyleProp, StyleSheet} from 'react-native';
import {baseFontSize} from './styles';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {withNavigation} from 'react-navigation';

const horizontalRuleStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: baseFontSize
  },
  hr: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '70%'
  }
});
export const Hr = () => (
  <View style={horizontalRuleStyles.container}>
    <View style={horizontalRuleStyles.hr} />
  </View>
);

type ExitOnBackButtonProps = {};
type ExitOnBackButtonState = {};
export class ExitOnBackButton extends React.Component<ExitOnBackButtonProps, ExitOnBackButtonState> {

  private backHandler: NativeEventSubscription = null as any;

  constructor(props: ExitOnBackButtonProps) {
    super(props);
    this.state = {};
  }

  componentDidMount(): void {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      Alert.alert(
        'Exit',
        'Exit the application?',
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'OK', style: 'default', onPress: BackHandler.exitApp}
        ]
      );
      return true;
    });
  }

  componentWillUnmount(): void {
    this.backHandler.remove();
  }

  render() {
    return null;
  }

}

type BackButtonProps = NavigationStackScreenProps & {
  style?: any;
};
export const BackButton = withNavigation((props: BackButtonProps) => (
  <Button onPress={() => props.navigation.goBack()}
          style={props.style || null}
          large rounded primary>
    <Icon name="ios-arrow-back" ios="ios-arrow-back" android="md-arrow-back" />
  </Button>
));
