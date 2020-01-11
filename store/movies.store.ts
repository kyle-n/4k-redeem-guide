import loadMovies from './spreadsheet.connector';
import AsyncStorage from '@react-native-community/async-storage';
import {Movie, MovieFilters} from '../models';

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

type SearchMovieResponse = {
  results: Movie[];
  nextIndexToEvaluate: number;
};

// need to group property types - iterate over all text props the same way, all booleans, etc
export const searchMovies = (
  query: string,
  filters: MovieFilters,
  config?: {offset?: number, limit?: number}
): SearchMovieResponse => {

  // short-circuit on searches already at end of movie list
  if (config?.offset && config.offset >= movies.length) {
    return {results: [], nextIndexToEvaluate: config.offset};
  }

  // helpers
  const transformToMatchableText = (s: string): string => {
    return s.replace(/[\s-]/g, '').toLowerCase();
  };

  // setup
  const transformedQuery = transformToMatchableText(query);
  const results: Movie[] = [];
  const limit = config && config.limit ? config.limit : 15;
  const startingIndex = config && config.offset ? config.offset : 0;
  let nextIndexToEvaluate = startingIndex;

  // manually checks properties to go faster - see https://bit.ly/2N5P4Ac
  for (let i = startingIndex; i < movies.length; i++) {
    // bump next index
    nextIndexToEvaluate++;

    // narrow by filters
    if (
      filters.vuduUhd && !movies[i].vuduUhd ||
      filters.fandangoNowUhd && !movies[i].fandangoNowUhd ||
      filters.itunesUhd && !movies[i].itunesUhd ||
      filters.itunesCodeRedeemsUhd && !movies[i].itunesCodeRedeemsUhd ||
      filters.moviesAnywhere && !movies[i].moviesAnywhere ||
      filters.dolbyVision && !movies[i].dolbyVision ||
      filters.hdr && !movies[i].hdr ||
      filters.googlePlayUhd && !movies[i].googlePlayUhd ||
      filters.amazonVideoUhd && !movies[i].amazonVideoUhd ||
      filters.microsoftUhd && !movies[i].microsoftUhd
    ) {
      continue;
    }

    // title
    if (
      // string properties
      transformToMatchableText(movies[i].title).includes(transformedQuery) ||
      transformToMatchableText(movies[i].studio).includes(transformedQuery) ||
      transformToMatchableText(movies[i].maCodeLocation).includes(transformedQuery) ||
      transformToMatchableText(movies[i].vuduFandangoCodeLocation).includes(transformedQuery)
  ) {
      results.push(movies[i]);
      if (results.length === limit) break;
      else continue;
    }

  }

  return {results, nextIndexToEvaluate};
};
