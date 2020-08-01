import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';

export default function Home(): JSX.Element {
  return (
    <div>
      <h2>Home</h2>
      <Link to={routes.TIMELINE}>To timeline</Link>
    </div>
  );
}
