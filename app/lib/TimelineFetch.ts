import fetch from 'cross-fetch';
import { Tweet } from '../interfaces/Tweet';

export async function makefetchTimeline(url: string) {
  const response = await fetch(url);
  const body: Tweet[] = await response.json();

  return body;
}

export function getMaxId(statuses: Tweet[], previousMaxId?: number) {
  let maxIdFetched = previousMaxId || Number.MAX_VALUE;
  statuses.forEach((tweet) => {
    console.log(`id: ${tweet.id}`);
    if (tweet.id < maxIdFetched) {
      maxIdFetched = tweet.id;
      console.log(`id: ${tweet.id}`);
      console.log(`string id: ${tweet.id_str}`);
    }
  });
  console.log(`maxid: ${maxIdFetched}`);
  return maxIdFetched;
}

export function getSinceId(statuses: Tweet[], previousSinceId?: number) {
  let sinceIdFetched = previousSinceId || 0;
  statuses.forEach((tweet) => {
    console.log(`id: ${tweet.id}`);
    if (tweet.id > sinceIdFetched) {
      sinceIdFetched = tweet.id;
      console.log(`id: ${tweet.id}`);
      console.log(`string id: ${tweet.id_str}`);
    }
  });
  console.log(`sinceId: ${sinceIdFetched}`);
  return sinceIdFetched;
}
