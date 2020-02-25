import {NativeModules} from 'react-native';

NativeModules.RNDarkMode = {
  initialMode: 'light',
  supportsDarkMode: true,
  addListener: jest.fn(),
  removeListeners: jest.fn(),
};