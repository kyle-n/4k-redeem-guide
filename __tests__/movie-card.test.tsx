import 'react-native';
import React, {Component} from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import MovieCard from '../movie-details/movie-card';
import * as tmdbConnector from '../store/tmdb.connector';
import {flushPromises} from '../jest/test-helpers';

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

  it('sets state correctly on image load', async () => {
    await flushPromises();
    const state: any = wrapper.state();
    expect(state.backgroundImgLoaded).toBe(true);
    expect(state.backgroundImgUrl).toBe('url');
    expect(wrapper.html()).not.toBeNull();
  });

});
