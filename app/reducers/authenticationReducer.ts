import { ipcRenderer } from 'electron';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import {
  AuthenticationActions,
  AuthenticationLogoutParams,
  AUTHENTICATION_CHANNEL_NAME,
} from '../interfaces/Authentication';

enum AuthenticationActionType {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

export type AuthenticationState = {
  loggedIn: boolean;
  userName: string;
  userId: string;
};

interface LoginAction {
  type: AuthenticationActionType.LOGIN;
  data: {
    userName: string;
    userId: string;
  };
}

interface LogoutAction {
  type: AuthenticationActionType.LOGOUT;
}

export type ActionType = LoginAction | LogoutAction;

type RootState = { authetication: AuthenticationState };

const initialState: AuthenticationState = {
  loggedIn: false,
  userId: '',
  userName: '',
};

const reducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case AuthenticationActionType.LOGIN: {
      const newState: AuthenticationState = {
        loggedIn: true,
        userId: action.data.userId,
        userName: action.data.userName,
      };
      return newState;
    }
    case AuthenticationActionType.LOGOUT: {
      const newState: AuthenticationState = {
        loggedIn: false,
        userId: '',
        userName: '',
      };
      return newState;
    }
    default:
      return state;
  }
};

export const loginUser = (userId: string, userName: string): LoginAction => {
  return {
    type: AuthenticationActionType.LOGIN,
    data: {
      userId,
      userName,
    },
  };
};

export const logoutUser = (): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  AnyAction
> => async (dispatch, getState) => {
  const { authetication } = getState();

  if (authetication.loggedIn) {
    const params: AuthenticationLogoutParams = {
      action: AuthenticationActions.LOGOUT,
    };

    await ipcRenderer.invoke(AUTHENTICATION_CHANNEL_NAME, params);
  }

  dispatch({
    type: AuthenticationActionType.LOGOUT,
  });
};

export default reducer;
