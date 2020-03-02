import {shallow} from 'enzyme';
import React from 'react';
import {CameraPage, searchBarcodeAndNavigate} from '../barcode-lookup/camera.page';
import {CameraBackButton} from '../barcode-lookup/camera.page';
import {Platform} from 'react-native';

describe('camera.page', () => {

  it('correctly transforms and searches for a barcode', () => {
    const mockBarcode: any = {data: '123'};
    const stubSearch = jest.fn();
    const stubNav = jest.fn();
    let barcodeRead = false;

    barcodeRead = searchBarcodeAndNavigate(
      stubSearch,
      stubNav,
      barcodeRead,
      mockBarcode
    );

    expect(barcodeRead).toBe(true);
    expect(stubSearch).toHaveBeenCalledWith('23');
    expect(stubNav).toHaveBeenCalled();
  });

  it('does not search if the barcode has already been read', () => {
    const mockBarcode: any = {data: '123'};
    const stubSearch = jest.fn();
    const stubNav = jest.fn();
    let barcodeRead = true;

    barcodeRead = searchBarcodeAndNavigate(
      stubSearch,
      stubNav,
      barcodeRead,
      mockBarcode
    );

    expect(barcodeRead).toBe(true);
    expect(stubSearch).not.toHaveBeenCalled();
    expect(stubNav).not.toHaveBeenCalled();
  });

  it('renders the back button on iOS on the camera screen', () => {
    const realVal = Platform.OS;
    Platform.OS = 'ios';

    const mockNavigation: any = {goBack: jest.fn()};
    const wrapper = shallow(<CameraPage navigation={mockNavigation} />);

    expect(wrapper.find(CameraBackButton).length).toBe(1);

    Platform.OS = realVal;
  });

});
