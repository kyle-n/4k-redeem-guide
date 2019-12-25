import loadMovies from './spreadsheet.connector';
import {Movie} from '../models';

let movies: Movie[];

export const initializeStore = async (): Promise<void> => {
  movies = await loadMovies();
  return;
};

export const getMovies = (): Movie[] => {
  return movies.slice();
};
