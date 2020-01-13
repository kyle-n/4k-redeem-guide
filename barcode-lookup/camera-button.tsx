import React from 'react';
import {Button, Icon, View} from 'native-base';
import {RNCamera} from 'react-native-camera';
import {StyleSheet} from 'react-native';

type CameraButtonProps = {};
type CameraButtonState = {
  showCamera: boolean;
};

class CameraButton extends React.Component<CameraButtonProps, CameraButtonState>{
  constructor(props: CameraButtonProps) {
    super(props);

    this.state = {showCamera: false};
  }

  render() {
    const toggleCamera = () => this.setState({showCamera: !this.state.showCamera});
    return (
      <View>
        <Button onPress={toggleCamera}
                info transparent large>
          <Icon name="ios-camera" ios="ios-camera" android="md-camera" />
        </Button>

        {this.state.showCamera ? (
          <CameraLayout visible={this.state.showCamera} />
        ) : null}

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    position: 'absolute',
    zIndex: 20,
    alignSelf: 'stretch'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
});

const androidCamPermissions = {
  title: 'Permission to use camera',
  message: 'The camera is used to scan the barcode on a movie\'s box.',
  buttonPositive: 'OK',
  buttonNegative: 'Cancel'
};

type CameraLayoutProps = {
  visible: boolean;
}
const CameraLayout = (props: CameraLayoutProps) => {
  let camera: RNCamera | null;
  console.log('rendering camera')
  return (
    <View style={styles.container}>
      <RNCamera ref={ref => camera = ref}
                style={styles.preview}
                type={RNCamera.Constants.Type.back}
                captureAudio={false}
                androidCameraPermissionOptions={androidCamPermissions}
                onGoogleVisionBarcodesDetected={({ barcodes }) => {
                  console.log(barcodes);
                }} />
    </View>
  );
};

export default CameraButton;
