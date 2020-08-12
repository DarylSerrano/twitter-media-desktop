enum AuthenticationActionType {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

export type AuthenticationState = boolean;

interface LoginAction {
  type: AuthenticationActionType.LOGIN;
}

interface LogoutAction {
  type: AuthenticationActionType.LOGOUT;
}

export type ActionType = LoginAction | LogoutAction;

const initialState: AuthenticationState = false;

const reducer = (state = initialState, acion: ActionType) => {
  switch (acion.type) {
    case AuthenticationActionType.LOGIN:
      return true;
    case AuthenticationActionType.LOGOUT:
      return false;
    default:
      return state;
  }
};

export const loginUser = (): LoginAction => {
  return {
    type: AuthenticationActionType.LOGIN,
  };
};

export const logoutUser = (): LogoutAction => {
  return {
    type: AuthenticationActionType.LOGOUT,
  };
};

export default reducer;
