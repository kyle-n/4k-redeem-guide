import AsyncStorage from '@react-native-community/async-storage';
import {Movie, MovieFilters} from '../models';

const moviesKey = 'movies';
const dateKey = 'lastSavedMoviesDate';

// helpers
const transformToMatchableText = (s: string): string => {
  return s.replace(/[\s-]/g, '').toLowerCase();
};

type SearchMovieResponse = {
  results: number[];
  nextIndexToEvaluate: number;
};


// need to group property types - iterate over all text props the same way, all booleans, etc
export const searchMovies = async (
  movies: Movie[],
  query: string,
  filters: MovieFilters | null,
  config?: {offset?: number, limit?: number}
): Promise<SearchMovieResponse> => {

  // short-circuit on searches already at end of movie list
  if (config?.offset && config.offset >= movies.length) {
    return {results: [], nextIndexToEvaluate: config.offset};
  }

  // setup
  const transformedQuery = transformToMatchableText(query);
  const results: number[] = [];
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
      transformToMatchableText(movies[i].vuduFandangoCodeLocation).includes(transformedQuery) ||
      (movies[i].year && transformToMatchableText((movies[i].year as number).toString()).includes(transformedQuery))
  ) {
      results.push(i);
      if (results.length === limit) break;
      else continue;
    }

  }

  return {results, nextIndexToEvaluate};
};

export const searchByTitleAndStudio = async (
  movies: Movie[],
  title: string,
  studio: string
): Promise<Movie | null> => {
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
