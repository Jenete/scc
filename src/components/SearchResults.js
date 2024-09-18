import React from 'react';

const SearchResults = ({ results,closeResults }) => {
  if (results.length === 0) {
    return <p>No results found.</p>;
  }

  return (
    <div className="search-results">
      <h2>Search Results <button onClick={closeResults}>Close ❌</button></h2>
      <ol>
        {results.map((result, index) => (
          <li key={index} className="search-result-item">
            {result.title ? <strong>{result.title}</strong> : ''}
            {result.audioUrl ? (
              <audio controls src={result.audioUrl}></audio>
            ) : (
              ''
            )}
            {result.fileUrl ? (
              <a
                href={result.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Document
              </a>
            ) : (
              ''
            )}
            {result.url ? (
              <a
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Link
              </a>
            ) : (
              ''
            )}
            {result.lyrics ? (
              <textarea
                value={result.lyrics}
              >
              </textarea>
            ) : (
              ''
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default SearchResults;
