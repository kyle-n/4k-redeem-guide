import {ActionType} from './definitions';
import {CardSize, GlobalState, Movie, MovieFilters} from '../models';
import {searchMovies} from '../store';
import {debounce} from 'throttle-debounce';
import {anyValueTruthy} from '../utils';
import loadMovies from '../store/spreadsheet.connector';

export type ActionAndValue = {
  type: ActionType
  value: any;
}

const debouncedSearchMovies = debounce(2 * 1000, (dispatch: Function, currentState: GlobalState) => {

  const {query, filters, offset} = currentState;
  dispatch(setIsLoading(true));

  const resp = searchMovies(query, filters, {offset});

  dispatch(setOffset(resp.nextIndexToEvaluate));
  dispatch(setResults(resp.results));
  dispatch(setIsLoading(false));

  // check if more results
  const checkingMoreResp = searchMovies(query, filters, {offset: resp.nextIndexToEvaluate});
  const noMore = !checkingMoreResp.results.length;
  dispatch(setNoMoreResults(noMore));
});

const doSearchOrReset = (dispatch: Function, currentState: GlobalState) => {
  const {query, filters, offset} = currentState;

  // do search
  if (query || anyValueTruthy(filters)) {
    debouncedSearchMovies(dispatch, currentState);
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

function setResults(results: Movie[]): ActionAndValue {
  return {type: 'SET_RESULTS', value: results};
}

export function setQueryAndSearch(query: string) {
  return function (dispatch: Function, getState: () => GlobalState) {
    dispatch(setQuery(query))
    doSearchOrReset(dispatch, getState());
    return;
  }
}

function setOffset(offset: number): ActionAndValue {
  return {type: 'SET_OFFSET', value: offset};
}

export function setQuery(query: string): ActionAndValue {
  return {type: 'SET_QUERY', value: query};
}

export function clearQuery(): ActionAndValue {
  return {type: 'SET_QUERY', value: ''};
}

export function setFiltersAndSearch(filters: MovieFilters) {
  return function (dispatch: Function, getState: () => GlobalState) {
    dispatch(setFilters(filters));
    doSearchOrReset(dispatch, getState());
    return;
  }
}

export function setFilters(filters: MovieFilters): ActionAndValue {
  return {type: 'SET_FILTERS', value: filters};
}

export function clearFilters(): ActionAndValue {
  return {type: 'CLEAR_FILTERS', value: null};
}

export function setMovies(movies: Movie[]): ActionAndValue {
  return {type: 'SET_MOVIES', value: movies};
}

export function setCardSize(cardSize: CardSize): ActionAndValue {
  return {type: 'SET_CARD_SIZE', value: cardSize};
}

export function toggleCardSize(): ActionAndValue {
  return {type: 'TOGGLE_CARD_SIZE', value: null}
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

export function downloadMovies() {
  return async function (dispatch: Function) {
    dispatch(setIsLoading(true));
    const movies = await loadMovies();
    dispatch(setMovies(movies));
    dispatch(setIsLoading(false));
  }
}
