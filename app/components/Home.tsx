import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.css';
import FetchTest from '../features/fetch-test/FetchTest';

export default function Home(): JSX.Element {
  return (
    <div className={styles.container} data-tid="container">
      <h2>Home</h2>
      <FetchTest />
      <Link to={routes.COUNTER}>to Counter</Link>
      <Link to={routes.TIMELINE}>To timeline</Link>
      <Link to="/status/1280592436658499584">A tweet</Link>
    </div>
  );
}
