import React, { useEffect, useState } from 'react';
import { octokit, REPO, REPO_OWNER } from './client';
import Slider from 'react-slick';

import './collaborators.css';

export const Collaborators = () => {
  const [data, setData] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    octokit
      .request('GET /repos/{owner}/{repo}/contributors', {
        owner: REPO_OWNER,
        repo: REPO,
      })
      .then((response) => {
        setData(response.data);
      });
  }, []);

  return (
    <div className="container column-display">
      <h1 className="title">Collaborators</h1>
      <hr />
      <div>
        <Slider {...settings}>
          {data.map((user) => (
            <div key={user.id} className="slide">
              <h3>{user.login}</h3>
              <img src={user.avatar_url} width={150} heigt={150} />
              <button>View Profile</button>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Collaborators;