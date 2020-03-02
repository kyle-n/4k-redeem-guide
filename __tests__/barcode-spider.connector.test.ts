import {getMovieTitleFromBarcode, transformToRegularTitle} from '../barcode-lookup/barcode-spider.connector';
import axios from 'axios';

describe('barcode spider connector', () => {

  it('returns titles without bracket patterns', () => {
    const mockTitle = 'test';
    expect(transformToRegularTitle(mockTitle)).toBe(mockTitle);
  });

  it('strips brackets from titles', () => {
    const mockTitle = 'test [123] [4K]';
    expect(transformToRegularTitle(mockTitle)).toEqual('test');
  });

  it('returns null for no title in response', async () => {
    const realFn = axios.get;
    axios.get = jest.fn(() => {
      return new Promise(resolve => {
        resolve({data: {item_attributes: null}} as any);
      });
    });

    const title = await getMovieTitleFromBarcode('123');

    expect(title).toBeNull();

    axios.get = realFn;
  });

  it('returns the title from the barcode API', async () => {
    const realFn = axios.get;
    axios.get = jest.fn(() => {
      return new Promise(resolve => {
        resolve({data: {item_attributes: {title: '123'}}} as any);
      });
    });

    const title = await getMovieTitleFromBarcode('123');

    expect(title).toBe('123');

    axios.get = realFn;
  });

});
