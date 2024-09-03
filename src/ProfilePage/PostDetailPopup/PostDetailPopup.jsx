// src/components/PostDetailPopup.js
import React, { useState } from 'react';
import './PostDetailPopup.css'; // Add your styles in this file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';

const PostDetailPopup = ({ post, onClose }) => {

    console.log(post);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showCommentBox, setShowCommentBox] = useState(false);

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

  const captionText = post.caption || "Default caption text here...";

  return (
    <div className="post-detail-popup">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>×</button>
        <div className="post-header">
          <img className="profile-pic" src={post.profileImage} alt="Profile" />
          <div className="profile-details">
            <span className="username">{post.username}</span>
            <span className="time">20h</span>
          </div>
        </div>

        <div className="post-content">
          {post.content.type === 'image' ? (
            <img className="post-image" src={post.content.src} alt="Post Content" />
          ) : (
            <video className="post-video" controls autoPlay loop muted>
              <source src={post.content.src} type="video/mp4" />
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
          <span className="username">{post.username} </span>
          {isExpanded ? captionText : `${captionText.substring(0, 100)}...`}
          <span className="show-more" onClick={toggleExpanded}>
            {isExpanded ? " Show Less" : " Show More"}
          </span>
        </div>

        {showCommentBox && (
          <div className="post-comments">
            {comments.map((comment, index) => (
              <div key={index} className="comment">
                <span className="username">{post.username} </span>
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

export default PostDetailPopup;
