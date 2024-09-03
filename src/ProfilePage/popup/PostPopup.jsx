// import React, { useEffect } from 'react';
// import './PostPopup.css';

// const PostPopup = ({ post, onClose,userInfo }) => {
//   if (!post) return null;
  
//   return (
//     <div className="popup-overlay" onClick={onClose}>
//       <div className="popup-content" onClick={(e) => e.stopPropagation()}>
//         <div className="popup-header">
//           <img src={userInfo.profilePicture} alt={userInfo.username} className="profile-pic" />
//           <span className="username">{userInfo.username}</span>
//           <span className="close" onClick={onClose}>&times;</span>
//         </div>
//         <div className="popup-image">
//           {post.media[0].type === 'image' ? (
//             <img src={post.media[0].url} alt="post" />
//           ) : (
//             <video controls>
//               <source src={post.media[0].url} type="video/mp4" />
//             </video>
//           )}
//         </div>
//         <div className="popup-details">
//           <h2>{post.title}</h2>
//           <p>{post.description}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PostPopup;

import React, { useState } from 'react';
import './PostPopup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';

const PostPopup = ({ post, onClose, userInfo }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  const captionText = post.description || '';

  if (!post) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <img src={userInfo.profilePicture} alt={userInfo.username} className="profile-pic" />
          <span className="username">{userInfo.username}</span>
          <span className="close" onClick={onClose}>&times;</span>
        </div>
        <div className="popup-image">
          {post.media[0].type === 'image' ? (
            <img src={post.media[0].url} alt="post" />
          ) : (
            <video controls>
              <source src={post.media[0].url} type="video/mp4" />
            </video>
          )}
        </div>
        <div className="popup-actions">
          <div className="action-container">
            <span onClick={handleLike}>
              <FontAwesomeIcon icon={faHeart} className={`fa-heart ${isLiked ? 'liked' : ''}`} />
            </span>
          
          <span onClick={() => setShowCommentBox(!showCommentBox)}>
            <FontAwesomeIcon icon={faComment} className="fa-comment" />
          </span>
          </div>
        </div>
        <div className="like-count">
        <span >
              {isLiked ? '1,000 likes' : '999 likes'}
            </span>
        </div>
        <div className="popup-caption">
          <span className="username">{post.title} </span>
          {isExpanded ? captionText : `${captionText.substring(0, 100)}...`}
          <span className="show-more" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? " Show Less" : " Show More"}
          </span>
        </div>
        
        {showCommentBox && (
          <div className="popup-comments">
            {comments.map((comment, index) => (
              <div key={index} className="comment">
                <span className="username">{userInfo.username} </span>
                {comment}
              </div>
            ))}
            <div className="add-comment">
              <input
                type="text"
                value={newComment}
                onChange={handleCommentChange}
                placeholder="Add a comment..."
              />
              <button onClick={handleAddComment}>Post</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostPopup;
