import loadMovies from './spreadsheet.connector';
import AsyncStorage from '@react-native-community/async-storage';
import {Movie} from '../models';

let movies: Movie[] = [];
const moviesKey = 'movies';
const dateKey = 'lastSavedMoviesDate';

export const initializeStore = async (): Promise<void> => {
  const downloadMovies = async (): Promise<void> => {
    movies = await loadMovies();
    await AsyncStorage.setItem(moviesKey, JSON.stringify(movies));
    await AsyncStorage.setItem(dateKey, new Date().getTime().toString());
  };

  try {

    // checks if cache is a week old
    const storedLastUpdatedDate = await AsyncStorage.getItem(dateKey);
    if (!storedLastUpdatedDate) {
      await downloadMovies();
      return;
    } else {
      const lastUpdatedDate: number = parseInt(storedLastUpdatedDate);
      if (new Date().getDate() - 7 >= new Date(lastUpdatedDate).getDate()) {
        await downloadMovies();
        return;
      }
    }

    // loads movies from storage if stored, otherwise downloads them
    const storedMovies: string | null = await AsyncStorage.getItem('movies');
    if (storedMovies?.length) {
      movies = JSON.parse(<string>storedMovies);
    } else await downloadMovies();
  } catch {
    await downloadMovies();
  }
  return;
};

export const getMovies = (): Movie[] => {
  return movies.slice();
};


// need to group property types - iterate over all text props the same way, all booleans, etc
export const searchMovies = (query: string): Movie[] => {

  // helpers
  const transformToMatchableText = (s: string): string => {
    return s.replace(/[\s-]/g, '').toLowerCase();
  };

  // setup
  const transformedQuery = transformToMatchableText(query);
  const results: Movie[] = [];

  // iterate over movies
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
