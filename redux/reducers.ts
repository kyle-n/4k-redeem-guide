import {CardSize, Movie, MovieFilters} from '../models';
import {ActionAndValue} from './actions';
import AsyncStorage from '@react-native-community/async-storage';

type State = {
  cardSize: CardSize;
  filters: MovieFilters;
  filtersVisible: boolean;
  hasMoreResults: boolean;
  isLoading: boolean;
  movies: Movie[];
  offset: number;
  results: Movie[];
};

// const defaultCardSize: CardSize = 0;
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

const defaultFilters: MovieFilters = {
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

const initialState: State = {
  cardSize: defaultCardSize,
  filters: Object.assign({}, defaultFilters),
  filtersVisible: false,
  hasMoreResults: false,
  isLoading: false,
  movies: [],
  offset: 0,
  results: []
};

const reducers = (state = initialState, dispatch: ActionAndValue): State => {
  switch (dispatch.action) {
    case 'SET_CARD_SIZE':
      return Object.assign({}, state, {cardSize: dispatch.value});
    case 'SET_FILTERS':
      return Object.assign({}, state, {filters: dispatch.value});
    case 'CLEAR_FILTERS':
      return Object.assign({}, state, {filters: Object.assign({}, defaultFilters)});
    case 'SET_FILTERS_VISIBLE':
      return Object.assign({}, state, {filtersVisible: dispatch.value});
    case 'TOGGLE_FILTERS_VISIBLE':
      return Object.assign({}, state, {filtersVisible: !state.filtersVisible});
    case 'SET_LOADING':
      return Object.assign({}, state, {isLoading: dispatch.value});
    case 'SET_MOVIES':
      return Object.assign({}, state, {movies: dispatch.value});
    case 'SET_QUERY':
      return Object.assign({}, state, {query: dispatch.value});
    default:
      return state;
  }
};

export default reducers;
