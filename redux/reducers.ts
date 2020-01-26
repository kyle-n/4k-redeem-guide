import {CardSize, GlobalState, Movie, MovieFilters} from '../models';
import {ActionAndValue} from './actions';
import AsyncStorage from '@react-native-community/async-storage';
import {Reducer} from 'redux';
import {debounce} from 'throttle-debounce';

const defaultCardSize: CardSize = 0;
// const cardSizePrefName = 'cardSizePref';
// const getSavedCardSizePref = async (): Promise<CardSize> => {
//   const savedPrefString = await AsyncStorage.getItem(cardSizePrefName);
//   if (savedPrefString) {
//     return parseInt(JSON.parse(savedPrefString), 10) as CardSize;
//   } else return defaultCardSize;
// };

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
  cardSize: defaultCardSize,
  filters: Object.assign({}, defaultFilters),
  filtersVisible: false,
  noMoreResults: false,
  isLoading: false,
  movies: [],
  offset: 0,
  query: '',
  results: []
};

const cacheState = debounce(1 * 1000, (state: GlobalState): void => {
  AsyncStorage.setItem('state', JSON.stringify(state));
});
export const getCachedState = async (): Promise<GlobalState | null> => {
  const cachedState = await AsyncStorage.getItem('state');
  if (cachedState) {
    const state: GlobalState = JSON.parse(cachedState);
    state.isLoading = false; // should always be reset
    return state;
  }
  else return null;
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
    case 'SET_CARD_SIZE':
      newState = Object.assign({}, state, {cardSize: dispatch.value});
      cacheState(newState);
      return newState;
    case 'TOGGLE_CARD_SIZE':
      const cardSize = state.cardSize === 0 ? 1 : 0;
      newState = Object.assign({}, state, {cardSize});
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
      return newState;
    case 'SET_QUERY':
      newState = Object.assign({}, state, {query: dispatch.value});
      cacheState(newState);
      return newState;
    default:
      newState = state;
      cacheState(newState);
      return newState;
  }
};

export default reducers;
