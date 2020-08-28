export const LOGIN_CHANNEL_NAME = 'LOGIN';
export const LOGIN_WINDOW_ID = 'LOGIN_WINDOW';

export interface ClientInformation {
  userId: string;
  screenName: string;
}

export interface ClientAuthInformation {
  accTkn: string;
  accTknSecret: string;
}
