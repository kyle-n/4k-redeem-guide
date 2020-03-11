import 'react-native';
import React from 'react';
import {shallow} from 'enzyme';
import LoadingPage from '../loading/loading.page';

describe('loading page', () => {
  it('does not insta-download movies', () => {
    const downloadSpy = jest.fn();
    shallow(<LoadingPage moviesNotDownloaded={true} downloadMovies={downloadSpy} />);
    expect(downloadSpy).not.toHaveBeenCalled();
  });

});
