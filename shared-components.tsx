import React from 'react';
import {Button, Icon, Right, View} from 'native-base';
import {Alert, BackHandler, NativeEventSubscription, StyleProp, StyleSheet} from 'react-native';
import {baseFontSize, darkerLightGray, lightColor} from './styles';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {withNavigation} from 'react-navigation';
import {DynamicStyleSheet, DynamicValue, useDynamicStyleSheet} from 'react-native-dark-mode';

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
          large rounded warning>
    <Icon name="ios-arrow-back" ios="ios-arrow-back" android="md-arrow-back" />
  </Button>
));

const dropdownDynamicStyleSheet = new DynamicStyleSheet({
  darkerDynamicColor: {
    color: new DynamicValue(lightColor, darkerLightGray)
  }
});
type DropdownIconProps = {
  open: boolean;
}
export const DropdownIcon = (props: DropdownIconProps) => {
  const styles = useDynamicStyleSheet(dropdownDynamicStyleSheet);
  return (
    <Icon name={props.open ? 'ios-arrow-up' : 'ios-arrow-down'}
          style={styles.darkerDynamicColor} />
  );
};
