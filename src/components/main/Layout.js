import React, { useState } from 'react';
import './styles/Layout.css'; // Include necessary styles
import EventCalendar from '../calendar/EventCalendar';
import MemberProfile from '../member/MemberProfile';
import MembersPage from '../MembersPage';
import SessionTrackerView from '../session/SessionTrackerView';
import InsightsView from '../insights/InsightsView';
import SundayService from '../session/SundayService';
import ContentViewer from '../ContentViewer';
import OutreachPage from '../outreach/OutreachPage';
import GoUpButton from '../extra/GoUpButton';
import FeatureReminder from '../extra/FeatureReminder';

const Layout = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false); // Add this line for toggling sidebar
  const user = JSON.parse(sessionStorage.getItem('sccuser'));

  const switchView = (view) => {
    setActiveView(view);
  };

  // Sidebar toggle function
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <h2><i className="fa fa-chevron-circle-right" aria-hidden="true"></i></h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className={activeView === 'dashboard' ? 'active' : ''} onClick={() => switchView('dashboard')}>
              <i className="fa fa-home"></i> <span> Home</span>
            </li>
            <li className={activeView === 'analytics' ? 'active' : ''} onClick={() => switchView('analytics')}>
              <i className="fa fa-chart-bar"></i> <span> Insights</span>
            </li>
            <li className={activeView === 'members' ? 'active' : ''} onClick={() => switchView('members')}>
              <i className="fa fa-users"></i> <span> Members</span>
            </li>
            <li className={activeView === 'media' ? 'active' : ''} onClick={() => switchView('media')}>
              <i className="fa fa-file"></i> <span> Media</span>
            </li>
            <li className={activeView === 'plan' ? 'active' : ''} onClick={() => switchView('plan')}>
              <i className="fa fa-map-marker"></i> <span> Plan</span>
            </li>
            <li className={activeView === 'session' ? 'active' : ''} onClick={() => switchView('session')}>
              <i className="fa fa-calendar"></i> <span> Session</span>
            </li>
            <li className={activeView === 'outreach' ? 'active' : ''} onClick={() => switchView('outreach')}>
              <i className="fa fa-address-book"></i> <span> Outreach</span>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content area */}
      <div className="main-content">
        {/* Top Navbar */}
        <header className="top-navbar">
          <div className="search-bar">
          <h2>SCC</h2>
          </div>
          <div className="navbar-actions">
            <button onClick={toggleSidebar}>Menu</button> {/* Add Menu button for toggling */}
            <button onClick={() => switchView('profile')}>Profile</button>
          </div>
        </header>

        {/* Dynamic View Container */}
        <section className="view-container">
          {activeView === 'dashboard' && <div>
            
            {/* Calendar section (mobile-friendly) */}
      <div className="main-page-section">
      {user && <MemberProfile member={user} />}
        <EventCalendar />
        
      </div>
            </div>}
          {activeView === 'analytics' && <div><InsightsView/></div>}
          {activeView === 'members' && <div> <MembersPage /></div>}
          {activeView === 'media' && <div><ContentViewer/></div>}
          {activeView === 'session' && <div><SessionTrackerView></SessionTrackerView></div>}
          {activeView === 'plan' && <div><SundayService/></div>}
          {activeView === 'outreach' && <div><OutreachPage/></div>}
          {activeView === 'profile' && <div>{user && <MemberProfile member={user} />}</div>}
        </section>
      </div>
      <GoUpButton />
      <FeatureReminder />
    </div>
  );
};

export default Layout;
