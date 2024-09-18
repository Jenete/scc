import React, { useEffect, useState } from 'react';
import FirestoreService from '../../services/FirebaseConfig.js';
import './styles/ResultsContainer.css'; // Ensure to import the corresponding CSS file

const ResultsContainer = ({ filename, view }) => {
    
  const firestoreService = new FirestoreService('scc');
  const [searchResults, setSearchResults] = useState([]);
  const [status, setStatus] = useState('loading'); // 'loading', 'found', 'similar', 'not-found'

  const handleSearch = async (query) => {
    try {
      const fetchedSongs = await firestoreService.getAll('songs');
      const filteredSongs = fetchedSongs.filter((song) =>
        song.title.toLowerCase().includes(query.toLowerCase())
      );
      
      if (filteredSongs.length === 0) {
        setStatus('not-found');
      } else {
        const exactMatch = filteredSongs.find(song => song.title.toLowerCase() === query.toLowerCase());
        setSearchResults(filteredSongs);
        setStatus(exactMatch ? 'found' : 'similar');
      }
    } catch (error) {
      console.error('Error fetching songs:', error);
      setStatus('error');
    }
  };

  useEffect(() => {
    if (filename?.length > 2 ) {
      setStatus('loading');
      handleSearch(filename);
    }
  }, [filename]);
  if (!filename) return '';
  return (
    <div className="results-container">
      {status === 'loading' && <p className="status-message">Searching...</p>}
      {status === 'found' && (
        <div className="result-status">
          <i className="fa fa-check-circle success-icon" aria-hidden="true"></i> Found! Skip lyrics and file
        </div>
      )}
      {status === 'similar' && (
        <div className="result-status">
          <i className="fa fa-check-circle similar-icon" aria-hidden="true"></i> Did you mean: {searchResults.map(song => song.title).join(', ')}
          {view}
        </div>
      )}
      {status === 'not-found' && (
        <div className="result-status">
          <i className="fa fa-times-circle error-icon" aria-hidden="true"></i> We don't have it
          {view}
        </div>
      )}
      {status === 'error' && (
        <div className="result-status">
          <i className="fa fa-exclamation-circle error-icon" aria-hidden="true"></i> An error occurred
        </div>
      )}
    </div>
  );
};

export default ResultsContainer;
