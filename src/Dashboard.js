import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Commits from './Commits';
import Collaborators from './Collaborators';
import PullRequests from './PullRequests';
import Statistics from './Statistics';
import Sidebar from './Sidebar';

import './dashboard.css';

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
