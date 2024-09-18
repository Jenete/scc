// SessionTrackerView.js
import React, { useState } from 'react';
import SessionTracker from './SessionTracker'; // This should be your main session tracking component
import SessionList from './SessionList'; // A new component to list sessions
import './styles/sessionTrackerView.css';

const SessionTrackerView = () => {
  const [activeView, setActiveView] = useState('list'); // 'list', 'register', or 'details'

  // Handle switching views
  const handleViewSwitch = (view) => {
    setActiveView(view);
  };

  return (
    <div className="session-tracker-view">
      {/* Navigation Tabs */}
      <div className="view-tabs">
        <button
          className={activeView === 'list' ? 'active' : ''}
          onClick={() => handleViewSwitch('list')}
        >
          All sessions
        </button>
        <button
          className={activeView === 'register' ? 'active' : ''}
          onClick={() => handleViewSwitch('register')}
        >
          Manage
        </button>
      </div>

      {/* Conditionally render the active view */}
      <div className="view-container">
        {activeView === 'list' && <SessionList />}
        {activeView === 'register' && <SessionTracker />}
      </div>
    </div>
  );
};

export default SessionTrackerView;
