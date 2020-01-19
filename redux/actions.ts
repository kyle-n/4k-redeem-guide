import {SET_QUERY, ActionType} from './definitions';
import {CardSize, Movie, MovieFilters} from '../models';
import {act} from 'react-test-renderer';
import advanceTimersByTime = jest.advanceTimersByTime;
import {Animated} from 'react-native';
import add = Animated.add;

type ActionAndValue = {
  action: ActionType
  value: any;
}

export function setQuery(query: string): ActionAndValue {
  return {action: SET_QUERY, value: query};
}

export function clearQuery(): ActionAndValue {
  return {action: 'SET_QUERY', value: ''};
}

export function setFilters(filters: MovieFilters): ActionAndValue {
  return {action: 'SET_FILTERS', value: filters};
}

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

export function clearFilters(): ActionAndValue {
  return {action: 'SET_FILTERS', value: Object.assign({}, defaultFilters)};
}

export function setMovies(movies: Movie[]): ActionAndValue {
  return {action: 'SET_MOVIES', value: movies};
}

export function setCardSize(cardSize: CardSize): ActionAndValue {
  return {action: 'SET_CARD_SIZE', value: cardSize};
}

export function setIsLoading(isLoading: boolean): ActionAndValue {
  return {action: 'SET_LOADING', value: isLoading};
}

export function setFiltersVisible(visible: boolean): ActionAndValue {
  return {action: 'SET_FILTERS_VISIBLE', value: visible};
}

export function toggleFilters(): ActionAndValue {
  return {action: 'TOGGLE_FILTERS_VISIBLE', value: null};
}
