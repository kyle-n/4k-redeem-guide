import React from 'react';
import {Button, Icon, Right, Text, View} from 'native-base';
import {Alert, BackHandler, NativeEventSubscription, Platform, StyleProp, StyleSheet} from 'react-native';
import {baseFontSize, darkerLightGray, darkLightGray, lightColor, sharedDynamicStyleSheet, tabletMode} from './styles';
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
  return (
    <Icon name={props.open ? 'ios-arrow-up' : 'ios-arrow-down'}
          style={styles.darkerDynamicColor} />
  );
};

export const LargeXIcon = () => (
  <Icon name="md-close" style={{fontSize: baseFontSize * 2, alignSelf: 'center'}} />
);

type CloseButtonProps = {
  onPress: () => void | undefined;
};
export const CloseButton = (props: CloseButtonProps) => {
  const sharedStyles = useDynamicStyleSheet(sharedDynamicStyleSheet);
  return (
    <View style={{margin: baseFontSize}}>
      <Button onPress={props.onPress}
              info large transparent style={sharedStyles.squareEntity}>
        <LargeXIcon />
      </Button>
    </View>
  );
};

type BackButtonProps = {
  onPress?: () => void;
};

export const HiddenBackButton = () => (
  <View style={{opacity: 0}}>
    <BackButton />
  </View>
);

export const BackButton = (props: BackButtonProps) => {
  const sharedStyles = useDynamicStyleSheet(sharedDynamicStyleSheet);
  return (
    <Button onPress={props.onPress ? props.onPress : undefined}
            dark transparent large iconLeft={Platform.OS === 'ios'}>
      <Icon name="ios-arrow-back" ios="ios-arrow-back" android="md-arrow-back"
            style={[sharedStyles.dynamicTextColor]} />
      {tabletMode() ? (
        <Text style={sharedStyles.dynamicTextColor}>Back</Text>
      ) : null}
    </Button>
  );
};

export const DownloadIcon = () => (
  <Icon name="ios-download" ios="ios-download" android="md-download"
        style={{fontSize: 2 * baseFontSize}} />
);

const checkmarkStyles: StyleProp<any> = StyleSheet.create({
  icon: {
    backgroundColor: 'rgba(0,0,0,0)',
    textAlign: 'center'
  },
  yesIcon: {
    color: 'green'
  },
  noIconStyle: {
    color: darkLightGray
  }
});

type CheckmarkProps = {
  true: boolean;
}

export const Checkmark = (props: CheckmarkProps) => (
  <Right>
    {props.true ? (
      <Icon name="checkcircle"
            type="AntDesign"
            style={[checkmarkStyles.icon, checkmarkStyles.yesIcon]}/>
    ) : (
      <Icon name="close"
            type="AntDesign"
            style={[checkmarkStyles.icon, checkmarkStyles.noIconStyle]}/>
    )}
  </Right>
);
