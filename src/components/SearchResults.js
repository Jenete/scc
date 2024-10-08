import React from 'react';
import './styles/searchResults.css'; // Import the CSS for styling

const SearchResults = ({ results, closeResults }) => {
  if (results.length === 0) {
    return <p className="no-results-message">No results found.</p>;
  }

  return (
    <div className="search-results">
      <div className="results-header">
        <h2>Search Results</h2>
        <button className="close-button" onClick={closeResults}>
          Close ❌
        </button>
      </div>
      <ol className="results-list">
        {results.map((result, index) => (
          <li key={index} className="search-result-item">
            {result.title && <strong className="result-title">{result.title}</strong>}
            {result.audioUrl && (
              <audio className="audio-player" controls src={result.audioUrl}></audio>
            )}
            {result.fileUrl && (
              <a className="result-link" href={result.fileUrl} target="_blank" rel="noopener noreferrer">
                Open Document
              </a>
            )}
            {result.url && (
              <a className="result-link" href={result.url} target="_blank" rel="noopener noreferrer">
                Open Link
              </a>
            )}
            {result.lyrics && (
              <textarea className="lyrics-textarea" value={result.lyrics} readOnly></textarea>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default SearchResults;
