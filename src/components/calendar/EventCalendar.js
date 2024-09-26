// EventCalendar.js
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './styles/eventCalendar.css'; // Custom styles
import { getAllSessions} from '../../controllers/SessionTrackerController';
import { getAllMembers } from '../../controllers/MemberControllerMock';
import { Link } from 'react-router-dom';
import { getAge } from '../../helpers/utils';

const EventCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventDetails, setEventDetails] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState('');
  const [members, setMembers] = useState([]);

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
        setError('');
        const membersData = await getAllMembers();
        if(membersData) setMembers(membersData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchSessions();
    fetchMembers();
  }, []);

  // Function to get events for a selected date
  const handleDateChange = (date) => {
    setSelectedDate(date);
    try {
        const events = getEventsForDate(date);
        if(events)setEventDetails(events);
    } catch (error) {
        
    }
    
  };
    // Utility function to format date as YYYY-MM-DD
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
  // Function to filter sessions or birthdays on a specific date
  const getEventsForDate = (date) => {
    const formattedDate = formatDate(date); // Format input date to YYYY-MM-DD
    const monthDayFormat = formatDate(date).slice(5, 10); // Get MM-DD format
    
    const sessionEvents = sessions.filter(
      (session) => session.date === formattedDate
    );

    const birthdayEvents = members.filter((member) => {
        if (!member.birthday) return false;
    
        const birthdayThisYear = new Date(member.birthday);
        birthdayThisYear.setFullYear(date.getFullYear()); // Set the year to match the input date's year
    
        const memberBirthday = formatDate(birthdayThisYear).slice(5, 10); // Get MM-DD format
    
        return memberBirthday === monthDayFormat; // Check month and day
      });

    return [...sessionEvents, ...birthdayEvents];
  };


  const calculateAge = (birthday) =>{
    try {
      const age = getAge(birthday);
      return age;
    } catch (error) {
      console.error(error);
      return birthday;
    }
  }
  return (
    <div className="event-calendar-container">
      <h2>Event/Session Calendar</h2>
      {error}
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileClassName={({ date, view }) => view === 'month' && getEventsForDate(date).length > 0 ? 'event-day' : null}
      />

      <div className="event-details">
        <h3>Events on {selectedDate.toDateString()}:</h3>
        {eventDetails.length > 0 ? (
          <ul>
            {eventDetails.map((event, index) => (
              <li key={index}>
                {event.details ? (
                  <span>
                    Session: <strong>{event.details}</strong> with {event.teacher} at {event.area}.
                    <Link to={`/session/${event.id}`}>View Details</Link>
                  </span>
                ) : (
                  <span>
                    {event.fullname? <div><i className="fa fa-birthday-cake" aria-hidden="true"></i> Birthday: <strong>{event.fullname}</strong> ({calculateAge(event.birthday)} years)</div>: <strong>{event.details}</strong>}
                  </span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No events for this day.</p>
        )}
      </div>
    </div>
  );
};

export default EventCalendar;
