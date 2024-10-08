import React, { useState } from 'react';
import AudioZipGenerator from '../../helpers/UIHelpers/AudioZipGenerator';
import "./styles/SongList.css"

const SongList = ({ songs, searchTerm, handleAction }) => {
  const [selectedSongs, setSelectedSongs] = useState([]);

  const handleSelectSong = (song) => {
    setSelectedSongs((prevSelected) =>
      selectedSongs.some((songx) => song.id === songx.id)
        ? prevSelected.filter((songx) => songx.id !== song.id)
        : [...prevSelected, song]
    );
  };

  const filteredSongs = songs.filter((song) =>
    searchTerm?.length > 3 ? song.title.toLowerCase().includes(searchTerm.toLowerCase()) : true
  );

  const handleRemove = (song) => {
    const updatedSongs = selectedSongs.filter(
      (selectedSong) => selectedSong.id !== song.id
    );
    setSelectedSongs(updatedSongs);
  };

  const handleDeleteSelected = () => {
    setSelectedSongs([]);
    // TODO: Update Firestore with `updatedSongs`
  };

  return (
    <div className="song-list-container">
      {selectedSongs?.length > 1 && (
        <div className="song-list-actions">
          <button
            className="delete-button"
            onClick={handleDeleteSelected}
            disabled={selectedSongs.length === 0}
          >
            Delete Selected
          </button>
          <AudioZipGenerator
            audioList={selectedSongs}
            handleRemove={handleRemove}
            handleAction={handleAction}
          />
        </div>
      )}
      <ul className="all-songs-displayer">
        {filteredSongs.map((song, index) => (
          <li key={song.id} className="song-displayer">
            <input
              type="checkbox"
              className="song-checkbox"
              checked={selectedSongs.some((songx) => song.id === songx.id)}
              onChange={() => handleSelectSong(song)}
            />
            <h2 className="song-title">{`${index + 1}. ${song.title}`}</h2>
            <details className="song-details">
              <summary>More Info</summary>
              <article>
                <audio controls src={song.audioUrl}></audio>
                <textarea defaultValue={song.lyrics} className="song-lyrics"></textarea>
              </article>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongList;
