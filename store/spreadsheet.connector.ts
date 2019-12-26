import {getWorksheet} from './gsheets.js';
import {GoogleSheetsResponse, Movie, sheetMovieToMovie} from '../models';

const spreadsheetId = '1ZsJkCX4DIv2oeCKQ7zp2ArkR1qKEXCUuCMBbUtHtmh4';
const worksheetTitle = 'All';

const loadMovies = async (): Promise<Movie[]> => {
  console.log('before get')
  const resp: GoogleSheetsResponse = await getWorksheet(spreadsheetId, worksheetTitle);
  console.log('after get')
  return resp.data.map(sheetMovieToMovie);
};

export default loadMovies;
