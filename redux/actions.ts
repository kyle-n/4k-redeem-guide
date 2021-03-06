import {ActionType} from './definitions';
import {GlobalState, Movie, MovieFilters, PurchaseName} from '../models';
import {searchMovies} from '../store';
import {debounce} from 'throttle-debounce';
import {anyValueTruthy} from '../utils';
import loadMovies from '../store/spreadsheet.connector';
import {defaultFilters} from './reducers';
import {getMovieTitleFromBarcode} from '../barcode-lookup/barcode-spider.connector';
import {Alert} from 'react-native';

export type ActionAndValue = {
  type: ActionType
  value: any;
}

const debouncedSearchMovies = debounce(2 * 1000, (dispatch: Function, getState: () => GlobalState) => {

  dispatch(setOffset(0));

  const {query, filters, offset, movies} = getState();

  if (anyValueTruthy(getState().filters) || getState().query) {
    searchMovies(movies, query, filters,{offset, limit: 15}).then(resp => {
      dispatch(setOffset(resp.nextIndexToEvaluate));
      dispatch(setResults(resp.results));
      dispatch(setIsLoading(false));

      // check if more results
      return searchMovies(
        movies, query, filters,
        {offset: resp.nextIndexToEvaluate, previousResults: getState().results, limit: 1}
      );
    }).then(checkingMoreResp => {
      const noMore = !checkingMoreResp.results.length;
      dispatch(setNoMoreResults(noMore));
    });
  } else {
    dispatch(setIsLoading(false));
  }
});

const doSearchOrReset = (dispatch: Function, getState: () => GlobalState) => {
  const {query, filters} = getState();

  // do search
  if (query || anyValueTruthy(filters)) {
    dispatch(setIsLoading(true));
    debouncedSearchMovies(dispatch, getState);
  // reset state
  } else {
    dispatch(setOffset(0));
    dispatch(setResults([]));
    dispatch(setNoMoreResults(false));
  }
};

function setNoMoreResults(noMoreResults: boolean): ActionAndValue {
  return {type: 'SET_NO_MORE_RESULTS', value: noMoreResults};
}

function setResults(results: number[]): ActionAndValue {
  return {type: 'SET_RESULTS', value: results};
}

export function loadMoreResults() {
  return async function (dispatch: Function, getState: () => GlobalState) {
    let state = getState();
    dispatch(setIsLoading(true));
    const moreResults = await searchMovies(
      state.movies, state.query, state.filters,
      {offset: state.offset, limit: 15, previousResults: state.results}
    );
    const results = state.results.concat(moreResults.results);
    dispatch(setResults(results));
    dispatch(setOffset(moreResults.nextIndexToEvaluate));
    state = getState();
    const hasMoreResults = await searchMovies(
      state.movies, state.query, state.filters,
      {offset: state.offset, limit: 1, previousResults: state.results}
    );
    dispatch(setNoMoreResults(hasMoreResults.results.length < 1));
    dispatch(setIsLoading(false));
    return;
  }
}

export function setQueryAndSearch(query: string) {
  return function (dispatch: Function, getState: () => GlobalState) {
    dispatch(setQuery(query))
    doSearchOrReset(dispatch, getState);
    return;
  }
}

function setOffset(offset: number): ActionAndValue {
  return {type: 'SET_OFFSET', value: offset};
}

export function setQuery(query: string): ActionAndValue {
  return {type: 'SET_QUERY', value: query};
}

export function clearQuery() {
  return function (dispatch: Function, getState: () => GlobalState) {
    dispatch(setQuery(''));
    doSearchOrReset(dispatch, getState);
    return;
  }
}

export function setFiltersAndSearch(filters: MovieFilters) {
  return function (dispatch: Function, getState: () => GlobalState) {
    dispatch(setFilters(filters));
    doSearchOrReset(dispatch, getState);
    return;
  }
}

export function setFilters(filters: MovieFilters): ActionAndValue {
  return {type: 'SET_FILTERS', value: filters};
}

export function clearFilters() {
  return function (dispatch: Function, getState: () => GlobalState) {
    dispatch(setFilters(Object.assign({}, defaultFilters)));
    doSearchOrReset(dispatch, getState);
    return;
  }
}

export function setMovies(movies: Movie[]): ActionAndValue {
  return {type: 'SET_MOVIES', value: movies};
}

export function setIsLoading(isLoading: boolean): ActionAndValue {
  return {type: 'SET_LOADING', value: isLoading};
}

export function setFiltersVisible(visible: boolean): ActionAndValue {
  return {type: 'SET_FILTERS_VISIBLE', value: visible};
}

export function toggleFiltersVisible(): ActionAndValue {
  return {type: 'TOGGLE_FILTERS_VISIBLE', value: null};
}

async function getMoviesFromSpreadsheet(): Promise<Movie[]> {
  function getFromSpreadsheet(resolve: (movies: Movie[]) => void): void {
    loadMovies()
      .then(movies => resolve(movies))
      .catch(() => {
        Alert.alert(
          'Download error',
          'An error occurred while downloading films from the spreadsheet. Try again?',
          [
            {text: 'OK', style: 'default', onPress: () => getFromSpreadsheet(resolve)}
          ]
        );
      });
  }

  return new Promise<Movie[]>(resolve => {
    getFromSpreadsheet(resolve);
  });
}

export function downloadMovies() {
  return async function (dispatch: Function) {
    dispatch(setIsLoading(true));
    const movies = await getMoviesFromSpreadsheet();
    dispatch(setMovies(movies));
    dispatch(setIsLoading(false));
  }
}

export function clearMovieCache() {
  return function(dispatch: Function) {
    dispatch(setResults([]));
    dispatch(clearFilters());
    dispatch(clearQuery());
    dispatch(setOffset(0));
    dispatch(setMovies([]))
  }
}

export function searchByBarcode(barcode: string) {
  return async function (dispatch: Function) {
    dispatch(setIsLoading(true));
    dispatch(clearFilters());
    const title = await getMovieTitleFromBarcode(barcode)
    if (title) dispatch(setQueryAndSearch(title));
    else {
      dispatch(setIsLoading(false));
      Alert.alert('Error', 'Could not load movie data from barcode');
    }
  }
}

export function toggleLinksModalVisible(): ActionAndValue {
  return {type: 'TOGGLE_LINKS_MODAL_VISIBLE', value: null};
}

export function registerPurchase(purchaseId: PurchaseName): ActionAndValue {
  return {type: 'REGISTER_PURCHASE', value: purchaseId};
}

export function toggleAutoDownloadOnData(): ActionAndValue {
  return {type: 'TOGGLE_AUTO_DOWNLOAD_ON_DATA', value: null};
}
