import React, { useState } from 'react';
import styles from './styles/AnnouncementInput.css';

const AnnouncementInput = ({ announcement, onChange }) => {
  const [title, setTitle] = useState(announcement.title || '');
  const [image, setImage] = useState(announcement.image || null);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleImageChange = (e) => setImage(e.target.files[0]);

  const handleAddAnnouncement = () => {
    if (title && image) {
      onChange({ title, image });
    } else {
      alert('Please enter a title and select an image.');
    }
  };

  return (
    <div className={styles.announcementInputContainer}>
      <input
        type="text"
        placeholder="Announcement Title"
        value={title}
        onChange={handleTitleChange}
        className={styles.input}
      />
      <input
        type="file"
        onChange={handleImageChange}
        className={styles.fileInput}
      />
      <button onClick={handleAddAnnouncement} className={styles.addButton}>
        Add Announcement
      </button>
    </div>
  );
};

export default AnnouncementInput;
