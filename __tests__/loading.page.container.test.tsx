import 'react-native';
import React, {Component} from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import {LoadingPageContainer} from '../loading/loading.page.container';

describe('loading page container', () => {
  let wrapper: ShallowWrapper<any, Readonly<{}>, Component<{}, {}, any>>;
  let downloadSpy: Function;
  let navSpy: any;

  beforeEach(() => {
    downloadSpy = jest.fn();
    navSpy = {
      navigate: jest.fn()
    };
    wrapper = shallow(<LoadingPageContainer moviesNotDownloaded={true}
                                            downloadMovies={downloadSpy}
                                            navigation={navSpy} />);
  });

  it('does not render null if movies need download', () => {
    expect(wrapper.html()).not.toBeNull();
  });

  it('navs home and renders null if movies downloaded', () => {
    wrapper = shallow(<LoadingPageContainer moviesNotDownloaded={false}
                                            downloadMovies={downloadSpy}
                                            navigation={navSpy} />);
    expect(navSpy.navigate).toHaveBeenCalled();
    expect(wrapper.html()).toBeNull();
  });

});
