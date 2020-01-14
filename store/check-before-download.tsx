import React from 'react';
import {hasValidLocalCache} from './movies.store';
import {Alert} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

type CheckBeforeDownloadProps = {
  onCancel: () => void;
  onConfirm: (hasCache: boolean) => void;
}

const CheckBeforeDownload = (props: CheckBeforeDownloadProps) => {
  const check = async () => {
    const hasCache = await hasValidLocalCache();
    if (hasCache) {
      props.onConfirm(true);
    } else {
      const netInfo = await NetInfo.fetch();
      if (netInfo.details?.isConnectionExpensive) {
        // warn the user if they're about to download ~2.5MB on data
        Alert.alert(
          'Download 3 MB on data?',
          'It may take a few minutes on a slow connection.',
          [
            {text: 'Cancel', onPress: props.onCancel, style: 'cancel'},
            {text: 'OK', onPress: () => props.onConfirm(false), style: 'default'}
          ]
        )
      } else props.onConfirm(false);
    }
  };
  check();
  return null;
};

export default CheckBeforeDownload;
