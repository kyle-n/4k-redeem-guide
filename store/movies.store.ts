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

// need to group property types - iterate over all text props the same way, all booleans, etc
export const searchMovies = (query: string): Movie[] => {
  const transformedQuery = transformToMatchableText(query);
  const results: Movie[] = [];
  for (let i = 0; i < movies.length; i++) {
    if (transformToMatchableText(movies[i].title).includes(transformedQuery)) {
      results.push(movies[i]);
      continue;
    }

    let continueLoop = false;
    for (let q = 0; q < Object.keys(movies[i]).length; q++) {
      if (transformToMatchableText(Object.keys(movies[i])[q]).includes(transformedQuery)) {
        results.push(movies[i]);
        continueLoop = true;
        break;
      }
    }
    if (continueLoop) continue;
  }

  return results;
};
