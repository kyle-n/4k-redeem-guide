import axios from 'axios';
import {getMovieTitleFromBarcode} from '../barcode-lookup/barcode-spider.connector';

interface SearchResponse {
  page: number;
  total_results: number;
  total_pages: number;
  results: [{
    popularity: number;
    vote_count: number;
    video: boolean;
    poster_path: string;
    id: number;
    adult: boolean;
    backdrop_path: string;
    original_language: string;
    original_title: string;
    genre_ids: number[];
    title: string;
    vote_average: number;
    overview: string;
    release_date: string;
  }]
}

export interface MovieDetailsResponse {
  adult: boolean;
  backdrop_path: string | null;
  budget: number;
  genres: Array<{
    id: number;
    name: string;
  }>;
  homepage: string | null;
  id: number;
  imdb_id: number;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: Array<{
    name: string;
    id: number;
    logo_path: string | null;
    origin_country: string;
  }>;
  production_countries: Array<{
    iso_3166_1: string;
    name: string;
  }>;
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: Array<{
    iso_639_1: string;
    name: string;
  }>;
  status: 'Rumored' | 'Planned' | 'In Production' | 'Post Production' | 'Released' | 'Canceled';
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const apiKey = 'd3298570110878db366366b8e1f2f947';
const baseSearchUrl = 'https://api.themoviedb.org/3/search/movie?';
const baseDetailsUrl = 'https://api.themoviedb.org/3/movie';
const baseImageUrl = 'https://image.tmdb.org/t/p/w1280';

const searchMovies = async (title: string, year?: number): Promise<SearchResponse | null> => {
  const params = [
    `api_key=${apiKey}`,
    `query=${title}`,
    'include_adult=false'
  ];
  if (year) {
    params.push(`year=${year}`);
  }

  const paramString = params.join('&');
  const reqUrl = baseSearchUrl + paramString;
  return (await axios.get(reqUrl)).data;
};

const getMovie = async (movieId: number): Promise<any> => {
  const params = [
    `api_key=${apiKey}`,
    `movie_id=${movieId}`,
  ];
  const paramString = params.join('&');
  const reqUrl = baseDetailsUrl + paramString;
  return (await axios.get(reqUrl)).data;
};

export const getMovieImage = async (title: string, year?: number): Promise<string | null> => {
  const resp = await searchMovies(title, year);
  if (resp && resp.total_results > 0) {
    return baseImageUrl + resp.results[0].backdrop_path;
  } else return null;
};

export const getMovieDetails = async (title: string, year?: number): Promise<any | null> => {
  const searchResp = await searchMovies(title, year);
  if (searchResp && searchResp.total_results > 0) {
    return await getMovie(searchResp.results[0].id);
  } else return null;
};
