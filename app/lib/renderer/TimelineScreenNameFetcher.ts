import {
  FetchResult,
  FetchOptions,
  Fetchable,
} from '../../interfaces/Timelines';
import { getMaxId, getSinceId, makefetchTimeline } from './TimelineFetch';

export default class TimelineScreenNameFetcher
  implements Fetchable<FetchOptions, FetchResult> {
  constructor(private readonly screenName: string) {}

  async fetch(options: FetchOptions) {
    const url = new URL('http://127.0.0.1:4200/api/statuses/user_timeline');

    const { count = 5, maxId, sinceId } = options;

    url.searchParams.append('screen_name', this.screenName);
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
