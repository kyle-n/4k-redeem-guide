import 'react-native';
import React, {Component, ReactInstance} from 'react';
import {shallow, ShallowWrapper} from 'enzyme'
import App from '../App';
import * as reducers from '../redux/reducers';

describe('app', () => {
  let wrapper: ShallowWrapper<any, Readonly<{}>, Component<{}, {}, any>>;
  let component: ReactInstance;

  beforeEach(() => {
    wrapper = shallow(<App />);
    component = wrapper.instance();
  });

  it('renders null with null store state', () => {

  });
});
