
import React, { useState } from 'react';
import './styles/GoogleSearchHandler.css';

const GoogleSearchHandler = () => {
  const [queryText, setQueryText] = useState('');
  const [queryVerseText, setQueryVerseText] = useState('');

  const handleSearch = (search_type) => {
    const formattedQuery = "\""+queryText.replace(/\s+/g, '+') +"\"+ worship song lyrics"; // Replace spaces with "+"
    const formattedQueryVerse = "site:bible.com "+queryVerseText.replace(/\s+/g, '+')+"+:verse in the bible"; // Replace spaces with "+"
    const searchUrl = `https://www.google.com/search?q=${formattedQuery}`;
    const searchUrl2 = `https://www.google.com/search?q=${formattedQueryVerse}`;
    if (search_type ==='lyrics')window.open(searchUrl, '_blank'); // Open the Google search results in a new tab
    else window.open(searchUrl2, '_blank'); // Open the Google search results in a new tab
  };

  return (
    <div className="google-search-page">
      <h2>Google Search</h2>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          value={queryText}
          onChange={(e) => setQueryText(e.target.value)}
          placeholder="Song name to lyrics..."
        />
        <button onClick={()=>handleSearch('lyrics')} className="search-button">Search</button>
      </div>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          value={queryVerseText}
          onChange={(e) => setQueryVerseText(e.target.value)}
          placeholder="Find verse..."
        />
        <button onClick={()=>handleSearch('verse')} className="search-button">Search</button>
      </div>
    </div>
  );
};

export default GoogleSearchHandler;
