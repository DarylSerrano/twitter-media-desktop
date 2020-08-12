import React, { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AppLayout from '../components/AppLayout';
import {
  AuthenticationActions,
  AuthenticationParams,
} from '../interfaces/Authentication';
import { loginUser, logoutUser } from '../reducers/authenticationReducer';
import authenticationIpc from '../ipc/renderer/authenticationIpc';

type Props = {
  children: ReactNode;
};

export default function App(props: Props) {
  const { children } = props;

  const dispatch = useDispatch();

  const handleAuthentication = (params: AuthenticationParams) => {
    switch (params.action) {
      case AuthenticationActions.LOGIN:
        dispatch(loginUser(params.userId, params.userName));
        break;
      case AuthenticationActions.LOGOUT:
        dispatch(logoutUser());
        break;
      default:
    }
  };

  useEffect(() => {
    authenticationIpc.setupRendererHandler(handleAuthentication);
    return () => {
      authenticationIpc.unsetupRendererHandler();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <AppLayout>{children}</AppLayout>;
}
