import {getWorksheet} from './gsheets.js';
import {GoogleSheetsResponse, Movie, sheetMovieToMovie} from '../models';
import {testMovie} from '../test-data/black-panther';
import {bvsTestMovie} from '../test-data/bvs';

const spreadsheetId = '1ZsJkCX4DIv2oeCKQ7zp2ArkR1qKEXCUuCMBbUtHtmh4';
const worksheetTitle = 'All';

const loadMovies = async (): Promise<Movie[]> => {
  const resp: GoogleSheetsResponse = await getWorksheet(spreadsheetId, worksheetTitle);
  return resp.data.map(sheetMovieToMovie);
};

export default loadMovies;
