import React from 'react';
import { Link } from 'react-router-dom';

import './sidebar.css';

export default class Sidebar extends React.Component {
  render() {
    return (
      <div id="sidebar">
        <ul>
          <li>
            <Link to="/">Commits</Link>
          </li>
          <li>
            <Link to="/collaborators">Collaborators</Link>
          </li>
          <li>
            <Link to="/prs">Pull Requests</Link>
          </li>
          <li>
            <Link to="/stats">Statistics</Link>
          </li>
        </ul>
      </div>
    );
  }
}
