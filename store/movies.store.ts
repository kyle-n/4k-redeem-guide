import loadMovies from './spreadsheet.connector';
import AsyncStorage from '@react-native-community/async-storage';
import {Movie, MovieFilters} from '../models';

let movies: Movie[] = [];
const moviesKey = 'movies';
const dateKey = 'lastSavedMoviesDate';

// checks if cache exists and is < a week old
export const hasValidLocalCache = async (): Promise<boolean> => {
  const storedLastUpdatedDate = await AsyncStorage.getItem(dateKey);
  if (!storedLastUpdatedDate) {
    return false;
  } else {
    const lastUpdatedDate: number = parseInt(storedLastUpdatedDate);
    if (new Date().getDate() - 7 >= new Date(lastUpdatedDate).getDate()) {
      return false;
    } else {
      const storedMovies = await AsyncStorage.getItem(moviesKey);
      if (!storedMovies || !JSON.parse(storedMovies)?.length) {
        return false;
      } else return true;
    }
  }
};

export const initializeStore = async (validCache: boolean): Promise<void> => {

  // load from API
  const downloadMovies = async (): Promise<void> => {
    movies = await loadMovies();
    await AsyncStorage.setItem(moviesKey, JSON.stringify(movies));
    await AsyncStorage.setItem(dateKey, new Date().getTime().toString());
  };

  // load from AsyncStorage
  const loadMoviesFromCache = async (): Promise<void> => {
    try {
      const storedMovies = await AsyncStorage.getItem(moviesKey);
      if (storedMovies) {
        movies = JSON.parse(storedMovies);
      } else await downloadMovies();
    } catch {
      await downloadMovies();
    }
  };

  if (validCache) {
    await loadMoviesFromCache();
    return;
  } else {
    await downloadMovies();
    return;
  }

};

export const getMovies = (): Movie[] => {
  return movies.slice();
};

// helpers
const transformToMatchableText = (s: string): string => {
  return s.replace(/[\s-]/g, '').toLowerCase();
};

type SearchMovieResponse = {
  results: Movie[];
  nextIndexToEvaluate: number;
};


// need to group property types - iterate over all text props the same way, all booleans, etc
export const searchMovies = (
  query: string,
  filters: MovieFilters | null,
  config?: {offset?: number, limit?: number}
): SearchMovieResponse => {

  // short-circuit on searches already at end of movie list
  if (config?.offset && config.offset >= movies.length) {
    return {results: [], nextIndexToEvaluate: config.offset};
  }

  // setup
  const transformedQuery = transformToMatchableText(query);
  const results: Movie[] = [];
  const limit = config?.limit ? config.limit : 15;
  const startingIndex = config?.offset ? config.offset : 0;
  let nextIndexToEvaluate = startingIndex;

  // manually checks properties to go faster - see https://bit.ly/2N5P4Ac
  for (let i = startingIndex; i < movies.length; i++) {
    // bump next index
    nextIndexToEvaluate++;

    // narrow by filters
    if (
      filters && (
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
      )
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

export const searchByTitleAndStudio = async (title: string, studio: string): Promise<Movie | null> => {
  const transformedTitle = transformToMatchableText(title);
  const transformedStudio = transformToMatchableText(studio);

  for (let i = 0; i < movies.length; i++) {
    const transformedMovieTitle = transformToMatchableText(movies[i].title);
    const transformedMovieStudio = transformToMatchableText(movies[i].studio);

    if (transformedMovieTitle === 'moonlight') {
      console.log(transformedMovieTitle, transformedMovieStudio)
      console.log(transformedTitle, transformedStudio)
    }

    if (
      transformedTitle.includes(transformedMovieTitle) && (
        transformedStudio.includes(transformedMovieStudio) ||
        transformedMovieStudio.includes(transformedStudio)
      )
    ) return movies[i];
  }

  return null;
};

export const clearMovieCache = async (): Promise<void> => {
  await AsyncStorage.removeItem(moviesKey);
  await AsyncStorage.removeItem(dateKey);
};
