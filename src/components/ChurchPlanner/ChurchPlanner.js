import React, { useState } from 'react';
import './styles/ChurchPlanner.css'; // Ensure the CSS file is correctly referenced
import ChurchPlannerPreviewPage from './ChurchPlannerPreviewPage';
import ResultsContainer from './ResultsContainer.js';
import FirestoreService from '../../services/FirebaseConfig.js';
import DataRender from '../data/DataRender.js';

const ChurchPlanner = () => {
    
  const [opener, setOpener] = useState('');
  const [songs, setSongs] = useState([{ id: Math.random().toString(36).substring(2, 32), title: '', lyrics: '', file: '' }]);
  const [choirSongs, setChoirSongs] = useState([{ id: Math.random().toString(36).substring(2, 32), title: '', lyrics: '', file: '' }]);
  const [dancingStarsSongs, setDancingStarsSongs] = useState([{ id: Math.random().toString(36).substring(2, 32), title: '', lyrics: '', file: '' }]);
  const [tsaSong, setTsaSong] = useState({ id: Math.random().toString(36).substring(2, 32), title: '', lyrics: '', file: '' });
  const [announcements, setAnnouncements] = useState([{ id: Math.random().toString(36).substring(2, 32), title: '', image: '' }]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const regularOpeners = ["Mr Njongo", "Sis Lungie", "Pastor Luvo", "Sis Elsie", 'Brother ...', 'Other'];
  const firestoreService = new FirestoreService('scc');

  const handleSongChange = (id, updatedSong, section) => {
    if (section === 'songs') {
      setSongs(songs.map(song => song.id === id ? updatedSong : song));
    } else if (section === 'choirSongs') {
      setChoirSongs(choirSongs.map(song => song.id === id ? updatedSong : song));
    } else if (section === 'dancingStarsSongs') {
      setDancingStarsSongs(dancingStarsSongs.map(song => song.id === id ? updatedSong : song));
    }
  };

  const handleAddSong = () => {
    setSongs([...songs, { id: Math.random().toString(36).substring(2, 32), title: '', lyrics: '', file: '' }]);
  };

  const handleAddChoirSong = () => {
    setChoirSongs([...choirSongs, { id: Math.random().toString(36).substring(2, 32), title: '', lyrics: '', file: '' }]);
  };

  const handleAddDancingStarSong = () => {
    setDancingStarsSongs([...dancingStarsSongs, { id: Math.random().toString(36).substring(2, 32), title: '', lyrics: '', file: '' }]);
  };

  const handleTsaSongChange = (updatedSong) => {
    setTsaSong(updatedSong);
  };

  const handleAddAnnouncement = () => {
    setAnnouncements([...announcements, { id: Math.random().toString(36).substring(2, 32), title: '', image: '' }]);
  };

  const handleSubmit = async () => {
    try {
        setStatusMessage('Loading please wait...');

        const noTitleHandler = choirSongs.some((value)=>!value?.title)|| dancingStarsSongs.some((value)=>!value?.title)|| songs.some((value)=>!value?.title) || !tsaSong?.title;

        if (noTitleHandler) {
            setStatusMessage('Please provide title to all the boxes');
            return
        }
      // Upload all songs
      const uploadSongs = songs.map(song => firestoreService.addSong(song));
      const uploadChoirSongs = choirSongs.map(song => firestoreService.addSong(song));
      const uploadDancingStarsSongs = dancingStarsSongs.map(song => firestoreService.addSong(song));
      const uploadTsaSong = firestoreService.addSong(tsaSong);

      // Wait for all uploads to complete
      const [songResults, choirSongResults, dancingStarsSongResults, tsaSongResult] = await Promise.all([
        Promise.all(uploadSongs),
        Promise.all(uploadChoirSongs),
        Promise.all(uploadDancingStarsSongs),
        uploadTsaSong
      ]);

      // Prepare plannerData with uploaded songs
      const plannerData = {
        opener,
        songs: songResults.map(result => result.song),
        choirSongs: choirSongResults.map(result => result.song),
        dancingStarsSongs: dancingStarsSongResults.map(result => result.song),
        tsaSong: tsaSongResult.song,
        announcements,
      };

      // Save planner data
      const plannerDataResult = await firestoreService.addPlannerData(plannerData);

      if (plannerDataResult.success) {
        console.log('Planner data saved successfully');
        setStatusMessage('Planner data saved successfully');
        resetData();
      } else {
        console.error(plannerDataResult.message);
        setStatusMessage(plannerDataResult.message);
      }
    } catch (error) {
      console.error('Error during submission:', error);
      setStatusMessage(`Error during submission: ${error}`);
    }
  };

  // Reset form data
  const resetData = () => {
    setSongs([]);
    setOpener('');
    setChoirSongs([]);
    setDancingStarsSongs([]);
    setTsaSong(null);
    setAnnouncements([]);
  };

  const handleOpenerChange = (event) => {
    setOpener(event.target.value);
  };

  return (
    <div className="plannerContainer">
      <h1 className="header">Church Planner</h1>
        <div className="openerSection">
        <h2>Prayer</h2>
        <select
          value={opener}
          onChange={handleOpenerChange}
          className="select-input"
        >
          <option value="" disabled>Select an opener</option>
          {regularOpeners.map((opener, index) => (
            <option key={index} value={opener}>{opener}</option>
          ))}
        </select>
      </div>

      <div className="songsSection">
        <h2>Praise and Worship</h2>
        {songs.map((song, index) => (
          <div key={song.id} className="songInputContainer">
            <strong>{index+1}</strong>
            <input
              type="text"
              placeholder="Song Title"
              value={song?.title}
              onChange={(e) => handleSongChange(song.id, { ...song, title: e.target.value }, 'songs')}
              className="input"
            />
            <ResultsContainer filename={song?.title}/>

            <details>
              <summary>
                Lyrcis and file
              </summary>
              <article>
                <textarea
                  placeholder="Lyrics"
                  value={song.lyrics}
                  onChange={(e) => handleSongChange(song.id, { ...song, lyrics: e.target.value }, 'songs')}
                  className="textarea"
                />
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => handleSongChange(song.id, { ...song, file: e.target.files[0] }, 'songs')}
                  className="fileInput"
                />
            </article>
            </details>
          </div>
        ))}
        <button onClick={handleAddSong}>Add New Song</button>
      </div>

      <div className="songsSection">
        <h2>Choir Songs</h2>
        {choirSongs.map((song) => (
          <div key={song.id} className="songInputContainer">
            <input
              type="text"
              placeholder="Song Title"
              value={song?.title}
              onChange={(e) => handleSongChange(song.id, { ...song, title: e.target.value }, 'choirSongs')}
              className="input"
            />
            <ResultsContainer filename={song?.title}/>
            <details>
              <summary>
                Lyrcis and file
              </summary>
              <article>
                  <textarea
                  placeholder="Lyrics"
                  value={song.lyrics}
                  onChange={(e) => handleSongChange(song.id, { ...song, lyrics: e.target.value }, 'choirSongs')}
                  className="textarea"
                />
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => handleSongChange(song.id, { ...song, file: e.target.files[0] }, 'choirSongs')}
                  className="fileInput"
                />
              </article>
            </details>
          </div>
        ))}
        <button onClick={handleAddChoirSong}>Add New Choir Song</button>
      </div>

      <div className="songsSection">
        <h2>Dancing Stars</h2>
        {dancingStarsSongs.map((song) => (
          <div key={song.id} className="songInputContainer">
            <input
              type="text"
              placeholder="Song Title"
              value={song?.title}
              onChange={(e) => handleSongChange(song.id, { ...song, title: e.target.value }, 'dancingStarsSongs')}
              className="input"
            />
            <ResultsContainer filename={song?.title}/>
            {/* <textarea
              placeholder="Lyrics"
              value={song.lyrics}
              onChange={(e) => handleSongChange(song.id, { ...song, lyrics: e.target.value }, 'dancingStarsSongs')}
              className="textarea"
            /> */}
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => handleSongChange(song.id, { ...song, file: e.target.files[0] }, 'dancingStarsSongs')}
              className="fileInput"
            />
          </div>
        ))}
        <button onClick={handleAddDancingStarSong}>Add New Dancing Star Song</button>
      </div>

      <div className="songsSection">
        <h2>TSA Songs</h2>
        <div className="songInputContainer">
          <input
            type="text"
            placeholder="Song Title"
            value={tsaSong?.title}
            onChange={(e) => handleTsaSongChange({ ...tsaSong, title: e.target.value })}
            className="input"
          />
          <ResultsContainer filename={tsaSong?.title}/>
          <textarea
            placeholder="Lyrics"
            value={tsaSong.lyrics}
            onChange={(e) => handleTsaSongChange({ ...tsaSong, lyrics: e.target.value })}
            className="textarea"
          />
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => handleTsaSongChange({ ...tsaSong, file: e.target.files[0] })}
            className="fileInput"
          />
        </div>
      </div>

      <div className="announcementSection">
        <h2>Announcements</h2>
        {announcements.map((announcement) => (
          <div key={announcement.id} className="announcementInputContainer">
            <input
              type="text"
              placeholder="Announcement Title"
              value={announcement?.title}
              onChange={(e) => setAnnouncements(announcements.map(a => a.id === announcement.id ? { ...announcement, title: e.target.value } : a))}
              className="input"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAnnouncements(announcements.map(a => a.id === announcement.id ? { ...announcement, image: e.target.files[0] } : a))}
              className="fileInput"
            />
          </div>
        ))}
        <button onClick={handleAddAnnouncement}>Add New Announcement</button>
      </div>
      <h2></h2>
      <h3><i className="fa fa-info-circle" aria-hidden="true"></i> {statusMessage}</h3>
      <button className="submitBtn" onClick={() => setPreviewVisible(true)}>
        Preview
      </button>
      <button className="submitBtn" onClick={handleSubmit}>
        Submit
      </button>
      

      {/* Conditional rendering of the preview modal */}
      {previewVisible && (
        <ChurchPlannerPreviewPage 
          data={{ opener, songs, choirSongs, dancingStarsSongs, tsaSong, announcements }} 
          onClose={() => setPreviewVisible(false)} 
        />
      )}
    </div>
  );
};

export default ChurchPlanner;
