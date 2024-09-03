
// import React, { useState } from 'react';
// import './Leftside.css';
// import { useNavigate } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode';

// const Leftside = ({ onPostSubmit }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [mediaSelected, setMediaSelected] = useState(null);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const navigate = useNavigate();

//   const handleCreateClick = () => {
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setMediaSelected(null);
//     setTitle('');
//     setDescription('');
//   };

//   const handleMediaSelection = (event) => {
//     if (event.target.files.length > 0) {
//       const file = event.target.files[0];
//       const fileType = file.type;

//       if (fileType.startsWith('image/') || fileType.startsWith('video/')) {
//         setMediaSelected(file);
//       } else {
//         alert('Please select a valid image or video file.');
//         setMediaSelected(null);
//       }
//     }
//   };

//   const handleSubmit = async () => {
//     if (title && description && mediaSelected) {
//       const formData = new FormData();
//       formData.append('media', mediaSelected);
//       formData.append('title', title);
//       formData.append('description', description);

//       try {
//         const token = localStorage.getItem('token');

//         if (!token) {
//           throw new Error('No token found');
//         }

//         // Decode token to get userId
//         const decoded = jwtDecode(token);
//         const userId = decoded.user.id;
//         console.log(userId)
//         console.log(token)
//         console.log(mediaSelected)
//         const response = await fetch('https://school-news-liard.vercel.app/api/post/upload', {
//           method: 'POST',
//           headers: {
//             'Access-Control-Allow-Origin':'*',
//             'x-auth-token': token,
//           },
//           body: formData,

//           // The fetch API automatically sets Content-Type for FormData
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const result = await response.json();
//         console.log('Upload successful', result);

//         if (onPostSubmit) onPostSubmit(result.post);
//         handleCloseModal();
//       } catch (error) {
//         console.error('Upload failed', error);
//         alert('Upload failed. Please try again.');
//       }
//     } else {
//       alert('Please fill in all fields and select a media file.');
//     }
//   };

//   return (
//     <div className="mian">
//       <div className="logo">
//         <h1>SSIPMT NEWS</h1>
//       </div>
//       <div className="section">
//         <ul>
//           <div className="leftitems" onClick={() => navigate('/')}>
//             <i className="fa-solid fa-house"></i>Home
//           </div>
//           <div className="leftitems" onClick={() => navigate('/search')}>
//             <i className="fa-solid fa-magnifying-glass"></i> Search
//           </div>
//           <div className="leftitems" onClick={() => navigate('/reels')}>
//             <i className="fa-brands fa-youtube"></i> Reels
//           </div>
//           <div className="leftitems">
//             <i className="fa-solid fa-bell"></i> Notifications
//           </div>
//           <div className="leftitems" onClick={handleCreateClick}>
//             <i className="fa-regular fa-square-plus"></i> Create
//           </div>
//           <div className="leftitems" onClick={() => navigate('/profile')}>
//             <i className="fa-regular fa-circle-user"></i> Profile
//           </div>
//         </ul>
//       </div>
//       {showModal && (
//         <div className="modal">
//           <div className="modal-content">
//             <span className="close" onClick={handleCloseModal}>&times;</span>
//             {!mediaSelected ? (
//               <>
//                 <p>Create new post</p>
//                 <div className="upload-image">
//                   <img src="./assets/images/upload-image.png" alt="Upload" />
//                 </div>
//                 <label className="upload-label">
//                   <input
//                     type="file"
//                     accept="image/*,video/*,pdf/*"
//                     className="file-input"
//                     onChange={handleMediaSelection}
//                   />
//                   <span className="upload-button">Select from computer</span>
//                 </label>
//               </>
//             ) : (
//               <>
//                 <p>Enter post details</p>
//                 <div className="form-group">
//                   <label>Title</label>
//                   <input
//                     type="text"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     className="input-field"
//                     placeholder="Enter title"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Description</label>
//                   <textarea
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     className="input-field"
//                     placeholder="Enter description"
//                   />
//                 </div>
//                 <button className="submit-button" onClick={handleSubmit}>
//                   Submit Post
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Leftside;

