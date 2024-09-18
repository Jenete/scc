// GenericViewToggler.js
import React, { useState } from 'react';
import './styles/genericViewToggler.css';

const GenericViewToggler = ({ views }) => {
  const [activeView, setActiveView] = useState(views[0].key); // Default to the first view

  const handleViewSwitch = (viewKey) => {
    setActiveView(viewKey);
  };

  return (
    <div className="generic-view-toggler">
      {/* Navigation Tabs */}
      <div className="view-tabs">
        {views.map(view => (
          <button
            key={view.key}
            className={activeView === view.key ? 'active' : ''}
            onClick={() => handleViewSwitch(view.key)}
          >
            {view.label}
          </button>
        ))}
      </div>

      {/* Conditionally render the active view */}
      <div className="view-container">
        {views.map(view => (
          activeView === view.key && (
            <div key={view.key} className="view-content">
              {view.component}
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default GenericViewToggler;
