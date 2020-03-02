import 'react-native';
import React, {Component} from 'react';
import {shallow, ShallowWrapper} from 'enzyme'
import App from '../App';

describe('app', () => {
  let wrapper: ShallowWrapper<any, Readonly<{}>, Component<{}, {}, any>>;
  let component: any;

  beforeEach(() => {
    wrapper = shallow(<App />);
    component = wrapper.instance();
  });

  it('renders null with null store state', () => {
    expect(wrapper.html()).toBeNull();
  });
});
