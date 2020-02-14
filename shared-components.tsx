import React from 'react';
import {Button, Icon, View} from 'native-base';
import {Alert, BackHandler, NativeEventSubscription, Platform, StyleProp, StyleSheet} from 'react-native';
import {baseFontSize, darkerLightGray, lightColor, sharedDynamicStyleSheet} from './styles';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {withNavigation} from 'react-navigation';
import {DynamicStyleSheet, DynamicValue, useDynamicStyleSheet} from 'react-native-dark-mode';
import {CustomTabs} from 'react-native-custom-tabs';
import SafariView from 'react-native-safari-view';

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
    color: new DynamicValue(lightColor, darkerLightGray),
    shadowColor: new DynamicValue('white', 'black'),
    shadowRadius: 2,
    shadowOpacity: 10,
    shadowOffset: {width: 0, height: 1}
  }
});
type DropdownIconProps = {
  open: boolean;
}
export const DropdownIcon = (props: DropdownIconProps) => {
  const styles = useDynamicStyleSheet(dropdownDynamicStyleSheet);
  const sharedStyles = useDynamicStyleSheet(sharedDynamicStyleSheet);
  return (
    <Icon name={props.open ? 'ios-arrow-up' : 'ios-arrow-down'}
          style={styles.darkerDynamicColor} />
  );
};

export const LargeXIcon = () => (
  <Icon name="md-close" style={{fontSize: baseFontSize * 2, alignSelf: 'center'}} />
);
