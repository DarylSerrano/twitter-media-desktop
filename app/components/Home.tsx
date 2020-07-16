import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import FetchTest from '../features/fetch-test/FetchTest';

export default function Home(): JSX.Element {
  return (
    <div>
      <h2>Home</h2>
      <FetchTest />
      <Link to={routes.COUNTER}>to Counter</Link>
      <Link to={routes.TIMELINE}>To timeline</Link>
      <Link to="/status/1283040556977979399">A tweet</Link>
    </div>
  );
}
