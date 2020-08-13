/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import TimelinePage from './containers/TimelinePage';
import StatusPage from './containers/StatusPage';

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.TIMELINE} component={TimelinePage} />
        <Route path={routes.STATUS} component={StatusPage} />
        <Route exact path={routes.HOME} component={HomePage} />
      </Switch>
    </App>
  );
}
