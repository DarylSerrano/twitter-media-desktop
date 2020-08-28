export const AUTHENTICATION_CHANNEL_NAME = 'AUTHENTICATION';

export enum AuthenticationActions {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

export interface AuthenticationLoggedInParams {
  action: AuthenticationActions.LOGIN;
  userName: string;
  userId: string;
}

export interface AuthenticationLogoutParams {
  action: AuthenticationActions.LOGOUT;
}

export type AuthenticationParams =
  | AuthenticationLoggedInParams
  | AuthenticationLogoutParams;
