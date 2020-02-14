import {Platform} from 'react-native';
import {CustomTabs} from 'react-native-custom-tabs';
import SafariView from 'react-native-safari-view';

export const spreadsheetDateToJsDate = (spreadsheetDate: number): Date => {
  return new Date((spreadsheetDate- (25567 + 1)) * 86400 * 1000);
};

export const anyValueTruthy = (obj: Object): boolean => {
  return Object.values(obj)
    .reduce((anyTruthy, val) => anyTruthy || val, false);
};

export const openInAppBrowser = (href: string): void => {
  if (Platform.OS === 'android') {
    CustomTabs.openURL(href, {
      enableUrlBarHiding: true,
      showPageTitle: true,
    });
  } else if (Platform.OS === 'ios') {
    SafariView.show({url: href});
  }
};
