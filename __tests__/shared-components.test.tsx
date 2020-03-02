import 'react-native';
import React from 'react';
import {shallow} from 'enzyme'
import {BackButton, CloseButton, DropdownIcon, HiddenBackButton} from '../shared-components';
import {Button, Text, View} from 'native-base';
import * as styles from '../styles';

describe('shared components', () => {

  it('toggles arrows by dropdown icon', () => {
    let wrapper = shallow(<DropdownIcon open={false} />);
    expect(wrapper.find({name: 'ios-arrow-down'}).length).toBe(1);
    expect(wrapper.find({name: 'ios-arrow-up'}).length).toBe(0);

    wrapper = shallow(<DropdownIcon open={true} />)
    expect(wrapper.find({name: 'ios-arrow-down'}).length).toBe(0);
    expect(wrapper.find({name: 'ios-arrow-up'}).length).toBe(1);
  });

  it('runs a function on CloseButton press', () => {
    const mockOnPress = jest.fn();
    const wrapper = shallow(<CloseButton onPress={mockOnPress} />);
    wrapper.find(Button).simulate('press');
    expect(mockOnPress).toHaveBeenCalled();
  });

  it('hides the hidden back button', () => {
    const wrapper = shallow(<HiddenBackButton />);
    expect(wrapper.find(View).prop('style')).toHaveProperty('opacity', 0);
  });

  it('runs the callback for BackButton onPress', () => {
    const mockOnPress = jest.fn();
    const wrapper = shallow(<BackButton onPress={mockOnPress} />);
    wrapper.find(Button).simulate('press');
    expect(mockOnPress).toHaveBeenCalled();
  });

  it('hides back text in phone mode', () => {
    let wrapper = shallow(<BackButton/>);
    expect(wrapper.find(Text).length).toBe(0);
  });

  it('displays back text in tablet mode', () => {
    const realFn = styles.tabletMode;
    styles.tabletMode = jest.fn().mockReturnValue(true);

    const wrapper = shallow(<BackButton />);
    expect(wrapper.find(Text).length).toBe(1);

    styles.tabletMode = realFn;
  });

});
