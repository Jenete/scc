import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllSessions } from '../../controllers/SessionTrackerController';
import './styles/sessionDetails.css'; // Import your custom CSS

const SessionDetails = () => {
  const { id } = useParams();
  const [session, setSession] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSession = async () => {
      try {
        setError('');
        const sessionData = await getAllSessions();
        const sessionx = sessionData?.find((s) => s.id === id);
        if (sessionx) {
          setSession(sessionx);
        } else {
          setError('Session not found');
        }
      } catch (err) {
        setError('Failed to load session data');
      }
    };

    fetchSession();
  }, [id]);

  return (
    <div className="session-details-container">
      {error && <p className="session-details-error">{error}</p>}
      {session ? (
        <>
          <h2 className="session-details-title">{session.details}</h2>
          <div className="session-details-info">
            <p>
              <strong>Teacher:</strong> {session.teacher}
            </p>
            <p>
              <strong>Area:</strong> {session.area}
            </p>
            <p>
              <strong>Date:</strong> {new Date(session.date).toLocaleDateString()}
            </p>
          </div>
        </>
      ) : (
        <p className="session-details-not-found">Session not found</p>
      )}
    </div>
  );
};

export default SessionDetails;
