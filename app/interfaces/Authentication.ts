export const AUTHENTICATION_CHANNEL_NAME = 'AUTHENTICATION';

export enum AuthenticationActions {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

export interface AuthenticationParams {
  action: AuthenticationActions;
}
