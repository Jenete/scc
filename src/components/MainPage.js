import React, { useState } from 'react';
import ContentViewer from './ContentViewer';
import './styles/MainPage.css';
import SearchResults from './SearchResults.js';
import MembersPage from './MembersPage.js';
import GenericViewToggler from './extra/GenericViewToggler.js';
import SessionTrackerView from './session/SessionTrackerView.js';
import FeatureReminder from './extra/FeatureReminder.js';
import GoUpButton from './extra/GoUpButton.js';
import EventCalendar from './calendar/EventCalendar.js';
import SundayService from './session/SundayService.js';
import OutreachPage from './outreach/OutreachPage.js';

const MainPage = () => {
  const [tabName, setTabName] = useState('members');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const views = [
    { key: 'list', label: 'Track Session', component: <SessionTrackerView /> },
    { key: 'sunday-service', label: 'Sunday Service', component: <SundayService /> },
  ];

  const handleSearch = async (query) => {
    // Fetching logic remains unchanged
  };

  const closeResults = () => {
    setSearchResults([]);
  };

  return (
    <div className="main-page">
      <header className="main-header">
        <h1 className="app-title">SCC</h1>
        <div className="search-container">
          <input
            className="search-input"
            placeholder="Quick search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="search-button"
            onClick={() => handleSearch(searchQuery)}
          >
            Search
          </button>
          {/* <Link className="user-profile-link" to={'/user-profile/defaultuser'}>
            <i className="fa fa-user-circle" aria-hidden="true"></i> AJ
          </Link>
          <div className="logout-button">
            <i className="fa fa-sign-out" aria-hidden="true"></i>
            <Logout />
          </div> */}
        </div>
      </header>

      <FeatureReminder />

      <div className="main-page-section search-results-section">
        {searchResults && searchResults.length > 0 && <SearchResults results={searchResults} closeResults={closeResults} />}
      </div>

      <div className="main-page-section event-calendar-section">
        <EventCalendar />
      </div>

      <div className="main-page-section">
        <OutreachPage/>
      </div>

      {(!searchResults || searchResults.length === 0) && (
        <div className="tab-navigation">
          <nav className="navigation">
            <button className="nav-button" onClick={() => setTabName('content')}>
              <i className="fa fa-file" aria-hidden="true"></i> Library
            </button>
            <button className="nav-button" onClick={() => setTabName('members')}>
              <i className="fa fa-users" aria-hidden="true"></i> Members
            </button>
            <button className="nav-button" onClick={() => setTabName('planner')}>
              <i className="fa fa-calendar" aria-hidden="true"></i> Sessions
            </button>
          </nav>
          <GoUpButton />
          <div className="content-viewer-section">
            {tabName === 'content' && <ContentViewer />}
          </div>
          <div className=" members-page-section">
            {tabName === 'members' && <MembersPage />}
          </div>
          <div className=" generic-view-toggler-section">
            {tabName === 'planner' && <GenericViewToggler views={views} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
