import React, { useEffect, useState } from 'react';
import FirestoreService from '../services/FirebaseConfig.js';
import './styles/ContentViewer.css';
import MessagePage from './MessagePage'
import FileUploadForm from './FileUploadForm.js';

const ContentViewer = () => {
  const [songs, setSongs] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [links, setLinks] = useState([]);
  const [fileToLoad, setFileToLoad] = useState('songs');
  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageType, setMessageType] = useState(0);

    // Function to handle some action that triggers the message display
  const handleAction = (message, messageType, seconds) => {
        // Set the message text and type based on your logic
        setMessageText(message);
        setMessageType(messageType); // For example, setting it to SUCCESS
        
        // Show the message
        setShowMessage(true);

        // Optionally, hide the message after some time
        setTimeout(() => {
            setShowMessage(false);
        }, seconds || 3000); // Hide after 5 seconds (adjust as needed)
    };

  const firestoreService = new FirestoreService('scc');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        if (fileToLoad === 'songs') {
          const fetchedSongs = await firestoreService.getAll('songs');
          setSongs(
            fetchedSongs?.map((song, index) => ({
              ...song,
              position: index,
            }))
          );
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
    //console.log("Updating song "+ JSON.stringify(updatedSong));
    handleAction("Updating song details", 3);
    await firestoreService.update(song.id, updatedSong);
    handleAction("Updated song details successfully", 1,5000);
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
          <ul className="all-songs-displayer">
            {songs.map((song, index) => (
              <li key={song.id} className="song-displayer">
                <h2>{`${index+1}. `} {song.title}</h2>
                <audio controls src={song.audioUrl}></audio>
                <textarea onChange={(e)=>{
                    songs[index] = {...songs[index],lyrics: e.target.value};
                    song = {...songs[index]};
                    console.log(songs[index]);
                }}>{song?.lyrics?.substring(0, 80)}</textarea>
                <div className='action-buttons'>
                    <button onClick={() => handlePromote(index)}>⬆️ Promote</button>
                    <button onClick={() => handleSave(song, index)}>Save</button>
                    <button onClick={() => handleCopyToClipboard(song.lyrics)}>Copy Lyrics</button>
                </div>
              </li>
            ))}
          </ul>
        );
      case 'documents':
        return (
          <ul>
            {documents.map((document, index) => (
              <li key={document.id}>
                
                <a href={document.fileUrl} target="_blank" rel="noopener noreferrer">
                <strong>{`${index+1}. `} {document.title}</strong>
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
            {links.map((link,index) => (
              <li key={link.id}>
                <strong>{`${index+1}. `} {link.title}</strong>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  Open Link
                </a>
              </li>
            ))}
          </ul>
        );
      default:
        return <p>No content available.</p>;
    }
  };

  return (
    <div className="content-viewer">
      <details>
        <summary><i className="fa fa-upload" aria-hidden="true"></i> Upload new files</summary>
        <article>
          <FileUploadForm/>
        </article>
      </details>
      <hr></hr>
      <div className="tab-bar">
        <span
          onClick={() => setFileToLoad('documents')}
          className={`tab-pill ${fileToLoad === 'documents' ? 'active-pill' : ''}`}
        >
          Documents
        </span>
        <span
          onClick={() => setFileToLoad('songs')}
          className={`tab-pill ${fileToLoad === 'songs' ? 'active-pill' : ''}`}
        >
          Songs & Lyrics
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
