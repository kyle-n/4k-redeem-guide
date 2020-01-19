import {ActionType} from './definitions';
import {CardSize, Movie, MovieFilters} from '../models';

export type ActionAndValue = {
  type: ActionType
  value: any;
}

export function setQuery(query: string): ActionAndValue {
  return {type: 'SET_QUERY', value: query};
}

export function clearQuery(): ActionAndValue {
  return {type: 'SET_QUERY', value: ''};
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

export function setIsLoading(isLoading: boolean): ActionAndValue {
  return {type: 'SET_LOADING', value: isLoading};
}

export function setFiltersVisible(visible: boolean): ActionAndValue {
  return {type: 'SET_FILTERS_VISIBLE', value: visible};
}

export function toggleFilters(): ActionAndValue {
  return {type: 'TOGGLE_FILTERS_VISIBLE', value: null};
}

export function downloadMovies(): ActionAndValue {
 return <any>null;
}
