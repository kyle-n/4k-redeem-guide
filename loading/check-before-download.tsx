import React from 'react';
import {Alert} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

type CheckBeforeDownloadProps = {
  autoDownloadOnData: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const CheckBeforeDownload = (props: CheckBeforeDownloadProps) => {
  NetInfo.fetch().then(netInfo => {
    if (netInfo.details?.isConnectionExpensive && !props.autoDownloadOnData) {
      // warn the user if they're about to download ~2.5MB on data
      Alert.alert(
        'Download 3 MB on data?',
        'It may take a few minutes on a slow connection.',
        [
          {text: 'Cancel', onPress: props.onCancel, style: 'cancel'},
          {text: 'OK', onPress: props.onConfirm, style: 'default'}
        ]
      )
    } else props.onConfirm();
  });
  return null;
};

export default CheckBeforeDownload;
