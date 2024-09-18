import React, { useState } from 'react';
import FirestoreService from '../services/FirebaseConfig.js';
import ContentViewer from './ContentViewer';
import FileUploadForm from './FileUploadForm';
import './styles/MainPage.css';
import SearchResults from './SearchResults.js';
import MembersPage from './MembersPage.js';
import GenericViewToggler from './extra/GenericViewToggler.js';
import ChurchPlanner from './ChurchPlanner/ChurchPlanner.js';
import SessionTrackerView from './session/SessionTrackerView.js';
import PlannerListPage from './ChurchPlanner/PlannerListPage.js';
import FeatureReminder from './extra/FeatureReminder.js';

const MainPage = () => {
  const firestoreService = new FirestoreService('scc');
  const [tabName, setTabName] = useState('members');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const views = [
    { key: 'list', label: 'Track Session', component: <SessionTrackerView /> },
    { key: 'plan-church', label: 'Plan next service', component: <ChurchPlanner /> },
    { key: 'view-church', label: 'View service', component: <PlannerListPage /> },

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

  const closeResults = ()=>{
    setSearchResults([]);
  }

  return (
    <div className="main-page">
      <div className="nav-heading">
        <h1 className="scc-nav-header">SCC</h1>
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
      </div>
<FeatureReminder/>
      {searchResults && searchResults.length>0 && <SearchResults results={searchResults} closeResults={closeResults}/>}
    {(!searchResults || searchResults.length === 0) && <div>
            <div className="navigation">
                <button onClick={() => setTabName('content')}><i className="fa fa-file" aria-hidden="true"></i> Library</button>
                <button onClick={() => setTabName('members')}><i className="fa fa-users" aria-hidden="true"></i> Members</button>
                <button onClick={() => setTabName('planner')}><i className="fa fa-calendar" aria-hidden="true"></i> Planner</button>
            </div>

            {tabName === 'content' && <ContentViewer />}
            {tabName === 'members' && <MembersPage />}
            {tabName === 'planner' && <GenericViewToggler views={views} />}
    </div>}
      
    </div>
  );
};

export default MainPage;
