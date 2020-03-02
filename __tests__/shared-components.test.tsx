import 'react-native';
import React, {Component} from 'react';
import {shallow, ShallowWrapper} from 'enzyme'
import {DropdownIcon} from '../shared-components';
import {Icon} from 'native-base';

describe('shared components', () => {

  it('toggles arrows by dropdown icon', () => {
    let wrapper = shallow(<DropdownIcon open={false} />);
    expect(wrapper.find({name: 'ios-arrow-down'}).length).toBe(1);
    expect(wrapper.find({name: 'ios-arrow-up'}).length).toBe(0);

    wrapper = shallow(<DropdownIcon open={true} />)
    expect(wrapper.find({name: 'ios-arrow-down'}).length).toBe(0);
    expect(wrapper.find({name: 'ios-arrow-up'}).length).toBe(1);
  });

});
