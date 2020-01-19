import {CardSize, Movie, MovieFilters} from '../models';
import {ActionAndValue} from './actions';

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
  cardSize: 0,
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
    case 'SET_FILTERS_VISIBLE':
      return Object.assign({}, state, {filtersVisible: dispatch.value});
    case 'SET_LOADING':
      return Object.assign({}, state, {isLoading: dispatch.value});
    case 'SET_MOVIES':
      return Object.assign({}, state, {movies: dispatch.value});
    case 'SET_QUERY':
      return Object.assign({}, state, {query: dispatch.value});
    case 'TOGGLE_FILTERS_VISIBLE':
      return Object.assign({}, state, {filtersVisible: !state.filtersVisible});
    default:
      return state;
  }
};

export default reducers;
