import {transformToRegularTitle} from '../barcode-lookup/barcode-spider.connector';

describe('barcode spider connector', () => {

  it('returns titles without bracket patterns', () => {
    const mockTitle = 'test';
    expect(transformToRegularTitle(mockTitle)).toBe(mockTitle);
  });

  it('strips brackets from titles', () => {
    const mockTitle = 'test [123] [4K]';
    expect(transformToRegularTitle(mockTitle)).toEqual('test');
  });

});
