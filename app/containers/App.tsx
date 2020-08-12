import React, { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AppLayout from '../components/AppLayout';
import { AuthenticationActions } from '../interfaces/Authentication';
import { loginUser, logoutUser } from '../reducers/authenticationReducer';
import {
  setupRendererHandler,
  unsetupRendererHandler,
} from '../ipc/authenticationIpc';

type Props = {
  children: ReactNode;
};

export default function App(props: Props) {
  const { children } = props;

  const dispatch = useDispatch();

  const handleAuthentication = (action: AuthenticationActions) => {
    switch (action) {
      case AuthenticationActions.LOGIN:
        dispatch(loginUser());
        break;
      case AuthenticationActions.LOGOUT:
        dispatch(logoutUser());
        break;
      default:
    }
  };

  useEffect(() => {
    setupRendererHandler(handleAuthentication);
    return () => {
      unsetupRendererHandler();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <AppLayout>{children}</AppLayout>;
}
