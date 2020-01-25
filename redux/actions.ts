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

const debouncedSearchMovies = debounce(2 * 1000, (dispatch: Function, getState: () => GlobalState) => {

  dispatch(setOffset(0));

  const {query, filters, offset, movies} = getState();

  const resp = searchMovies(movies, query, filters, {offset});
  console.log(resp, 'results')

  dispatch(setOffset(resp.nextIndexToEvaluate));
  dispatch(setResults(resp.results));
  dispatch(setIsLoading(false));

  // check if more results
  const checkingMoreResp = searchMovies(movies, query, filters, {offset: resp.nextIndexToEvaluate});
  console.log(checkingMoreResp, 'more')
  const noMore = !checkingMoreResp.results.length;
  dispatch(setNoMoreResults(noMore));
});

const doSearchOrReset = (dispatch: Function, getState: () => GlobalState) => {
  const {query, filters} = getState();

  // do search
  if (query || anyValueTruthy(filters)) {
    console.log('doing search', query)
    dispatch(setIsLoading(true));
    debouncedSearchMovies(dispatch, getState);
  // reset state
  } else {
    console.log('resetting results')
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
  return function (dispatch: Function, getState: () => GlobalState) {
    const state = getState();
    dispatch(setIsLoading(true));
    const moreResults = searchMovies(state.movies, state.query, state.filters, {offset: state.offset, limit: 15});
    const results = state.results.concat(moreResults.results);
    dispatch(setResults(results));
    dispatch(setOffset(moreResults.nextIndexToEvaluate));
    const hasMoreResults = searchMovies(state.movies, state.query, state.filters, {offset: state.offset, limit: 1});
    dispatch(setNoMoreResults(hasMoreResults.results.length < 1));
    dispatch(setIsLoading(false));
    return;
  }
}

export function setQueryAndSearch(query: string) {
  return function (dispatch: Function, getState: () => GlobalState) {
    dispatch(setQuery(query))
    doSearchOrReset(dispatch, getState);
    console.log(getState(), 'after search')
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
  return function (dispatch: Function) {
    dispatch(setQuery(''));
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
