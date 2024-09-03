// src/components/right/Right.js
import React from 'react';
import './Right.css';

// Mocked follower data
const followers = [
  { username: 'follower1', profilePicture: './assets/images/barbara.jpg' },
  { username: 'follower2', profilePicture: './assets/images/default.jpg' },
  { username: 'follower3', profilePicture: './assets/images/kunal.jpg' },
  { username: 'follower4', profilePicture: './assets/images/lucky.jpg' },
  { username: 'follower5', profilePicture: './assets/images/zhongli.webp' },
];

const Right = () => {
  return (
    <div className="right-sidebar">
      <h2>Followers</h2>
      <div className="follower-list">
        {followers.map((follower, index) => (
          <div key={index} className="follower-item">
            <img
              className="follower-profile-pic"
              src={follower.profilePicture}
              alt={`${follower.username}'s profile`}
            />
            <span className="follower-username">{follower.username}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Right;
