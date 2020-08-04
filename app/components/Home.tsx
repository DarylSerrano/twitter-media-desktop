import React from 'react';
import { ipcRenderer } from 'electron';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import CreateSuccessWindow from './CreateSuccessWindow';
import { CHANNEL_NAME } from '../interfaces/Login';

export default function Home(): JSX.Element {
  const onLogin = async () => {
    await ipcRenderer.invoke(CHANNEL_NAME);
  };

  return (
    <div>
      <h2>Home</h2>
      <CreateSuccessWindow />
      <Button onClick={onLogin} type="primary">
        Login
      </Button>
      <Link to={routes.TIMELINE}>To timeline</Link>
      <Link to={routes.LOGIN_SUCCESS}>To Login success</Link>
      <Link to={routes.TIMELINE_TEST}>To timeline test page</Link>
    </div>
  );
}
