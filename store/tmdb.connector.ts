import axios from 'axios';

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

const apiKey = 'd3298570110878db366366b8e1f2f947';
const baseSearchUrl = 'https://api.themoviedb.org/3/search/movie?';
const baseImageUrl = 'https://image.tmdb.org/t/p/w1280';

export const getMovieImage = async (title: string, year?: number): Promise<string | null> => {
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
  const resp: SearchResponse = (await axios.get(reqUrl)).data;
  if (resp.total_results > 0) {
    return baseImageUrl + resp.results[0].backdrop_path;
  } else return null;
};
