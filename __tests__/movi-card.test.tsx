import 'react-native';
import React, {Component} from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import MovieCard from '../movie-details/movie-card';

describe('movie-card', () => {
  let wrapper: ShallowWrapper<any, Readonly<{}>, Component<{}, {}, any>>;

  beforeEach(() => {
    wrapper = shallow(<MovieCard movie={} open={true} />)
  })
})
