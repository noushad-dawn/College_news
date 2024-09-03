import React, { useState, useEffect } from 'react';
import './mainprofile.css';
import Profilepost from '../profile_post/Profilepost';
import { jwtDecode } from 'jwt-decode';
import SettingsPopup from './SettingsPopup';
import PostPopup from './popup/PostPopup';



const Mainprofile = ({ posts }) => {
  const [username, setUsername] = useState("noushad_dawn");
  const [bio, setBio] = useState("I am a software developer");
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [profilePicture, setprofilePicture] = useState("./assets/images/barbara.jpg");
  const [showEditModal, setShowEditModal] = useState(false);
  const [error, setError] = useState('');
  const [showSettingsPopup, setShowSettingsPopup] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [userInfo,setUserInfo]=useState([]);




  //Fetching details from database
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          throw new Error('No token found');
        }

        // Decode token to get userId
        const decoded = jwtDecode(token);
        const userId = decoded.user.id;
        console.log(userId)
        console.log(token)
        const response = await fetch(`https://school-news-liard.vercel.app/api/user/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        setUserInfo(data);
        console.log(data);
        setUsername(data.username);
        setBio(data.bio);
        setFollowers(data.followers.length);  // Assuming followers is an array
        setFollowing(data.following.length);  // Assuming following is an array
        setprofilePicture(data.profilePicture || './assets/images/default.jpg');
      } catch (err) {
        console.error(err.message);
        setError('Failed to load profile');
      }
    };

    fetchProfile();
  }, []);



  //Edit detail in database


  // Temporary state variables for editing
  const [tempUsername, setTempUsername] = useState(username);
  const [tempBio, setTempBio] = useState(bio);
  const [tempprofilePicture, setTempprofilePicture] = useState(profilePicture);

  const handleEditClick = () => {
    setTempUsername(username);
    setTempBio(bio);
    setTempprofilePicture(profilePicture);
    setError('');
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  const handlePhotoChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setTempprofilePicture(URL.createObjectURL(event.target.files[0]));
    }
  };


  //handel setting 
  const handleSettingsClick = () => {
    setShowSettingsPopup(true); // Show the settings popup
  };

  const handleCloseSettingsPopup = () => {
    setShowSettingsPopup(false); // Close the settings popup
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    if (!tempUsername || !tempBio) {
      setError('All fields are required.');
      return;
    }

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('username', tempUsername);
    formData.append('bio', tempBio);
    if (tempprofilePicture !== profilePicture) {
      formData.append('profilePicture', document.getElementById('file-input').files[0]);
    }

    try {
      const response = await fetch('https://school-news-liard.vercel.app/api/user/profile', {
        method: 'PUT',
        headers: {
          'x-auth-token': token,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      setUsername(data.user.username);
      setBio(data.user.bio);
      setprofilePicture(data.user.profilePicture || profilePicture);
      setShowEditModal(false);
    } catch (err) {
      console.error(err.message);
      setError('Failed to update profile');
    }
  };
  //display post
  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleClosePostDetail = () => {
    setSelectedPost(null);
  };

  return (
    <div className='fullprofile'>
      <div className='profile_main'>
        <div className="nav_section">
          <div className="profile_picture">
            <img src={profilePicture} alt="profile" />
          </div>
          <div className="profile_content">
            <div className="main_bio">
              <h2>{username}</h2>
              <button onClick={handleEditClick}>Edit profile</button>
              <i className="fa-solid fa-gear"  onClick={handleSettingsClick}></i>
            </div>
            <div className="followers">
              <p>{posts.length} posts</p>
              <p>{followers} followers</p>
              <p>{following} following</p>
            </div>
            <div className="bio">
              <p>@{username}</p>
              <p>{bio}</p>
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
            onClick={() => handlePostClick(post)}
          />
        ))}
      </div>
{selectedPost && <PostPopup post={selectedPost} userInfo={userInfo} onClose={handleClosePostDetail} />}
      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>Edit Profile</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSaveChanges} className="edit-profile-form">
              <div className="form-group">
                <label>Profile Photo</label>
                <div className="profile-photo-container">
                  <img src={tempprofilePicture} alt="Profile" className="profile-photo" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    id="file-input"
                    className="input-file"
                  />
                  <label htmlFor="file-input" className="select-photo-button">
                    Select Photo
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  value={tempUsername}
                  onChange={(e) => setTempUsername(e.target.value)}
                  className="input-field"
                />
              </div>
              <div className="form-group">
                <label>Bio</label>
                <textarea
                  value={tempBio}
                  onChange={(e) => setTempBio(e.target.value)}
                  className="input-field"
                />
              </div>
              <button type="submit" className="save-button">Save Changes</button>
            </form>
          </div>
        </div>
      )}
        {showSettingsPopup && <SettingsPopup onClose={handleCloseSettingsPopup} />}
        
    </div>
  );
};

export default Mainprofile;

