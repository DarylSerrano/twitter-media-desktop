import {
  FetchOptions,
  FetchResult,
  TimelineNavigationParams,
} from '../interfaces/Timelines';
import TimelineFetcherFactory from './TimelineFetcherFactory';

export async function getNewStatus(
  options: TimelineNavigationParams,
  { count = 5, sinceId }: FetchOptions
) {
  const result = await TimelineFetcherFactory.CreateFetcher(options).fetch({
    count,
    sinceId,
  });

  return result;
}

export async function getOldStatus(
  options: TimelineNavigationParams,
  { count = 5, maxId }: FetchOptions
) {
  const result = await TimelineFetcherFactory.CreateFetcher(options).fetch({
    count,
    maxId,
  });

  return result;
}

export async function getStatus(
  options: TimelineNavigationParams,
  { count = 5, maxId, sinceId }: FetchOptions
) {
  const result: FetchResult = await TimelineFetcherFactory.CreateFetcher(
    options
  ).fetch({
    count,
    maxId,
    sinceId,
  });

  return result;
}
