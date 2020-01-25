import React from 'react';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {View} from 'native-base';
import {Platform, StyleSheet} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {BarcodeScanData} from '../models';
import {searchByBarcode} from '../redux/actions';
import {connect} from 'react-redux';
import {BackButton} from '../shared-components';
import {baseFontSize} from '../styles';

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

type CameraPageProps = NavigationStackScreenProps & (typeof mapDispatchToProps);

const CameraPage = (props: CameraPageProps) => {
  let cameraRef: RNCamera | null;

  let barcodeRead = false;
  const onBarCodeRead = (event: any) => {
    if (barcodeRead) return;
    else barcodeRead = true;

    const scanData: BarcodeScanData = event;
    let upc: string;
    if (scanData.type.includes('EAN-13')) upc = scanData.data.slice(1);
    else upc = scanData.data;
    props.searchByBarcode(upc);
    props.navigation.navigate('Home');
  };
  return (
    <View style={[cameraPageStyles.container, cameraPageStyles.fullSize]}>
      <RNCamera style={cameraPageStyles.fullSize}
                ref={ref => cameraRef = ref}
                type={RNCamera.Constants.Type.back}
                androidCameraPermissionOptions={androidCamPermissions}
                onBarCodeRead={onBarCodeRead}
                captureAudio={false} />
      {Platform.OS === 'android' ? (
        <View style={cameraPageStyles.buttonContainer}>
          <BackButton style={cameraPageStyles.button} />
        </View>
      ) : null}
    </View>
  );
};

// @ts-ignore
export default connect(null, mapDispatchToProps)(CameraPage);
