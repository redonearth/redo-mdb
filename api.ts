const API_KEY = '5efe6813c047c5a28d580b92e30a6262';
const BASE_URL = `https://api.themoviedb.org/3`;
const LANGUAGE = `language=en-US`;
const PAGE = `page=1`;
const REGION = `region=KR`;

function requestUrl(url: string, queryString: string = '') {
  return `${BASE_URL}${url}?api_key=${API_KEY}${queryString}`;
}

export interface Movie {
  id: number;
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TV {
  id: number;
  name: string;
  original_name: string;
  origin_country: string[];
  vote_count: number;
  backdrop_path: string | null;
  vote_average: number;
  genre_ids: number[];
  original_language: string;
  overview: string;
  poster_path: string | null;
  first_air_date: string;
  popularity: number;
  media_type: string;
}

interface BaseResponse {
  page: number;
  total_results: number;
  total_pages: number;
}

export interface MovieResponse extends BaseResponse {
  results: Movie[];
}

export interface TVResponse extends BaseResponse {
  results: TV[];
}

export const movieAPI = {
  trending: async function () {
    return fetch(requestUrl(`/trending/movie/week`)).then((res) => res.json());
  },
  upcoming: async function () {
    return fetch(
      requestUrl(`/movie/upcoming`, `&${LANGUAGE}&${PAGE}&${REGION}`)
    ).then((res) => res.json());
  },
  nowPlaying: async function () {
    return fetch(
      requestUrl(`/movie/now_playing`, `&${LANGUAGE}&${PAGE}&${REGION}`)
    ).then((res) => res.json());
  },
  search: async function ({ queryKey }: any) {
    const [_, query] = queryKey;
    return fetch(
      requestUrl(
        `/search/movie`,
        `&query=${query}&${LANGUAGE}&${PAGE}&${REGION}`
      )
    ).then((res) => res.json());
  },
  detail: async function ({ queryKey }: any) {
    const [_, id] = queryKey;
    return fetch(
      requestUrl(`/movie/${id}`, '&append_to_response=videos,images')
    ).then((res) => res.json());
  },
};

export const tvAPI = {
  trending: async function () {
    return fetch(requestUrl(`/trending/tv/week`)).then((res) => res.json());
  },
  airingToday: async function () {
    return fetch(
      requestUrl(`/tv/airing_today`, `&${LANGUAGE}&${PAGE}&${REGION}`)
    ).then((res) => res.json());
  },
  topRated: async function () {
    return fetch(
      requestUrl(`/tv/top_rated`, `&${LANGUAGE}&${PAGE}&${REGION}`)
    ).then((res) => res.json());
  },
  search: async function ({ queryKey }: any) {
    const [_, query] = queryKey;
    return fetch(
      requestUrl(`/search/tv`, `&query=${query}&${LANGUAGE}&${PAGE}&${REGION}`)
    ).then((res) => res.json());
  },
  detail: async function ({ queryKey }: any) {
    const [_, id] = queryKey;
    return fetch(
      requestUrl(`/tv/${id}`, '&append_to_response=videos,images')
    ).then((res) => res.json());
  },
};
