import React, { useState, useEffect } from 'react';
import { getAllMembers } from '../../controllers/MemberControllerMock';
import { getAllSessions, addSession, updateSession, removeSession } from '../../controllers/SessionTrackerController';
import './styles/sessionTracker.css';

const SessionTracker = () => {
  const [sessions, setSessions] = useState([]);
  const [members, setMembers] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [formData, setFormData] = useState({
    date: '',
    area: '',
    details: '',
    teacher: '',
    membersPresent: []
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const sessionsData = await getAllSessions();
        setSessions(sessionsData);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchMembers = async () => {
      try {
        const membersData = await getAllMembers();
        setMembers(membersData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchSessions();
    fetchMembers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMemberChange = (memberId) => {
    setFormData((prev) => {
      const newMembersPresent = prev.membersPresent.includes(memberId)
        ? prev.membersPresent.filter(id => id !== memberId)
        : [...prev.membersPresent, memberId];
      return { ...prev, membersPresent: newMembersPresent };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentSession) {
        await updateSession({ ...formData, id: currentSession.id });
      } else {
        await addSession(formData);
      }
      setFormData({
        date: '',
        area: '',
        details: '',
        teacher: '',
        membersPresent: []
      });
      setCurrentSession(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditSession = (session) => {
    setCurrentSession(session);
    setFormData({
      date: session.date,
      area: session.area,
      details: session.details,
      teacher: session.teacher,
      membersPresent: session.membersPresent
    });
  };

  const handleDeleteSession = async (sessionId) => {
    try {
      await removeSession(sessionId);
      setSessions(sessions.filter(s => s.id !== sessionId));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="sessionTrackerContainer">
      <h2 className="sessionTrackerTitle">Session Tracker</h2>
      {error && <p className="sessionTrackerError">{error}</p>}
      <details>
        <summary> Record new session</summary>
        <article>
        <form onSubmit={handleSubmit} className="sessionTrackerForm">
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="sessionTrackerInput"
          />
        </label>
        <label>
          Area:
          <input
            type="text"
            name="area"
            value={formData.area}
            onChange={handleInputChange}
            className="sessionTrackerInput"
          />
        </label>
        <label>
          Details:
          <textarea
            name="details"
            value={formData.details}
            onChange={handleInputChange}
            className="sessionTrackerTextarea"
          />
        </label>
        <label>
          Teacher:
          <input
            type="text"
            name="teacher"
            value={formData.teacher}
            onChange={handleInputChange}
            className="sessionTrackerInput"
          />
        </label>
        <fieldset className="sessionTrackerMembersFieldset">
          <legend>Members Present</legend>
          {members.map(member => (
            <label key={member.id} className="sessionTrackerMemberLabel">
              <input
                type="checkbox"
                checked={formData.membersPresent.includes(member.id)}
                onChange={() => handleMemberChange(member.id)}
                className="sessionTrackerCheckbox"
              />
              {member.fullname}
            </label>
          ))}
        </fieldset>
        <button type="submit" className="sessionTrackerButton">
          {currentSession ? 'Update Session' : 'Add Session'}
        </button>
      </form>
        </article>
      </details>
      <div className="sessionTrackerList">
        <h3 className="sessionTrackerListTitle">Sessions</h3>
        <table className="sessionTrackerTable">
          <thead>
            <tr>
              <th>Date</th>
              <th>Area</th>
              <th>Details</th>
              <th>Teacher</th>
              <th>Total Attended</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map(session => (
              <tr key={session.id}>
                <td>{session.date}</td>
                <td>{session.area}</td>
                <td>{session.details}</td>
                <td>{session.teacher}</td>
                <td>{session.membersPresent.length}</td>
                <td>
                  <button
                    className="sessionTrackerButton"
                    onClick={() => handleEditSession(session)}
                  >
                    Edit
                  </button>
                  <button
                    className="sessionTrackerButton sessionTrackerDeleteButton"
                    onClick={() => handleDeleteSession(session.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SessionTracker;
