import React, { useState } from 'react';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import './styles/AudioZipGenerator.css'; // Import your CSS file

const generateAudioZip = async (audioList, setStatusFeedBack) => {
  const zip = new JSZip();
  const totalFiles = audioList?.length || 0;

  if (totalFiles === 0) {
    setStatusFeedBack('No audio files selected for download.');
    return; // Prevent proceeding if no files are selected
  }

  // Helper to update feedback
  const updateStatus = (message) => {
    if (setStatusFeedBack) setStatusFeedBack(message);
  };

  let progress = 0;

  for (const { audioUrl, title } of audioList) {
    try {
      updateStatus(`Fetching audio file: ${title}.mp3`);

      const response = await fetch(audioUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${title}.mp3`);
      }

      updateStatus(`Converting ${title}.mp3 to blob`);
      const audioBlob = await response.blob();
      zip.file(`${title}.mp3`, audioBlob);

      progress += 1;
      const progressPercentage = Math.round((progress / totalFiles) * 100);
      updateStatus(`Progress: ${progressPercentage}% (${progress} of ${totalFiles} files added)`);

    } catch (error) {
      console.error(`Error fetching audio file from ${audioUrl}:`, error);
      updateStatus(`Error fetching ${title}.mp3`);
    }
  }

  if (progress === 0) {
    updateStatus('No files were added to the ZIP. Please check your selections.');
    return; // Prevent saving if no files were added
  }

  updateStatus('Generating final zip file...');
  const content = await zip.generateAsync({ type: 'blob' });

  updateStatus('Saving zip file...');
  FileSaver.saveAs(content, 'audio-files.zip');

  updateStatus('Audio zip generation complete!');
};

const AudioZipGenerator = ({ audioList, handleRemove }) => {
  const [statusFeedBack, setStatusFeedBack] = useState('');

  const handleDownload = () => {
    generateAudioZip(audioList, setStatusFeedBack);
  };

  return (
    <div className="audio-zip-container">
      <h2 className="audio-zip-title">Download All Files:</h2>
      <details>
        <summary>Selected songs: {audioList?.length}</summary>
        <article>
          <ul className="audio-list">
            {audioList?.map((song, index) => (
              <li key={index} className="audio-item">
                <span className="audio-title">{song.title}</span>
                <button 
                  className="remove-button" 
                  onClick={() => handleRemove(song)}
                  aria-label={`Remove ${song.title}`}>
                  <i className="fa fa-trash"></i>
                </button>
              </li>
            ))}
          </ul>
        </article>
      </details>
      <div className="status-feedback">
        {statusFeedBack}
      </div>
      <button className="download-button" onClick={handleDownload}>
        <i className="fa fa-folder-open" aria-hidden="true"></i> Download ZIP
      </button>
    </div>
  );
};

export default AudioZipGenerator;
