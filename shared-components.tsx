import React from 'react';
import {View} from 'native-base';
import {Alert, BackHandler, NativeEventSubscription, StyleSheet} from 'react-native';
import {baseFontSize} from './styles';

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
