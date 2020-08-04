export interface Tweet {
  created_at: string;
  id: number;
  id_str: string;
  text: string;
  truncated: boolean;
  entities: TweetEntities;
  extended_entities?: TweetExtendedEntities;
  source: string;
  user: User;
  is_quote_status: boolean;
  retweet_count: number;
  favorite_count: number;
  favorited: boolean;
  retweeted: boolean;
  possibly_sensitive: boolean;
  lang: string;
  retweeted_status?: RetweetedStatus;
}

export interface TweetEntities {
  hashtags: Hashtag[];
  symbols: any[];
  user_mentions: UserMention[];
  urls: any[];
  media?: Media[];
}

export interface Hashtag {
  text: string;
  indices: number[];
}

export interface Media {
  id: number;
  id_str: string;
  indices: number[];
  media_url: string;
  media_url_https: string;
  url: string;
  display_url: string;
  expanded_url: string;
  type: Type;
  sizes: Sizes;
  source_status_id?: number;
  source_status_id_str?: string;
  source_user_id?: number;
  source_user_id_str?: string;
  video_info?: VideoInfo;
}

export interface MediaVideo {
  id: number;
  id_str: string;
  indices: number[];
  media_url: string;
  media_url_https: string;
  url: string;
  display_url: string;
  expanded_url: string;
  type: Type;
  sizes: Sizes;
  source_status_id?: number;
  source_status_id_str?: string;
  source_user_id?: number;
  source_user_id_str?: string;
  video_info: VideoInfo;
}

export interface VideoInfo {
  aspect_ratio: number[];
  variants: Variant[];
}

export interface Variant {
  bitrate: number;
  content_type: string;
  url: string;
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

export enum Type {
  Photo = 'photo',
  Video = 'video',
  AnimatedGif = 'animated_gif',
}

export interface UserMention {
  screen_name: string;
  name: string;
  id: number;
  id_str: string;
  indices: number[];
}

export interface TweetExtendedEntities {
  media: Media[];
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
  user: User;
  is_quote_status: boolean;
  retweet_count: number;
  favorite_count: number;
  favorited: boolean;
  retweeted: boolean;
  possibly_sensitive: boolean;
  lang: string;
}

export interface RetweetedStatusEntities {
  hashtags: any[];
  symbols: any[];
  user_mentions: any[];
  urls: any[];
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
  type: Type;
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
  geo_enabled: boolean;
  verified: boolean;
  statuses_count: number;
  contributors_enabled: boolean;
  is_translator: boolean;
  is_translation_enabled: boolean;
  profile_background_color: string;
  profile_background_image_url: null | string;
  profile_background_image_url_https: null | string;
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
  following: null;
  follow_request_sent: null;
  notifications: null;
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
