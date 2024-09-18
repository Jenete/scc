import React, { useState, useEffect } from 'react';
import './styles/featureReminder.css';

const FeatureReminder = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check local storage to determine if the popover should be shown
    const showPopover = sessionStorage.getItem('showFeatureReminder');
    if (showPopover === null) {
      sessionStorage.setItem('showFeatureReminder', 'true');
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('showFeatureReminder', 'false');
  };

  if (!isVisible) return null;

  return (
    <div className="feature-reminder">
      <button className="feature-reminder-close" onClick={handleClose}>
        <i className="fa fa-times" aria-hidden="true"></i>
      </button>
      <h2>Let me remind you</h2>
      <ul className="feature-list">
        <li>
          <i className="fa fa-users" aria-hidden="true"></i>
          <span>Members:</span>
          <ul>
            <li>1. View members</li>
            <li>2. Register</li>
          </ul>
        </li>
        <li>
          <i className="fa fa-calendar" aria-hidden="true"></i>
          <span>Planner:</span>
          <ul>
            <li>1. Track session
            </li>
            <li>2. Plan next church service</li>
            <li>3. View next service</li>
          </ul>
        </li>
        <li>
          <i className="fa fa-upload" aria-hidden="true"></i>
          <span>Upload:</span>
          <ul>
            <li>Upload media</li>
          </ul>
        </li>
        <li>
          <i className="fa fa-file" aria-hidden="true"></i>
          <span>Library:</span>
          <ul>
            <li>View all files</li>
          </ul>
        </li>
        <li>
          <i className="fa fa-search" aria-hidden="true"></i>
          <span>Quick search:</span>
          <ul>
            <li>Search for a file</li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default FeatureReminder;
