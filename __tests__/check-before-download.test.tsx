import 'react-native';
import React, {Component} from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import CheckBeforeDownload from '../loading/check-before-download';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {Alert} from 'react-native';

describe('check-before-download', () => {
  let wrapper: ShallowWrapper<any, Readonly<{}>, Component<{}, {}, any>>;
  let realFn: (requestedInterface?: string | undefined) => Promise<NetInfoState>;

  const mockNetInfo: any = {details: {isConnectionExpensive: false}};

  const flushPromises = (): Promise<void> => new Promise<void>(setImmediate);

  beforeAll(() => {
    realFn = NetInfo.fetch;
    NetInfo.fetch = async (): Promise<any> => mockNetInfo;
  });

  beforeEach(() => {
    wrapper = shallow(<CheckBeforeDownload onCancel={jest.fn} onConfirm={jest.fn} />);
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

  it('opens the alert when network connection is expensive', async () => {
    const fake = NetInfo.fetch;
    const expensiveNetInfo: any = {details: {isConnectionExpensive: true}};
    NetInfo.fetch = async () => expensiveNetInfo;
    jest.spyOn(Alert, 'alert');
    wrapper = shallow(<CheckBeforeDownload onCancel={jest.fn} onConfirm={jest.fn} />);
    await flushPromises();

    expect(Alert.alert).toHaveBeenCalled();

    NetInfo.fetch = fake;
  });

  it('does not open alert on inexpensive network connection', async () => {
    jest.spyOn(Alert, 'alert');
    await flushPromises();

    expect(Alert.alert).not.toHaveBeenCalled();
  });

});
