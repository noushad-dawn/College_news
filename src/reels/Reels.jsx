// src/components/Reels.js
import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faShare } from '@fortawesome/free-solid-svg-icons';
import './Reels.css'; // Ensure this path is correct

const Reels = ({reel}) => {

  const [likes, setLikes] = useState(reel.likes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  return (
    <div className="reel">
      <ReactPlayer
        url={reel.videoUrl}
        playing={false}
        controls={false}
        width="100%"
        height="100%"
        className="video-player"
      />
      <div className="reel-info">
        <div className="user-info">
          <img src={reel.userProfilePicture} alt="User" className="profile-picture" />
          <span className="user-name">{reel.userName}</span>
        </div>
        <p className="video-description">{reel.description}</p>
        <div className="reel-actions">
          <button onClick={handleLike} className="action-button">
            <FontAwesomeIcon icon={faHeart} color={isLiked ? 'red' : 'white'} />
            <span className="like-count">{likes}</span>
          </button>
          <button className="action-button">
            <FontAwesomeIcon icon={faComment} />
          </button>
          <button className="action-button">
            <FontAwesomeIcon icon={faShare} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reels;
