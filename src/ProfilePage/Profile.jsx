// // Profile.js
// import React, { useState, useEffect } from 'react';
// import Leftside from '../components/Leftside/Leftside'; // Verify this path
// import Mainprofile from './Mainprofile'; // Verify this path
// import './profile.css';
// import { jwtDecode } from 'jwt-decode';

// const Profile = () => {
//   const [posts, setPosts] = useState([]);
//   const token = localStorage.getItem('token');

//   if (!token) {
//     throw new Error('No token found');
//   }

//   // Decode token to get userId
//   const decoded = jwtDecode(token);
//   const userId = decoded.user.id;

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await fetch(`https://school-news-liard.vercel.app/api/post/user/${userId}`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'x-auth-token': token, 
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         setPosts(data);
//         console.log(data);
//       } catch (error) {
//         console.error('Failed to fetch posts', error);
//       }
//     };

//     fetchPosts();
//   }, [userId]);

//   const handlePostSubmit = (newPost) => {
//     setPosts([newPost, ...posts]);
//   };

//   return (
//     <div className='mainprofile'>
//       <div className="left-part">
//         <Leftside onPostSubmit={handlePostSubmit} />
//       </div>
//       <div className="mian-part">
//         <Mainprofile posts={posts} />
//       </div>
//     </div>
//   );
// };

// export default Profile;
import React, { useState, useEffect } from 'react';
import Leftside from '../components/Leftside/Leftside'; // Verify this path
import Mainprofile from './Mainprofile'; // Verify this path
import OtherUserProfile from '../othersprofile/OtherUserProfile'; // Import the OtherUserProfile component
import './profile.css';
import { jwtDecode } from 'jwt-decode';
import { useParams } from 'react-router-dom'; // Import useParams if you're using route parameters

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [profileUserId, setProfileUserId] = useState(null); // To store the user ID being viewed
  const [isCurrentUser, setIsCurrentUser] = useState(true); // To determine if it's the current user's profile
  const token = localStorage.getItem('token');
  // console.log(id);
 const { id } = useParams(); 
  if (!token) {
    throw new Error('No token found');
  }

  // Decode token to get userId
  const decoded = jwtDecode(token);
  const userId = decoded.user.id;

  // Fetch the user ID from the URL parameters if you're using route parameters
  // Assumes you're using react-router-dom v6 or higher

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Fetch user profile to get userId being viewed
        const response = await fetch(`https://school-news-liard.vercel.app/api/user/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProfileUserId(data._id);
        setIsCurrentUser(data._id === userId); // Check if the profile ID matches the logged-in user ID
      } catch (error) {
        console.error('Failed to fetch profile data', error);
      }
    };

    fetchProfileData();
  }, [id, token, userId]);

  useEffect(() => {
    if (isCurrentUser) {
      // Fetch posts only if it is the current user's profile
      const fetchPosts = async () => {
        try {
          const response = await fetch(`https://school-news-liard.vercel.app/api/post/user/${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': token,
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          setPosts(data);
        } catch (error) {
          console.error('Failed to fetch posts', error);
        }
      };

      fetchPosts();
    }
  }, [isCurrentUser, userId, token]);

  const handlePostSubmit = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className='mainprofile'>
      <div className="left-part">
      <Leftside onPostSubmit={handlePostSubmit} />
      </div>
      <div className="main-part">
        {isCurrentUser ? (
          <Mainprofile posts={posts} />
        ) : (
          <OtherUserProfile profileUserId={id} token={token}/>
        )}
      </div>
    </div>
  );
};

export default Profile;
