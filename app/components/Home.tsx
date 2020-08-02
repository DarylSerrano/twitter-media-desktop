import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import CreateSuccessWindow from './CreateSuccessWindow';

export default function Home(): JSX.Element {
  return (
    <div>
      <h2>Home</h2>
      <CreateSuccessWindow />
      <Link to={routes.TIMELINE}>To timeline</Link>
      <Link to={routes.LOGIN_SUCCESS}>To Login success</Link>
    </div>
  );
}
