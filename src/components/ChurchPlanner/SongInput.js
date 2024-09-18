import React from 'react';
import styles from './styles/SongInput.css';

const SongInput = ({ id, song, onChange }) => {
  const handleTitleChange = (e) => {
    onChange(id, { ...song, title: e.target.value });
  };

  const handleLyricsChange = (e) => {
    onChange(id, { ...song, lyrics: e.target.value });
  };

  const handleFileChange = (e) => {
    onChange(id, { ...song, file: e.target.files[0] });
  };

  return (
    <div className={styles.songInputContainer}>
      <input
        type="text"
        placeholder="Song Title"
        value={song.title}
        onChange={handleTitleChange}
        className={styles.input}
      />
      <textarea
        placeholder="Lyrics"
        value={song.lyrics}
        onChange={handleLyricsChange}
        className={styles.textarea}
      />
      <input
        type="file"
        onChange={handleFileChange}
        className={styles.fileInput}
      />
    </div>
  );
};

export default SongInput;
