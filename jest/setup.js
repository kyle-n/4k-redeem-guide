import {NativeModules} from 'react-native';
import MockAsyncStorage from 'mock-async-storage';

NativeModules.RNDarkMode = {
  initialMode: 'light',
  supportsDarkMode: true,
  addListener: jest.fn(),
  removeListeners: jest.fn(),
};

const mockImpl = new MockAsyncStorage();
jest.mock('@react-native-community/async-storage', () => mockImpl);
