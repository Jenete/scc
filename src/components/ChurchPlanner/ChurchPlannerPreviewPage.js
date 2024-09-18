import React, { useEffect } from 'react';
import './styles/ChurchPlannerPreviewPage.css'; // Ensure the CSS file is correctly referenced
import {handleCopyToClipBoard}  from '../../helpers/utils.js';

const ChurchPlannerPreviewPage = ({ data, onClose }) => {
  if (!data) return null; // Ensure that data is provided

  function getNextSundayDate() {
    const today = new Date(); // Get the current date
    const dayOfWeek = today.getDay(); // Get the current day of the week (0 = Sunday, 1 = Monday, etc.)
    
    // Calculate the number of days until the next Sunday
    const daysUntilNextSunday = (8 - dayOfWeek) % 7 || 7; // If today is Sunday, we want to add 7 days
    
    // Create a new date object for the next Sunday
    const nextSunday = new Date(today);
    nextSunday.setDate(today.getDate() + daysUntilNextSunday);
    
    return nextSunday.toISOString().split('T')[0];
  }

  const handleCopy = () => {
    if (!data) return;
  
    const { opener, songs, choirSongs, dancingStarsSongs, tsaSong, announcements } = data;
  
    try {
      const textToCopy = `
        Prayer: ${opener}
  
        Songs:
        ${songs.map((song, index) => `${index + 1}. ${song.title}`).join('\n')}
  
        Choir Songs:
        ${choirSongs.map((song, index) => `${index + 1}. ${song.title}`).join('\n')}
  
        Dancing Stars Songs:
        ${dancingStarsSongs.map((song, index) => `${index + 1}. ${song.title}`).join('\n')}
  
        TSA Song: ${tsaSong.title}
  
        Announcements: ${announcements.map((song, index) => `${index + 1}. ${song.title}`).join('\n')}
      `;
  
      // Use the correct textToCopy variable here, not a string 'textToCopy'
      handleCopyToClipBoard(textToCopy);
    } catch (e) {
      console.error(e);
    }
  };
  
  

  const { opener, songs, choirSongs, dancingStarsSongs, tsaSong, announcements } = data;

  return (
    <div className="modalBackdrop">
      <div className="modalContainer">
        <div className="modalContent">
          <h3>Prayer opening</h3>
          <p>{opener} - <strong>{JSON.stringify(getNextSundayDate())}</strong></p>

          <h4>Praise and Worship Songs</h4>
          <div className="songPreview">
          {songs.map((song, index) => (
            <div key={song.id}>
              {/* <h3>Song {index + 1}.</h3> */}
              <p><strong>{index + 1}.</strong> {song.title || 'N/A'}</p>
              {/* <p><strong>Lyrics:</strong> {song.lyrics || 'N/A'}</p> */}
              {/* {song.file && <p><strong>File:</strong> {song.file.name}</p>} */}
            </div>
          ))}
          </div>

          <h4>Choir Songs</h4>
          {choirSongs.map((song, index) => (
            <div key={song.id} className="songPreview">
              {/* <h3>Song {index + 1}.</h3> */}
              <p><strong>{index + 1}.</strong> {song.title || 'N/A'}</p>
              {/* <p><strong>Lyrics:</strong> {song.lyrics || 'N/A'}</p> */}
              {/* {song.file && <p><strong>File:</strong> {song.file.name}</p>} */}
            </div>
          ))}

          <h4>Dancing Stars Songs</h4>
          <div className="songPreview">
          {dancingStarsSongs.map((song, index) => (
            <div key={song.id} >
              {/* <h3>Song {index + 1}.</h3> */}
              <p><strong>{index + 1}.</strong> {song.title || 'N/A'}</p>
              {/* <p><strong>Lyrics:</strong> {song.lyrics || 'N/A'}</p> */}
              {/* {song.file && <p><strong>File:</strong> {song.file.name}</p>} */}
            </div>
            
          ))}</div>

          <h4>TSA Songs</h4>
          <div className="songPreview">
            <p><strong>{1}</strong> {tsaSong.title || 'N/A'}</p>
            {/* <p><strong>Lyrics:</strong> {tsaSong.lyrics || 'N/A'}</p> */}
            {/* {tsaSong.file && <p><strong>File:</strong> {tsaSong.file.name}</p>} */}
          </div>

          <h4>Announcements</h4>
          {announcements.map((announcement, index) => (
            <div key={index} className="announcementPreview">
              <p><strong>{index + 1}.</strong> {announcement.title || 'N/A'}</p>
              {announcement.image && <p><strong>Image:</strong> {announcement.image.name}</p>}
            </div>
          ))}

        </div>

        <button className="" onClick={handleCopy}>
          Copy
        </button>
        <button className="closeButton" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ChurchPlannerPreviewPage;
