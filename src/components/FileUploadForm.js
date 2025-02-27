import React, { useState } from 'react';
import FirestoreService from '../services/FirebaseConfig.js';
import './styles/FileUploadForm.css';
import MessagePage from './MessagePage.js';
import ResultsContainer from './ChurchPlanner/ResultsContainer.js';

const FileUploadForm = () => {
  const [title, setTitle] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [file, setFile] = useState(null);
  const [link, setLink] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const uploadTypes = { SONG: '1', LINK: '2', DOCX: '3' };
  const [uploadType, setUploadType] = useState(uploadTypes.SONG);
  const firestoreService = new FirestoreService('scc');

  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageType, setMessageType] = useState(0);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleAction = (message, messageType, seconds) => {
    setMessageText(message);
    setMessageType(messageType);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, seconds || 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setMessage('Uploading 20%');
    handleAction("Uploading...", 3, 3000);

    try {
      if (file) {
        if (uploadType === uploadTypes.SONG) {
          setMessage('Uploading 30%');
          await firestoreService.addSong({ title, lyrics, file });
          setMessage('Uploading 80%');
        } else {
          await firestoreService.addDocument(title, file);
        }
      } else if (link) {
        await firestoreService.addLink(title, link);
      } else {
        setError('Please upload a file or enter a link');
        handleAction("Please upload a file or enter a link", 2, 3000);
        setMessage('');
        return;
      }

      setMessage('Uploading 100%');
      resetForm();
      handleAction("Uploaded successfully!", 1, 5000);
    } catch (error) {
      handleAction("An error occurred during upload", 2, 5000);
      setError('An error occurred during upload');
      console.error('Upload error:', error);
    }
  };

  const resetForm = () => {
    setTitle('');
    setLyrics('');
    setFile(null);
    setLink('');
  };

  return (
    <div className="file-upload-form">
      <h3>Upload Content</h3>
      {showMessage && <MessagePage messageText={messageText} messageType={messageType} />}
      
      <p className="upload-type-form">
        <select
          onChange={(e) => setUploadType(e.target.value)}
          className="upload-type-select"
        >
          <option value={uploadTypes.SONG}>Songs & Lyrics</option>
          <option value={uploadTypes.LINK}>Links</option>
          <option value={uploadTypes.DOCX}>Documents</option>
        </select>
      </p>

      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="text-input"
        />
      {uploadType === uploadTypes.SONG && title?.length> 3 && <ResultsContainer filename={title}/>}
      </div>

      {uploadType !== uploadTypes.LINK && (
        <div className="form-group">
          {/* <label>Upload File (MP3, PDF, etc.)</label> */}
          <input
            type="file"
            accept=".pdf,image/*,audio/*"
            onChange={handleFileChange}
            className="file-input"
          />
        </div>
      )}

      {uploadType === uploadTypes.SONG && (
        <div className="form-group">
          <label>Lyrics (for songs)</label>
          <textarea
            value={lyrics}
            onChange={(e) => setLyrics(e.target.value)}
            className="lyrics-textarea"
          ></textarea>
        </div>
      )}

      {uploadType === uploadTypes.LINK && (
        <div className="form-group">
          <label>Or Enter a Link</label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="text-input"
          />
        </div>
      )}

      {message && <div className="status-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}

      <button type="submit" className="upload-button" onClick={handleSubmit}>
        Upload
      </button>
    </div>
  );
};

export default FileUploadForm;
