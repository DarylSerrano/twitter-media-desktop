/* eslint-disable @typescript-eslint/no-empty-interface */
export interface RetweetResp {
  created_at: string;
  id: number;
  id_str: string;
  text: string;
  truncated: boolean;
  entities: RetweetRespEntities;
  extended_entities: RetweetRespExtendedEntities;
  source: string;
  in_reply_to_status_id: null;
  in_reply_to_status_id_str: null;
  in_reply_to_user_id: null;
  in_reply_to_user_id_str: null;
  in_reply_to_screen_name: null;
  user: User;
  geo: null;
  coordinates: null;
  place: null;
  contributors: null;
  retweeted_status: RetweetedStatus;
  is_quote_status: boolean;
  retweet_count: number;
  favorite_count: number;
  favorited: boolean;
  retweeted: boolean;
  possibly_sensitive: boolean;
  lang: string;
  _headers: Headers;
}

export interface Headers {}

export interface RetweetRespEntities {
  hashtags: unknown[];
  symbols: unknown[];
  user_mentions: UserMention[];
  urls: unknown[];
  media: PurpleMedia[];
}

export interface PurpleMedia {
  id: number;
  id_str: string;
  indices: number[];
  media_url: string;
  media_url_https: string;
  url: string;
  display_url: string;
  expanded_url: string;
  type: string;
  sizes: Sizes;
  source_status_id: number;
  source_status_id_str: string;
  source_user_id: number;
  source_user_id_str: string;
}

export interface Sizes {
  thumb: Large;
  large: Large;
  medium: Large;
  small: Large;
}

export interface Large {
  w: number;
  h: number;
  resize: Resize;
}

export enum Resize {
  Crop = 'crop',
  Fit = 'fit',
}

export interface UserMention {
  screen_name: string;
  name: string;
  id: number;
  id_str: string;
  indices: number[];
}

export interface RetweetRespExtendedEntities {
  media: PurpleMedia[];
}

export interface RetweetedStatus {
  created_at: string;
  id: number;
  id_str: string;
  text: string;
  truncated: boolean;
  entities: RetweetedStatusEntities;
  extended_entities: RetweetedStatusExtendedEntities;
  source: string;
  in_reply_to_status_id: null;
  in_reply_to_status_id_str: null;
  in_reply_to_user_id: null;
  in_reply_to_user_id_str: null;
  in_reply_to_screen_name: null;
  user: User;
  geo: null;
  coordinates: null;
  place: null;
  contributors: null;
  is_quote_status: boolean;
  retweet_count: number;
  favorite_count: number;
  favorited: boolean;
  retweeted: boolean;
  possibly_sensitive: boolean;
  lang: string;
}

export interface RetweetedStatusEntities {
  hashtags: unknown[];
  symbols: unknown[];
  user_mentions: unknown[];
  urls: unknown[];
  media: FluffyMedia[];
}

export interface FluffyMedia {
  id: number;
  id_str: string;
  indices: number[];
  media_url: string;
  media_url_https: string;
  url: string;
  display_url: string;
  expanded_url: string;
  type: string;
  sizes: Sizes;
}

export interface RetweetedStatusExtendedEntities {
  media: FluffyMedia[];
}

export interface User {
  id: number;
  id_str: string;
  name: string;
  screen_name: string;
  location: string;
  description: string;
  url: string;
  entities: UserEntities;
  protected: boolean;
  followers_count: number;
  friends_count: number;
  listed_count: number;
  created_at: string;
  favourites_count: number;
  utc_offset: null;
  time_zone: null;
  geo_enabled: boolean;
  verified: boolean;
  statuses_count: number;
  lang: null;
  contributors_enabled: boolean;
  is_translator: boolean;
  is_translation_enabled: boolean;
  profile_background_color: string;
  profile_background_image_url: string;
  profile_background_image_url_https: string;
  profile_background_tile: boolean;
  profile_image_url: string;
  profile_image_url_https: string;
  profile_banner_url: string;
  profile_link_color: string;
  profile_sidebar_border_color: string;
  profile_sidebar_fill_color: string;
  profile_text_color: string;
  profile_use_background_image: boolean;
  has_extended_profile: boolean;
  default_profile: boolean;
  default_profile_image: boolean;
  following: boolean;
  follow_request_sent: boolean;
  notifications: boolean;
  translator_type: string;
}

export interface UserEntities {
  url: Description;
  description: Description;
}

export interface Description {
  urls: URL[];
}

export interface URL {
  url: string;
  expanded_url: string;
  display_url: string;
  indices: number[];
}