import React, { useState } from 'react';
import './Leftside.css';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Leftside = ({ onPostSubmit }) => {
  const [showModal, setShowModal] = useState(false);
  const [mediaSelected, setMediaSelected] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const token=localStorage.getItem('token')
  const decoded = jwtDecode(token);
  const userId = decoded.user.id;
  const handleCreateClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setMediaSelected(null);
    setTitle('');
    setDescription('');
  };

  const handleMediaSelection = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const fileType = file.type;

      if (fileType.startsWith('image/') || fileType.startsWith('video/') || fileType === 'application/pdf') {
        setMediaSelected(file);
      } else {
        alert('Please select a valid image, video, or PDF file.');
        setMediaSelected(null);
      }
    }
  };

  const handleSubmit = async () => {
    if (title && description && mediaSelected) {
      const formData = new FormData();
      formData.append('media', mediaSelected);
      formData.append('title', title);
      formData.append('description', description);

      try {
        const token = localStorage.getItem('token');

        if (!token) {
          throw new Error('No token found');
        }

        // Decode token to get userId
        const decoded = jwtDecode(token);
        const userId = decoded.user.id;

        const response = await fetch('https://school-news-liard.vercel.app/api/post/upload', {
          method: 'POST',
          headers: {
            'x-auth-token': token,
            // No need to set Content-Type header, FormData handles it
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        // console.log('Upload successful', result);
        alert('Upload Succesfully');

        if (onPostSubmit) onPostSubmit(result.post);
        handleCloseModal();
      } catch (error) {
        console.error('Upload failed', error);
        alert('Upload failed. Please try again.');
      }
    } else {
      alert('Please fill in all fields and select a media file.');
    }
  };

  return (
    <div className="mian">
      <div className="logo">
        <h1>SSIPMT NEWS</h1>
      </div>
      <div className="section">
        <ul>
          <div className="leftitems" onClick={() => navigate('/')}>
            <i className="fa-solid fa-house"></i>Home
          </div>
          <div className="leftitems" onClick={() => navigate('/search')}>
            <i className="fa-solid fa-magnifying-glass"></i> Search
          </div>
          <div className="leftitems" onClick={() => navigate('/reels')}>
            <i className="fa-brands fa-youtube"></i> Videos
          </div>
          <div className="leftitems" onClick={() => navigate('/reels')}>
            <i className="fa-solid fa-image"></i> Images
          </div>
          <div className="leftitems" onClick={() => navigate('/reels')}>
            <i className="fa-solid fa-file-pdf"></i> Pdfs
          </div>
          <div className="leftitems">
            <i className="fa-solid fa-bell"></i> Notifications
          </div>
          <div className="leftitems" onClick={handleCreateClick}>
            <i className="fa-regular fa-square-plus"></i> Create
          </div>
          <div className="leftitems" onClick={() => navigate(`/profile/${userId}`)}>
            <i className="fa-regular fa-circle-user"></i> Profile
          </div>
        </ul>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            {!mediaSelected ? (
              <>
                <p>Create new post</p>
                <div className="upload-image">
                  <img src="./assets/images/upload-image.png" alt="Upload" />
                </div>
                <label className="upload-label">
                  <input
                    type="file"
                    accept="image/*,video/*,application/pdf"
                    className="file-input"
                    onChange={handleMediaSelection}
                  />
                  <span className="upload-button">Select from computer</span>
                </label>
              </>
            ) : (
              <>
                <p>Enter post details</p>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input-field"
                    placeholder="Enter title"
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="input-field"
                    placeholder="Enter description"
                  />
                </div>
                <button className="submit-button" onClick={handleSubmit}>
                  Submit Post
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Leftside;
