import loadMovies from './spreadsheet.connector';
import {Movie} from '../models';

let movies: Movie[] = [];

export const initializeStore = async (): Promise<void> => {
  console.log('movies')
  movies = await loadMovies();
  console.log('loaded')
  return;
};

export const getMovies = (): Movie[] => {
  return movies.slice();
};
