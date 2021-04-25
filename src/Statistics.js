import React, { useEffect, useState } from 'react';
import { PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'reacharts';

import { octokit } from './client';

export const Statistics = () => {
  const [data, setData] = useState([
    {
      createdAt: '',
    },
  ]);

  useEffect(() => {
    octokit
      .request('GET /repos/{owner}/{repo}/commits', {
        owner: 'akash-rajput',
        repo: 'code-splitting',
      })
      .then((response) => setData(response.data));
  }, []);

  return (
    <div className="container column-display">
      <h1 className="title">Statistics</h1>
      <hr />
      <RadarChart outerRadius={90} width={730} height={250} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 150]} />
        <Radar
          name="Mike"
          dataKey="A"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
        <Radar
          name="Lily"
          dataKey="B"
          stroke="#82ca9d"
          fill="#82ca9d"
          fillOpacity={0.6}
        />
        <Legend />
      </RadarChart>
    </div>
  );
};

export default Statistics;