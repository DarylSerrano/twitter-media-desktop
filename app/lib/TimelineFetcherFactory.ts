import { Fetchable, FetchOptions, FetchResult } from '../interfaces/Timelines';
import TimelineScreenNameFetcher from './TimelineScreenNameFetcher';
import TimelineUserIdFetcher from './TimelineUserIdFetcher';

export default class TimelineFetcherFactory {
  public static CreateFetcher(
    userId?: string,
    screenName?: string
  ): Fetchable<FetchOptions, FetchResult> {
    if (userId) {
      return new TimelineUserIdFetcher(userId);
    }
    if (screenName) {
      return new TimelineScreenNameFetcher(screenName);
    }
    throw new Error('Cant create Fetcher, no userId or screenName');
  }
}
