import {
  FetchOptions,
  FetchResult,
  TimelineNavigationParams,
} from '../../../interfaces/Timelines';
import TimelineFetcherFactory from './FetcherFactory';

type GetNewStatusParams = {
  count?: number;
  sinceId: number;
};

type GetOldStatusParam = {
  count?: number;
  maxId: number;
};

export async function getNewStatus(
  options: TimelineNavigationParams,
  { count, sinceId }: GetNewStatusParams
) {
  const result = await TimelineFetcherFactory.CreateFetcher(options).fetch({
    count,
    sinceId,
  });

  return result;
}

export async function getOldStatus(
  options: TimelineNavigationParams,
  { count, maxId }: GetOldStatusParam
) {
  const result = await TimelineFetcherFactory.CreateFetcher(options).fetch({
    count,
    maxId,
  });

  return result;
}

export async function getStatus(
  options: TimelineNavigationParams,
  fetchOptions: FetchOptions
) {
  const result: FetchResult = await TimelineFetcherFactory.CreateFetcher(
    options
  ).fetch(fetchOptions);

  return result;
}
