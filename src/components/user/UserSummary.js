import React, { useState, useEffect } from 'react';
import './styles/UserSummary.css';
import { 
  getAttendanceStats, 
  getPrayerHoursStats, 
  getBirthdayStats, 
  getTeacherEngagementStats, 
  getSessionTopicsStats,
} from '../../controllers/InsightsController';
import { getAllSessions } from '../../controllers/SessionTrackerController';
import { checkDateStatus } from '../../helpers/utils';

const UserSummary = ({ member }) => {
  const [attendanceStats, setAttendanceStats] = useState([]);
  const [prayerHoursStats, setPrayerHoursStats] = useState([]);
  const [birthdayStats, setBirthdayStats] = useState([]);
  const [teacherEngagementStats, setTeacherEngagementStats] = useState([]);
  const [sessionTopicsStats, setSessionTopicsStats] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState(null);

  // Fetch sessions when component mounts
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const sessionsData = await getAllSessions();
        if (sessionsData && member) {
          const memberSessions = sessionsData.filter(session => 
            session.membersPresent.includes(member.id)
          );
          setSessions(memberSessions);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchSessions();
  }, [member]);

  // Update stats when member or sessions change
  useEffect(() => {
    if (member && sessions.length > 0) {
      setAttendanceStats(getAttendanceStats([member], sessions));
      setPrayerHoursStats(getPrayerHoursStats([member]));
      setBirthdayStats(getBirthdayStats([member]));
      setTeacherEngagementStats(getTeacherEngagementStats(sessions));
      setSessionTopicsStats(getSessionTopicsStats(sessions));
    }
  }, [member, sessions]);

  // Error handling UI
  if (error) {
    return <div className="user-summary__error">Error: {error}</div>;
  }

  return (
    <div className="user-summary__container">
      <h1 className="user-summary__title">{member.fullname}</h1>
      <ul className="user-summary__stats-list">

        {prayerHoursStats.map((stat, index) => (
          <li key={index} className="user-summary__stat">
            <strong>Prayer Hours:</strong> {stat.prayerHours} hours
          </li>
        ))}

        {birthdayStats.map((stat, index) => (
          <li key={index} className="user-summary__stat">
            <strong>Birthday:</strong> {new Date(stat.birthday).toLocaleDateString()}
          </li>
        ))}

        <li className="user-summary__sessions-header"><strong>Your sessions:
        {attendanceStats.sort().map((stat, index) => (
          <li key={index} className={`user-summary__stat ${stat.totalSessions === 0 ? 'user-summary__stat--bad' : ''}`}>
             {stat.totalSessions} sessions
          </li>
        ))}
          
          </strong></li>
        {sessionTopicsStats.map((stat, index) => (
          <li key={index} className={`user-summary__session date-status-highlight date-status-highlight-${checkDateStatus(stat?.date)}`}>
            <strong>"{stat.topic}"</strong> with
            <strong> {stat.teacher}</strong> <span>{stat.date} - {stat.area}</span>
          </li>
        ))}

        {teacherEngagementStats.some(({ teacher }) => member.fullname === teacher) && 
          teacherEngagementStats.map((stat, index) => (
            <li key={index} className="user-summary__stat">
              {stat.teacher}: Led {stat.sessionCount} sessions
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default UserSummary;
