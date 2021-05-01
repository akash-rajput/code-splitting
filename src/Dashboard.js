import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Sidebar from './Sidebar';

import './dashboard.css';

const Commits = React.lazy(() => import('./Commits'));
const Collaborators = React.lazy(() => import('./Collaborators'));
const PullRequests = React.lazy(() => import('./PullRequests'));
const Statistics = React.lazy(() => import('./Statistics'));

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <Sidebar />
        <div className="content container">
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route path="/" exact component={Commits} />
              <Route path="/collaborators" exact component={Collaborators} />
              <Route path="/prs" exact component={PullRequests} />
              <Route path="/stats" exact component={Statistics} />
            </Switch>
          </Suspense>
        </div>
      </div>
    );
  }
}
