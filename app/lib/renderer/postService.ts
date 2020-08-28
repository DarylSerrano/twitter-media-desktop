import fetch from 'cross-fetch';
import { Tweet } from '../../interfaces/Tweet';
import { RetweetResp } from '../../interfaces/RetweetResp';
import { FavResp } from '../../interfaces/FavResp';

const BASE_URL = `http://127.0.0.1:4200/api`;

type FetchOptions = {
  method?: 'POST' | 'GET' | 'PUT';
  body?: any;
};

async function makeFetch<T>(url: string, options?: FetchOptions) {
  const response = await fetch(url, { ...options });

  if (!response.ok) {
    throw new Error(`Error fetching: ${url} status: ${response.statusText}`);
  }

  const body: T = await response.json();

  return body;
}

const retweetTweet = (status: Tweet) => {
  const url = new URL(`${BASE_URL}/statuses/retweet/${status.id_str}`);

  return makeFetch<RetweetResp>(url.toString(), { method: 'POST' });
};
const likeTweet = (status: Tweet) => {
  const url = new URL(`${BASE_URL}/favorites/create`);

  url.searchParams.append('id', status.id_str);

  return makeFetch<FavResp>(url.toString(), { method: 'POST' });
};

export default { retweetTweet, likeTweet };
