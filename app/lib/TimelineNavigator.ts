import { FetchOptions, FetchResult } from '../interfaces/Timelines';
import TimelineFetcherFactory from './TimelineFetcherFactory';

export default class TimelineNavigator {
  private static async retrieveDesiredNumberOfStatus() {}

  public static async getStatus({
    userId,
    screenName,
    options,
  }: {
    userId?: string;
    screenName?: string;
    options: FetchOptions;
  }) {
    const result = await TimelineFetcherFactory.CreateFetcher(
      userId,
      screenName
    ).fetch(options);

    // Filter and get only count of media, if not have count==data.length, retrieve old status
    const retrieved = result.data.length;
    const count = options.count || 5;
    if (retrieved < count) {
      TimelineNavigator.retrieveDesiredNumberOfStatus();
    }

    return result;
  }

  public static async getNewStatus(
    userId?: string,
    screenName?: string,
    count = 5,
    sinceId?: number
  ) {
    const result = await TimelineFetcherFactory.CreateFetcher(
      userId,
      screenName
    ).fetch({ count, sinceId });

    return result;
  }

  public static async getOldStatus(
    userId?: string,
    screenName?: string,
    count = 5,
    maxId?: number
  ) {
    const result = await TimelineFetcherFactory.CreateFetcher(
      userId,
      screenName
    ).fetch({ count, maxId });

    return result;
  }
}
