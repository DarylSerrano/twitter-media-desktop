/* eslint-disable class-methods-use-this */
import {
  FetchResult,
  FetchOptions,
  Fetchable,
} from '../../interfaces/Timelines';
import { getMaxId, getSinceId, makefetchTimeline } from './TimelineFetch';

export default class TimelineLoggedUser
  implements Fetchable<FetchOptions, FetchResult> {
  async fetch(options: FetchOptions) {
    const url = new URL('http://127.0.0.1:4200/api/statuses/home_timeline');

    const { count = 5, maxId, sinceId } = options;

    url.searchParams.append('count', count.toString());
    if (maxId) url.searchParams.append('max_id', maxId.toString());
    if (sinceId) url.searchParams.append('since_id', sinceId.toString());

    const data = await makefetchTimeline(url.toString());

    const newMaxId = getMaxId(data, maxId);
    const newSinceId = getSinceId(data, sinceId);

    return Promise.resolve({
      data,
      sinceId: newSinceId,
      maxId: newMaxId,
    });
  }
}
