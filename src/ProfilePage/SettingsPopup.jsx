import React from 'react';
import './settingsPopup.css'; 

const SettingsPopup = ({ onClose }) => {
    const handleCancelClick = () => {
        onClose();
      };
  return (
    <div className="settings-popup">
      <div className="popup-content">
        <span className="close" onClick={onClose}>&times;</span>
        <ul>
          <li>Apps and websites</li>
          <li>QR code</li>
          <li>Notifications</li>
          <li>Settings and privacy</li>
          <li>Supervision</li>
          <li>Login activity</li>
          <li>Log Out</li>
          <li onClick={handleCancelClick} >Cancel</li>
        </ul>
      </div>
    </div>
  );
};

export default SettingsPopup;
