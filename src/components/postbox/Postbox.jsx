import React, { useState } from 'react';
import './Postbox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';

const Postbox = ({ profileImage, postContent, username }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showCommentBox, setShowCommentBox] = useState(false); // State to handle comment box visibility

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

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

  const captionText = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati doloremque quaerat odio soluta facere, placeat blanditiis assumenda magnam fugiat enim nobis laborum dolorum aspernatur, molestias veniam! Repellendus quidem alias, aliquam impedit ad recusandae assumenda delectus incidunt suscipit, ipsum officia molestiae, neque molestias unde.";

  return (
    <div className="instagram-post">
      <div className="post-header">
        <img className="profile-pic" src={profileImage} alt="Profile" />
        <div className="profile-details">
          <span className="username">{username}</span>
          <span className="time">20h</span>
        </div>
        <div className="post-options">•••</div>
      </div>

      <div className="post-content">
        {postContent.type === 'image' ? (
          <img className="post-image" src={postContent.src} alt="Post Content" />
        ) : (
          <video className="post-video" controls autoPlay loop muted>
            <source src={postContent.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      <div className="post-actions">
        <span onClick={handleLike}>
          <FontAwesomeIcon icon={faHeart} className={`fa-heart ${isLiked ? 'liked' : ''}`} />
        </span>
        <span onClick={() => setShowCommentBox(!showCommentBox)}>
          <FontAwesomeIcon icon={faComment} className="fa-comment" />
        </span>
      </div>

      <div className="post-likes">
        <span>{isLiked ? '12,329 likes' : '12,328 likes'}</span>
      </div>

      <div className="post-caption">
        <span className="username">{username} </span>
        {isExpanded ? captionText : `${captionText.substring(0, 100)}...`}
        <span className="show-more" onClick={toggleExpanded}>
          {isExpanded ? " Show Less" : " Show More"}
        </span>
      </div>

      {showCommentBox && (
        <div className="post-comments">
          {comments.map((comment, index) => (
            <div key={index} className="comment">
              <span className="username">{username} </span>
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
  );
};

export default Postbox;
