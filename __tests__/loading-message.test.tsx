import 'react-native';
import React, {Component} from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import LoadingMessage from '../loading/loading-message';

describe('loading message', () => {
  let wrapper: ShallowWrapper<any, Readonly<{}>, Component<{}, {}, any>>;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    wrapper = shallow(<LoadingMessage />);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('displays first message', () => {
    console.log(wrapper.html());
    expect(wrapper.html()).toContain('Loading films...');
  });

  it('cycles to a new message every 5 seconds', () => {
    const realFn = LoadingMessage.prototype.setState;
    const setStateSpy = jest.fn(() => console.log('SPY CALL'));
    LoadingMessage.prototype.setState = setStateSpy;

    wrapper = shallow(<LoadingMessage />);

    jest.advanceTimersByTime(13 * 1000);

    // once for setting intervalId, twice for updating message
    expect(setStateSpy).toHaveBeenCalledTimes(3);

    LoadingMessage.prototype.setState = realFn;
  });

  it('alternates serious and goofy messages', () => {
    jest.advanceTimersByTime(6 * 1000);

    // once for setting intervalId, twice for updating message
    expect((wrapper.state() as any).goGoofy).toBe(false);
  });

  it('appends an ellipsis onto a random message', () => {
    jest.advanceTimersByTime(6 * 1000);

    expect(wrapper.html()).toContain('...');
  });

});
