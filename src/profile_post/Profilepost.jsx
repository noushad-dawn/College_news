// // src/components/Profilepost/Profilepost.js
// import React from 'react';
// import './Profilepost.css';

// const Profilepost = ({ posttype, onClick }) => {
//   return (
//     <div className="posts" onClick={onClick}>
//       {posttype.type === 'image' ? (
//         <img className="p-image" src={posttype.url} alt="Post Content" />
//       ) : (
//         <video className="p-video" autoPlay loop muted>
//           <source src={posttype.url} type="video/mp4" />
//         </video>
//       )}
//     </div>
//   );
// };

// export default Profilepost;
// src/components/Profilepost/Profilepost.js
// src/components/Profilepost/Profilepost.js
// import React from 'react';
// import './Profilepost.css';

// const Profilepost = ({ posttype, onClick }) => {
//   return (
//     <div className="posts" onClick={onClick}>
//       {posttype.type === 'image' ? (
//         <img className="p-image" src={posttype.url} alt="Post Content" />
//       ) : (
//         <div className="video-container">
//           <video className="p-video" loop muted>
//             <source src={posttype.url} type="video/mp4" />
//           </video>
//           <div className="video-icon">
//             <i className="fa-solid fa-play"></i>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profilepost;
import React from 'react';
import './Profilepost.css';

const Profilepost = ({ posttype, onClick }) => {
  return (
    <div className="posts" onClick={onClick}>
      {posttype.type === 'image' ? (
        <img className="p-image" src={posttype.url} alt="Post Content" />
      ) : (
        <div className="video-container">
          <video className="p-video" loop muted>
            <source src={posttype.url} type="video/mp4" />
          </video>
          <div className="video-icon">
            <i className="fa-solid fa-play"></i>
          </div>
        </div>
      )
      
      }
    </div>
  );
};

export default Profilepost;
