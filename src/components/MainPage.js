import React, { useState } from 'react'; 
import ContentViewer from './ContentViewer';
import FirestoreService from '../services/FirebaseConfig.js';
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
import MemberProfile from './member/MemberProfile.js';
import Layout from './main/Layout.js';

const MainPage = () => {
  const firestoreService = new FirestoreService('scc');
  const [tabName, setTabName] = useState('members');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const user = JSON.parse(sessionStorage.getItem('sccuser'));

  const views = [
    { key: 'list', label: 'Track Session', component: <SessionTrackerView /> },
    { key: 'sunday-service', label: 'Sunday Service', component: <SundayService /> },
  ];

  const handleSearch = async (query) => {
    try {
      // Fetch all content to filter by search query
      const [fetchedSongs, fetchedDocuments, fetchedLinks] = await Promise.all([
        firestoreService.getAll('songs'),
        firestoreService.getAll('documents'),
        firestoreService.getAll('links'),
      ]);

      const filteredSongs = fetchedSongs.filter((song) =>
        song.title.toLowerCase().includes(query.toLowerCase())
      );
      const filteredDocuments = fetchedDocuments.filter((document) =>
        document.title.toLowerCase().includes(query.toLowerCase())
      );
      const filteredLinks = fetchedLinks.filter((link) =>
        link.title.toLowerCase().includes(query.toLowerCase())
      );

      setSearchResults([...filteredSongs, ...filteredDocuments, ...filteredLinks]);
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  const closeResults = () => {
    setSearchResults([]);
  };

  return (
    <div className="main-page">
      <header className="main-header">
        <h1 className="app-title">SCC</h1>

        {/* Mobile-friendly search bar */}
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
        </div>
      </header>

      {/* Feature Reminder moved to a collapsible section */}
      <FeatureReminder />

      
      {/* Render Search Results */}
      {searchResults.length > 0 && (
        <div className="search-results-section">
          <SearchResults results={searchResults} closeResults={closeResults} />
        </div>
      )}

      {/* Calendar section (mobile-friendly) */}
      <div className="main-page-section">
        <EventCalendar />
        {user && <MemberProfile member={user} />}
      </div>

      {/* Navigation Tabs */}
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
<Layout/>
        {/* Tab Content */}
        <div className="content-section">
          {tabName === 'content' && <ContentViewer />}
          {tabName === 'members' && <MembersPage />}
          {tabName === 'planner' && <GenericViewToggler views={views} />}
        </div>
      </div>

      <div className="main-page-section">
        <OutreachPage />
      </div>

      {/* GoUpButton for mobile-friendly scrolling */}
      <GoUpButton />
    </div>
  );
};

export default MainPage;
