import React from 'react';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {Button, Icon, View} from 'native-base';
import {Platform, StyleSheet} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {BarcodeScanData} from '../models';
import {searchByBarcode} from '../redux/actions';
import {connect} from 'react-redux';
import {baseFontSize} from '../styles';
import {withNavigation} from "react-navigation";

const cameraPageStyles = StyleSheet.create({
  fullSize: {
    flexGrow: 1,
    alignSelf: 'stretch'
  },
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: baseFontSize,
    alignSelf: 'center',
    zIndex: 1,
    width: baseFontSize * 5,
    height: baseFontSize * 5,
    display: 'flex',
    flexDirection: 'column'
  },
  button: {
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

const androidCamPermissions = {
  title: 'Permission to use camera',
  message: 'The camera is used to scan the barcode on a movie\'s box.',
  buttonPositive: 'OK',
  buttonNegative: 'Cancel'
};

const mapDispatchToProps = {searchByBarcode};

export const searchBarcodeAndNavigate = (
  searchByBarcode: (upc: string) => void,
  navigate: () => void,
  barcodeRead: boolean,
  event: any
): boolean => {
  if (barcodeRead) return true;

  const scanData: BarcodeScanData = event;
  let upc = scanData.data.slice(1);
  searchByBarcode(upc);
  navigate();

  return true;
};

type CameraPageProps = NavigationStackScreenProps & (typeof mapDispatchToProps);

const CameraPage = (props: CameraPageProps) => {
  let cameraRef: RNCamera | null;

  let barcodeRead = false;
  const onBarCodeRead = (event: any) => {
    barcodeRead = searchBarcodeAndNavigate(
      props.searchByBarcode,
      () => props.navigation.navigate('Home'),
      barcodeRead,
      event
    );
  };
  return (
    <View style={[cameraPageStyles.container, cameraPageStyles.fullSize]}>
      <RNCamera style={cameraPageStyles.fullSize}
                ref={ref => cameraRef = ref}
                type={RNCamera.Constants.Type.back}
                androidCameraPermissionOptions={androidCamPermissions}
                onBarCodeRead={onBarCodeRead}
                captureAudio={false} />
      {Platform.OS === 'ios' ? (
        <View style={cameraPageStyles.buttonContainer}>
          <BackButton style={cameraPageStyles.button} />
        </View>
      ) : null}
    </View>
  );
};

type BackButtonProps = NavigationStackScreenProps & {
  style?: any;
};
const BackButton = withNavigation((props: BackButtonProps) => (
  <Button onPress={() => props.navigation.goBack()}
          style={props.style || null}
          large rounded warning>
    <Icon name="ios-arrow-back" ios="ios-arrow-back" android="md-arrow-back" />
  </Button>
));

// @ts-ignore
export default connect(null, mapDispatchToProps)(CameraPage);
