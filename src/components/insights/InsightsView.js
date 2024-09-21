import React, { useState, useEffect } from 'react';
import { getAllMembers } from '../../controllers/MemberControllerMock';
import { getAllSessions } from '../../controllers/SessionTrackerController';
import InsightsComponent from './InsightsComponent';

const InsightsView = () => {
    const [sessions, setSessions] = useState([]);
  const [members, setMembers] = useState([]);
  const [error, setError] = useState('');
   // Create a reference to the details element


  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const sessionsData = await getAllSessions();
        if(sessionsData)setSessions(sessionsData);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchMembers = async () => {
      try {
        const membersData = await getAllMembers();
        if(membersData) setMembers(membersData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchSessions();
    fetchMembers();
  }, []);
  return (
    <div>
      {members && sessions && <InsightsComponent members={members} sessions={sessions}/>}
    </div>
  )
}

export default InsightsView
