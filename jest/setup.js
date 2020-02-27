import {NativeModules} from 'react-native';
import MockAsyncStorage from 'mock-async-storage';
import RNCNetInfoMock from '@react-native-community/netinfo/jest/netinfo-mock.js';

// mock dep for RN Dark Mode
NativeModules.RNDarkMode = {
  initialMode: 'light',
  supportsDarkMode: true,
  addListener: jest.fn(),
  removeListeners: jest.fn(),
};

// mock AsyncStorage
const mockImpl = new MockAsyncStorage();
jest.mock('@react-native-community/async-storage', () => mockImpl);

// mock network info
NativeModules.RNCNetInfo = RNCNetInfoMock;

// mock safari IAB
jest.mock('react-native-safari-view', () => {
  return {
    show: () => {}
  }
});
