import 'react-native';
import React, {Component} from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import LoadingPage from '../loading/loading.page';

describe('loading page', () => {
  let wrapper: ShallowWrapper<any, Readonly<{}>, Component<{}, {}, any>>;
  let downloadSpy: any;

  beforeEach(() => {
  });

  it('does not insta-download movies', () => {
    downloadSpy = jest.fn();
    wrapper = shallow(<LoadingPage moviesNotDownloaded={true} downloadMovies={downloadSpy} />);
    expect(downloadSpy).not.toHaveBeenCalled();
  });

});
