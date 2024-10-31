import React, { useState, useEffect } from 'react';
import { getAllMembers } from '../../controllers/MemberControllerMock';
import { getAllSessions } from '../../controllers/SessionTrackerController';
import { getAllBacentas } from '../../services/BacentaService';
import InsightsComponent from './InsightsComponent';

const InsightsView = () => {
    const [sessions, setSessions] = useState([]);
  const [members, setMembers] = useState([]);
  const [bacentas, setBacentas] = useState([]);
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

    const fetchBacentas = async () => {
      try {
        const bacentaData = await getAllBacentas();
        if(bacentaData) setBacentas(bacentaData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchSessions();
    fetchMembers();
    fetchBacentas();
  }, []);
  return (
    <div>
      {members && sessions && bacentas &&<InsightsComponent members={members} sessions={sessions} bacentas={bacentas}/>}
    </div>
  )
}

export default InsightsView
