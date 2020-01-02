import loadMovies from './spreadsheet.connector';
import {Movie} from '../models';

let movies: Movie[] = [];

export const initializeStore = async (): Promise<void> => {
  movies = await loadMovies();
  return;
};

export const getMovies = (): Movie[] => {
  return movies.slice();
};

const transformToMatchableText = (s: string): string => {
  return s.replace(/[\s-]/g, '').toLowerCase();
};

export const searchMovies = (query: string): Movie[] => {
  const transformedQuery = transformToMatchableText(query);
  const results: Movie[] = [];
  for (let i = 0; i < movies.length; i++) {
    if (transformToMatchableText(movies[i].title).includes(transformedQuery)) {
      results.push(movies[i]);
    }
  }

  return results;
};
