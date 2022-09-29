const API_KEY = '5efe6813c047c5a28d580b92e30a6262';
const BASE_URL = `https://api.themoviedb.org/3`;
const LANGUAGE = `language=en-US`;
const PAGE = `page=1`;
const REGION = `region=KR`;

function requestUrl(url: string, query: string = '') {
  return `${BASE_URL}${url}?api_key=${API_KEY}${query}`;
}

async function nowPlaying() {
  return fetch(
    requestUrl(`/movie/now_playing`, `&${LANGUAGE}&${PAGE}&${REGION}`)
  ).then((res) => res.json());
}

async function upcoming() {
  return fetch(
    requestUrl(`/movie/upcoming`, `&${LANGUAGE}&${PAGE}&${REGION}`)
  ).then((res) => res.json());
}

async function trending() {
  return fetch(requestUrl(`/trending/movie/week`)).then((res) => res.json());
}

export const movieAPI = { trending, upcoming, nowPlaying };
