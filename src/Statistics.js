import React, { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { octokit, REPO, REPO_OWNER } from './client';

const MONTHS = [
  {
    abbreviation: 'Jan',
    name: 'January',
  },
  {
    abbreviation: 'Feb',
    name: 'February',
  },
  {
    abbreviation: 'Mar',
    name: 'March',
  },
  {
    abbreviation: 'Apr',
    name: 'April',
  },
  {
    abbreviation: 'May',
    name: 'May',
  },
  {
    abbreviation: 'Jun',
    name: 'June',
  },
  {
    abbreviation: 'Jul',
    name: 'July',
  },
  {
    abbreviation: 'Aug',
    name: 'August',
  },
  {
    abbreviation: 'Sep',
    name: 'September',
  },
  {
    abbreviation: 'Oct',
    name: 'October',
  },
  {
    abbreviation: 'Nov',
    name: 'November',
  },
  {
    abbreviation: 'Dec',
    name: 'December',
  },
];

export const Statistics = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    octokit
      .request('GET /repos/{owner}/{repo}/commits', {
        owner: REPO_OWNER,
        repo: REPO,
      })
      .then((response) => {
        const da = [];
        MONTHS.forEach((month, monthIdx) => {
          da[monthIdx] = {
            name: month.name,
            commits: 0,
          };
          response.data.forEach((commit) => {
            const commitDate = new Date(commit.commit.committer.date);
            if (commitDate.getMonth() === monthIdx) {
              da[monthIdx].commits = da[monthIdx].commits + 1;
            }
          });
        });

        setData(da);
      });
  }, []);

  return (
    <div className="container column-display">
      <h1 className="title">Statistics</h1>
      <hr />
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={150} height={500} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="commits" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Statistics;
