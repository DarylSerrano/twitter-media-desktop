import { Tweet } from './Tweet';

export interface UserTimelineParameters {
  id: string;
  count?: number;
  exclude_replies?: boolean;
}

export interface FetchOptions {
  count?: number;
  sinceId?: number;
  maxId?: number;
}

export interface FetchResult {
  data: Tweet[];
  sinceId: number;
  maxId: number;
}

export interface Fetchable<T, V> {
  fetch: (options: T) => Promise<V>;
}

export enum NavigatorType {
  SCREEN_NAME,
  USER_ID,
  LOGED_USER,
}

export interface TimelineNavigationParams {
  type: NavigatorType;
  searchData?: string;
}
