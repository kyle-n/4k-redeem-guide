import React from 'react';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {View} from 'native-base';
import {StyleSheet} from 'react-native';
import {RNCamera} from 'react-native-camera';

const cameraPageStyles = StyleSheet.create({
  fullSize: {
    flexGrow: 1,
    alignSelf: 'stretch'
  },
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
});

const androidCamPermissions = {
  title: 'Permission to use camera',
  message: 'The camera is used to scan the barcode on a movie\'s box.',
  buttonPositive: 'OK',
  buttonNegative: 'Cancel'
};

type CameraPageProps = NavigationStackScreenProps & {
  onBarCodeRead: () => void;
};

const CameraPage = (props: CameraPageProps) => {
  let cameraRef: RNCamera | null;
  return (
    <View style={[cameraPageStyles.container, cameraPageStyles.fullSize]}>
      <RNCamera style={cameraPageStyles.fullSize}
                ref={ref => cameraRef = ref}
                type={RNCamera.Constants.Type.back}
                androidCameraPermissionOptions={androidCamPermissions}
                onBarCodeRead={props.onBarCodeRead}
      />
    </View>
  );
};

export default CameraPage;
