import {GlobalState, Movie, MovieFilters} from '../models';
import {ActionAndValue} from './actions';
import AsyncStorage from '@react-native-community/async-storage';
import {Reducer} from 'redux';
import {debounce} from 'throttle-debounce';
import {tabletMode} from '../styles';

/*
 * Todo
 *  - Scan barcode
 *  - Save and load card size pref
 *  - Save and load whole state?
 *  -
 */

export const defaultFilters: MovieFilters = {
  vuduUhd: false,
  fandangoNowUhd: false,
  itunesUhd: false,
  itunesCodeRedeemsUhd: false,
  moviesAnywhere: false,
  dolbyVision: false,
  hdr: false,
  googlePlayUhd: false,
  amazonVideoUhd: false,
  microsoftUhd: false
};

const initialState: GlobalState = {
  filters: Object.assign({}, defaultFilters),
  filtersVisible: false,
  noMoreResults: false,
  isLoading: false,
  movies: [],
  offset: 0,
  query: '',
  results: [],
  linksModalVisible: false
};

const timestampMovieCache = (): void => {
  AsyncStorage.setItem('movie_download_date', new Date().getTime().toString());
};

const cacheState = debounce(1 * 1000, (state: GlobalState): void => {
  AsyncStorage.setItem('state', JSON.stringify(state));
});
export let getCachedState = async (): Promise<GlobalState | null> => {
  const cachedStateString = await AsyncStorage.getItem('state');
  if (cachedStateString) {
    const today = new Date();
    const cachedDateString = await AsyncStorage.getItem('movie_download_date');
    if (cachedDateString) {
      const cachedDate = new Date(parseInt(cachedDateString));
      if (today.getTime() - cachedDate.getTime() < 604800 * 1000) { // 7 days
        const state: GlobalState = JSON.parse(cachedStateString);

        // should always be reset
        state.isLoading = false;
        state.filtersVisible = false;
        state.linksModalVisible = false;

        return state;
      } else return null;
    } else return null;
  } else return null;
};

const reducers: Reducer<GlobalState, ActionAndValue> = (state = initialState, dispatch: ActionAndValue): GlobalState => {
  if (!state) state = initialState;
  let newState: GlobalState;
  switch (dispatch.type) {
    case 'SET_NO_MORE_RESULTS':
      newState = Object.assign({}, state, {noMoreResults: dispatch.value})
      cacheState(newState);
      return newState;
    case 'SET_OFFSET':
      newState = Object.assign({}, state, {offset: dispatch.value});
      cacheState(newState);
      return newState;
    case 'SET_RESULTS':
      newState = Object.assign({}, state, {results: dispatch.value});
      cacheState(newState);
      return newState;
    case 'SET_FILTERS':
      newState = Object.assign({}, state, {filters: dispatch.value});
      cacheState(newState);
      return newState;
    case 'SET_FILTERS_VISIBLE':
      newState = Object.assign({}, state, {filtersVisible: dispatch.value});
      cacheState(newState);
      return newState;
    case 'TOGGLE_FILTERS_VISIBLE':
      newState = Object.assign({}, state, {filtersVisible: !state.filtersVisible});
      cacheState(newState);
      return newState;
    case 'SET_LOADING':
      newState = Object.assign({}, state, {isLoading: dispatch.value});
      cacheState(newState);
      return newState;
    case 'SET_MOVIES':
      newState = Object.assign({}, state, {movies: dispatch.value});
      cacheState(newState);
      timestampMovieCache();
      return newState;
    case 'SET_QUERY':
      newState = Object.assign({}, state, {query: dispatch.value});
      cacheState(newState);
      return newState;
    case 'TOGGLE_LINKS_MODAL_VISIBLE':
      newState = Object.assign({}, state, {linksModalVisible: !state.linksModalVisible});
      cacheState(newState);
      return newState;
    default:
      newState = state;
      cacheState(newState);
      return newState;
  }
};

export default reducers;
