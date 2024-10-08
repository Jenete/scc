import React, { useState } from 'react';
import './styles/Layout.css'; // Include necessary styles

const Layout = () => {
  const [activeView, setActiveView] = useState('dashboard'); // default view

  // Function to handle switching views
  const switchView = (view) => {
    setActiveView(view);
  };

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h2>WebApp</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className={activeView === 'dashboard' ? 'active' : ''} onClick={() => switchView('dashboard')}>
              <i className="fa fa-home"></i> Dashboard
            </li>
            <li className={activeView === 'analytics' ? 'active' : ''} onClick={() => switchView('analytics')}>
              <i className="fa fa-chart-bar"></i> Analytics
            </li>
            <li className={activeView === 'members' ? 'active' : ''} onClick={() => switchView('members')}>
              <i className="fa fa-users"></i> Members
            </li>
            <li className={activeView === 'settings' ? 'active' : ''} onClick={() => switchView('settings')}>
              <i className="fa fa-cog"></i> Settings
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Top Navbar */}
        <header className="top-navbar">
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <button><i className="fa fa-search"></i></button>
          </div>
          <div className="navbar-actions">
            <button className="profile-button"><i className="fa fa-user"></i> Profile</button>
            <button className="logout-button"><i className="fa fa-sign-out-alt"></i> Logout</button>
          </div>
        </header>

        {/* Dynamic View Content */}
        <div className="view-container">
          {activeView === 'dashboard' && <DashboardView />}
          {activeView === 'analytics' && <AnalyticsView />}
          {activeView === 'members' && <MembersView />}
          {activeView === 'settings' && <SettingsView />}
        </div>
      </div>
    </div>
  );
};

const DashboardView = () => <div>Dashboard Content</div>;
const AnalyticsView = () => <div>Analytics Content</div>;
const MembersView = () => <div>Members Content</div>;
const SettingsView = () => <div>Settings Content</div>;

export default Layout;
