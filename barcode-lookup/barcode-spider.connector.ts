import axios from 'axios'
import {Movie} from '../models';
import {searchByTitleAndStudio} from '../store';

interface BarcodeSpiderApiResponse {
  item_response: {
    code: number;
    status: string;
    message: string;
  };
  // * = string of int
  item_attributes: {
    title: string;
    upc: string; // *
    ean: string // *
    parent_category: string;
    category: string;
    brand: string // studio
    model: string;
    mpn: string;
    asin: string;
    color: string;
    size: string;
    weight: string;
    image: string;
    description: string; // html
  }
  // also returns 'Stores', but I'm not using this
}

/*
 * It is not great to put API keys in the client, but better security does not make sense given the financial
 * situation of this app. I do not expect:
 *
 * 1) to make great amounts of money from this
 * 2) to face any serious attacker
 *
 * If this app starts making money, I will set up a simple server.
 */
const apiKey = '3f6ccdfcccd803f69c9e';
const baseUrl = 'https://api.barcodespider.com/v1/lookup?token=' + apiKey + '&upc=';

const transformToRegularTitle = (title: string): string => {
  const pattern = ' [';
  if (!title.includes(pattern)) return title;
  return title.split(pattern).slice(0, -1).join();
};

export const getMovieFromBarcode = async (barcode: string): Promise<Movie | null> => {
  const url = baseUrl + barcode;
  const resp: BarcodeSpiderApiResponse = (await axios.get(url)).data;
  console.log('got resp', resp)

  const regularTitle = transformToRegularTitle(resp.item_attributes.title);
  console.log(regularTitle, 'reg title')
  return await searchByTitleAndStudio(regularTitle, resp.item_attributes.brand);
};
