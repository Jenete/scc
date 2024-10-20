import React, { useEffect, useState } from 'react';
import FirestoreService from '../services/FirebaseConfig.js';
import './styles/ContentViewer.css';
import MessagePage from './MessagePage';
import FileUploadForm from './FileUploadForm.js';
import SongList from './songs/SongList';

const ContentViewer = () => {
  const [songs, setSongs] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [links, setLinks] = useState([]);
  const [fileToLoad, setFileToLoad] = useState('upload');
  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageType, setMessageType] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAction = (message, messageType, seconds) => {
    setMessageText(message);
    setMessageType(messageType);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, seconds || 3000);
  };

  const firestoreService = new FirestoreService('scc');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        if (fileToLoad === 'songs') {
          const fetchedSongs = await firestoreService.getAll('songs');
          setSongs(fetchedSongs?.map((song, index) => ({ ...song, position: index })));
        } else if (fileToLoad === 'documents') {
          const fetchedDocuments = await firestoreService.getAll('documents');
          setDocuments(fetchedDocuments);
        } else if (fileToLoad === 'links') {
          const fetchedLinks = await firestoreService.getAll('links');
          setLinks(fetchedLinks);
        }
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    fetchContent();
  }, [fileToLoad]);

  const handlePromote = (index) => {
    const updatedSongs = [...songs];
    const promotedSong = updatedSongs.splice(index, 1)[0];
    updatedSongs.unshift(promotedSong);
    setSongs(updatedSongs);
  };

  const handleSave = async (song, index) => {
    const updatedSong = { ...song, position: index };
    handleAction("Updating song details", 3);
    await firestoreService.update(song.id, updatedSong);
    handleAction("Updated song details successfully", 1, 5000);
  };

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    });
  };

  const renderContent = () => {
    switch (fileToLoad) {
      case 'songs':
        return (
          <div className="all-songs-displayer">
            <input 
                type="text" 
                placeholder="Search songs..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            <SongList songs={songs} searchTerm={searchTerm} handleAction={handleAction} />
          </div>
        );
      case 'documents':
        return (
          <ul>
            {documents.map((document, index) => (
              <li key={document.id}>
                <a href={document.fileUrl} target="_blank" rel="noopener noreferrer">
                  <strong>{`${index + 1}. `} {document.title}</strong>
                </a>
                <iframe
                  className="item-preview-iframe"
                  width="200px"
                  height="200px"
                  src={document.fileUrl}
                  title="item-preview-iframe"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
                <a href={document.fileUrl} target="_blank" rel="noopener noreferrer">
                  📩 Open
                </a>
              </li>
            ))}
          </ul>
        );
      case 'links':
        return (
          <ul>
            {links.map((link, index) => (
              <li key={link.id}>
                <strong>{`${index + 1}. `} {link.title}</strong>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  Open Link
                </a>
              </li>
            ))}
          </ul>
        );
      case 'upload':
        return (
          <FileUploadForm />
        );
      default:
        return <p>No content available.</p>;
    }
  };

  return (
    <div className="content-viewer">
      <div className="tab-bar">
      <span
          onClick={() => setFileToLoad('upload')}
          className={`tab-pill ${fileToLoad === 'upload' ? 'active-pill' : ''}`}
        >
          Upload
        </span>
        <span
          onClick={() => setFileToLoad('songs')}
          className={`tab-pill ${fileToLoad === 'songs' ? 'active-pill' : ''}`}
        >
          Songs & Lyrics
        </span>
        <span
          onClick={() => setFileToLoad('documents')}
          className={`tab-pill ${fileToLoad === 'documents' ? 'active-pill' : ''}`}
        >
          Documents
        </span>
        <span
          onClick={() => setFileToLoad('links')}
          className={`tab-pill ${fileToLoad === 'links' ? 'active-pill' : ''}`}
        >
          Links
        </span>
        
      </div>
      <h2>Content List</h2>
      {showMessage && <MessagePage messageText={messageText} messageType={messageType} />}
      {renderContent()}
    </div>
  );
};

export default ContentViewer;
