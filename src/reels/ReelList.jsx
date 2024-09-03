// src/components/ReelList.js
import React from 'react';
import Reel from './Reels';
import Reels from './Reels';
import './Reels.css';


const ReelList = () => {
    const reels = [
        {
          videoUrl: './assets/videos/genshin.mp4',
          userProfilePicture: './assets/images/barbara.jpg',
          userName: 'barbara',
          description: 'This is a sample video description.',
          likes: 123
        },
        {
          videoUrl: './assets/videos/genshin.mp4',
          userProfilePicture: './assets/images/barbara.jpg',
          userName: 'barbara',
          description: 'This is a sample video description.',
          likes: 123
        },
        {
          videoUrl: './assets/videos/genshin.mp4',
          userProfilePicture: './assets/images/barbara.jpg',
          userName: 'barbara',
          description: 'This is a sample video description.',
          likes: 123
        },
      ];
  return (
    <div className="reel-list">
      {reels.map((reel, index) => (
        <Reels key={index} reel={reel} />
      ))}
    </div>
  );
};

export default ReelList;
