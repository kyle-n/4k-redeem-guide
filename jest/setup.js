import {NativeModules} from 'react-native';
import MockAsyncStorage from 'mock-async-storage';
import RNCNetInfoMock from '@react-native-community/netinfo/jest/netinfo-mock.js';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {JSDOM} from 'jsdom';

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

// stub for animations
jest.mock('NativeAnimatedHelper');

// enzyme
Enzyme.configure({adapter: new Adapter()});
const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
global.requestAnimationFrame = function (callback) {
  return setTimeout(callback, 0);
};
global.cancelAnimationFrame = function (id) {
  clearTimeout(id);
};
copyProps(window, global);
