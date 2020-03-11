import 'react-native';
import React, {Component} from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import MovieCard from '../movie-details/movie-card';
import * as tmdbConnector from '../store/tmdb.connector';

describe('movie-card', () => {
  let wrapper: ShallowWrapper<any, Readonly<{}>, Component<{}, {}, any>>;
  let movieMock: any;
  let realFn: (title: string, year?: number | undefined) => Promise<string | null>;
  let getImgSpy: any;

  beforeAll(() => {
    realFn = tmdbConnector.getMovieImage;
    getImgSpy = jest.fn(async () => 'url');
    tmdbConnector.getMovieImage = getImgSpy;
  });

  beforeEach(() => {
    movieMock = {};
    wrapper = shallow(<MovieCard movie={movieMock} />)
  });

  afterAll(() => {
    tmdbConnector.getMovieImage = realFn;
  });

  it('renders null while movie image is loading', () => {
    expect(wrapper.html()).toBeNull();
  });

});
