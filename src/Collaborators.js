import React, { useEffect, useState } from 'react';
import { octokit } from './client';
import Slider from 'react-slick';

import './collaborators.css';
export const Collaborators = () => {
  const [data, setData] = useState([
    {
      createdAt: '',
    },
  ]);

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
        owner: 'akash-rajput',
        repo: 'code-splitting',
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
            <div className="slide">
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