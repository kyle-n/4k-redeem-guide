import {getMovieTitleFromBarcode, transformToRegularTitle} from '../barcode-lookup/barcode-spider.connector';
import axios from 'axios';

describe('barcode spider connector', () => {

  let mockReturnTitle: string | null = null;
  let realFn: any;

  beforeAll(() => {
    realFn = axios.get;
    axios.get = jest.fn(() => {
      return new Promise(resolve => {
        resolve({data: {item_attributes: {title: mockReturnTitle}}} as any);
      });
    });
  });

  afterAll(() => {
    axios.get = realFn;
  });

  it('returns titles without bracket patterns', () => {
    const mockTitle = 'test';
    expect(transformToRegularTitle(mockTitle)).toBe(mockTitle);
  });

  it('strips brackets from titles', () => {
    const mockTitle = 'test [123] [4K]';
    expect(transformToRegularTitle(mockTitle)).toEqual('test');
  });

  it('returns null for no title in response', async () => {
    mockReturnTitle = null;

    const title = await getMovieTitleFromBarcode('123');

    expect(title).toBeNull();
  });

  it('returns the title from the barcode API', async () => {
    mockReturnTitle = '123';

    const title = await getMovieTitleFromBarcode('123');

    expect(title).toBe('123');
  });

});
