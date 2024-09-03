import React, { useState, useEffect } from 'react';
import './OtherUserProfile.css';
import { useNavigate } from 'react-router-dom';
import Profilepost from '../profile_post/Profilepost';

const OtherUserProfile = ({ profileUserId, token }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);

  const navigate = useNavigate();


  useEffect(() => {

    const checkFollowingStatus = async () => {
      try {
        const response = await fetch(`https://school-news-liard.vercel.app/api/user/${profileUserId}/followers`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        });

        // Check if the response is OK (status 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Read the response as JSON
        const userData = await response.json();

        // Check if the current user is following the profileUserId
        const isCurrentlyFollowing = userData.some(user => user._id === profileUserId);
        setIsFollowing(isCurrentlyFollowing);
      } catch (error) {
        console.error('Error checking following status:', error);
        setIsFollowing(false); // Default to false or handle as needed
      }
    };

    checkFollowingStatus();

    const fetchUserData = async () => {
      try {
        const userResponse = await fetch(`https://school-news-liard.vercel.app/api/user/${profileUserId}`, {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        });

        if (!userResponse.ok) {
          throw new Error('Failed to fetch user');
        }

        const userData = await userResponse.json();
        setUser(userData);

        const postsResponse = await fetch(`https://school-news-liard.vercel.app/api/post/user/${profileUserId}`, {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        });

        if (!postsResponse.ok) {
          throw new Error('Failed to fetch posts');
        }

        const postsData = await postsResponse.json();
        setPosts(postsData);
      } catch (err) {
        console.error(err.message);
        setError('Failed to load profile');
      }
    };

    fetchUserData();
  }, [profileUserId, token]);

  const handleFollowClick = async () => {
    try {
      const response = await fetch(`https://school-news-liard.vercel.app/api/user/follow/${profileUserId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      });

      if (response.status!==200 && response.status!==400) {
        throw new Error('Failed to follow user');
      }
      // Update follow status
      setIsFollowing(true);
      navigate(`/profile/${profileUserId}`);
    } catch (err) {
      console.error(err.message);
      setError('Failed to follow user');
    }
  };
  const handleUnFollowClick = async () => {
    try {
      const response = await fetch(`https://school-news-liard.vercel.app/api/user/unfollow/${profileUserId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      });

      if (response.status!==200 && response.status!==400) {
        throw new Error('Failed to follow user');
      }

      // Update follow status
      setIsFollowing(false);
      navigate(`/profile/${profileUserId}`);
    } catch (err) {
      console.error(err.message);
      setError('Failed to unfollow user');
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className='fullprofile'>
      <div className='profile_main'>
        <div className="nav_section">
          <div className="profile_picture">
            <img src={user.profilePicture || './assets/images/default.jpg'} alt="profile" />
          </div>
          <div className="profile_content">
            <div className="main_bio">
              <h2>{user.username}</h2>
              {!isFollowing ? (
                <button onClick={handleFollowClick}>Follow</button>
              ) :
                <button onClick={handleUnFollowClick}>Following</button>
              }
            </div>
            <div className="followers">
              <p>{posts.length} posts</p>
              <p>{user.followers.length} followers</p>
              <p>{user.following.length} following</p>
            </div>
            <div className="bio">
              <p>@{user.username}</p>
              <p>{user.bio}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="post-logo">
        <i className="fa-solid fa-border-all"></i><p>POSTS</p>
      </div>
      <div className="gridy">
        {posts.map((post, index) => (
          <Profilepost
            key={index}
            posttype={post.media[0]} // Assuming post.media is an array
          />
        ))}
      </div>
    </div>
  );
};

export default OtherUserProfile;
