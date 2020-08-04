import {
  Fetchable,
  FetchOptions,
  FetchResult,
  NavigatorType,
  TimelineNavigationParams,
} from '../../interfaces/Timelines';
import TimelineScreenNameFetcher from './TimelineScreenNameFetcher';
import TimelineUserIdFetcher from './TimelineUserIdFetcher';
import TimelineLoggedUser from './TimelineLoggedUser';

export default class TimelineFetcherFactory {
  public static CreateFetcher({
    searchData = '',
    type,
  }: TimelineNavigationParams): Fetchable<FetchOptions, FetchResult> {
    switch (type) {
      case NavigatorType.SCREEN_NAME:
        return new TimelineScreenNameFetcher(searchData);
      case NavigatorType.USER_ID:
        return new TimelineUserIdFetcher(searchData);
      case NavigatorType.LOGED_USER:
        return new TimelineLoggedUser();
      default:
        throw new Error('Cant create Fetcher, no userId or screenName');
    }
  }
}
