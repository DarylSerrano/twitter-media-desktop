import fetch from 'cross-fetch';
import { Tweet } from '../../../interfaces/Tweet';

export async function makefetchTimeline(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error fetching: ${url} status: ${response.statusText}`);
  }

  const body: Tweet[] = await response.json();

  return body;
}

export function getMaxId(statuses: Tweet[], previousMaxId?: number) {
  let maxIdFetched = previousMaxId || Number.MAX_VALUE;
  statuses.forEach((tweet) => {
    if (tweet.id < maxIdFetched) {
      maxIdFetched = tweet.id;
    }
  });
  return maxIdFetched;
}

export function getSinceId(statuses: Tweet[], previousSinceId?: number) {
  let sinceIdFetched = previousSinceId || 0;
  statuses.forEach((tweet) => {
    if (tweet.id > sinceIdFetched) {
      sinceIdFetched = tweet.id;
    }
  });
  return sinceIdFetched;
}
