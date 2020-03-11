import 'react-native';
import React, {Component} from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import CheckBeforeDownload from '../loading/check-before-download';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {Alert} from 'react-native';
import {flushPromises} from '../jest/test-helpers';

describe('check-before-download', () => {
  let wrapper: ShallowWrapper<any, Readonly<{}>, Component<{}, {}, any>>;
  let realFn: (requestedInterface?: string | undefined) => Promise<NetInfoState>;
  let confirmSpy: any;
  let cancelSpy: any;

  const mockNetInfo: any = {details: {isConnectionExpensive: false}};

  beforeAll(() => {
    realFn = NetInfo.fetch;
    NetInfo.fetch = async (): Promise<any> => mockNetInfo;
  });

  beforeEach(() => {
    confirmSpy = jest.fn();
    cancelSpy = jest.fn();
    wrapper = shallow(<CheckBeforeDownload onCancel={cancelSpy} onConfirm={confirmSpy} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    NetInfo.fetch = realFn;
  });

  it('renders null to the DOM', () => {
    expect(wrapper.html()).toBeNull();
  });

  it('opens the alert and does not auto-confirm download when network connection is expensive', async () => {
    const fake = NetInfo.fetch;
    const expensiveNetInfo: any = {details: {isConnectionExpensive: true}};
    NetInfo.fetch = async () => expensiveNetInfo;
    jest.spyOn(Alert, 'alert');
    const confirmSpy = jest.fn();
    wrapper = shallow(<CheckBeforeDownload onCancel={jest.fn()} onConfirm={confirmSpy} />);
    await flushPromises();

    expect(Alert.alert).toHaveBeenCalled();
    expect(confirmSpy).not.toHaveBeenCalled();

    NetInfo.fetch = fake;
  });

  it('does not open alert and does auto-confirm download on inexpensive network connection', async () => {
    jest.spyOn(Alert, 'alert');
    await flushPromises();

    expect(Alert.alert).not.toHaveBeenCalled();
    expect(confirmSpy).toHaveBeenCalled();
  });

});
