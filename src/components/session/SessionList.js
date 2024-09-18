import React, { useState, useEffect } from 'react';
import { getAllSessions } from '../../controllers/SessionTrackerController';
import './styles/sessionList.css';

const SessionList = () => {
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const sessionsData = await getAllSessions();
        setSessions(sessionsData);
        setFilteredSessions(sessionsData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchSessions();
  }, []);

  useEffect(() => {
    const filterSessions = () => {
      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered = sessions.filter(session =>
        session.teacher.toLowerCase().includes(lowercasedTerm)
      );
      setFilteredSessions(filtered);
    };

    filterSessions();
  }, [searchTerm, sessions]);

  return (
    <div className="sessionListTableContainer">
      <h3 className="sessionListTitle">Session List</h3>
      {error && <p className="sessionListError">{error}</p>}
      <input
        type="text"
        className="sessionListSearchInput"
        placeholder="Search by Teacher"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="sessionListTable">
        <thead>
          <tr>
            <th>Date</th>
            <th>Area</th>
            <th>Details</th>
            <th>Teacher</th>
            <th>Total Attended</th>
          </tr>
        </thead>
        <tbody>
          {filteredSessions.map(session => (
            <tr key={session.id}>
              <td>{session.date}</td>
              <td>{session.area}</td>
              <td>{session.details}</td>
              <td>{session.teacher}</td>
              <td>{session.membersPresent.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SessionList;
