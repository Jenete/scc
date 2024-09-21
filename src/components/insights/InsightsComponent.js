// InsightsComponent.js
import React, { useState, useEffect, useRef } from 'react';
import { 
  getAttendanceStats, 
  getPrayerHoursStats, 
  getBirthdayStats, 
  getTeacherEngagementStats, 
  getSessionTopicsStats 
} from '../../controllers/InsightsController';
import './styles/insightsComponent.css';
import BarChartComponent from '../charts/BarChartComponent';
import PieChartComponent from '../charts/PieChartComponent';

const InsightsComponent = ({ members, sessions }) => {
  const [attendanceStats, setAttendanceStats] = useState([]);
  const [prayerHoursStats, setPrayerHoursStats] = useState([]);
  const [birthdayStats, setBirthdayStats] = useState([]);
  const [teacherEngagementStats, setTeacherEngagementStats] = useState([]);
  const [sessionTopicsStats, setSessionTopicsStats] = useState([]);
  const detailsRef = useRef(null);

  useEffect(() => {
    setAttendanceStats(getAttendanceStats(members, sessions)?.sort((a,b)=> b.totalSessions-a.totalSessions));
    setPrayerHoursStats(getPrayerHoursStats(members)?.sort((a,b)=> b.prayerHours-a.prayerHours));
    setBirthdayStats(getBirthdayStats(members));
    setTeacherEngagementStats(getTeacherEngagementStats(sessions));
    setSessionTopicsStats(getSessionTopicsStats(sessions));
  }, [members, sessions]);

  const getSummary = () => {
    // Get total number of members
    const totalMembers = members?.length || 0;

    // Return empty string if there are no members
    if (totalMembers === 0) return 'No members available to calculate participation.';

    // Filter participating members who have attended at least one session
    const participatingMembers = attendanceStats.filter(stat => stat.totalSessions > 0);
    const participatingMembersTotal = participatingMembers.length;

    // Calculate participation percentage
    const participation = Math.round((participatingMembersTotal / totalMembers) * 100);

    return `Total Members: ${totalMembers} | Participation: ${participation}% (${participatingMembersTotal} out of ${totalMembers}).`;
};
  const getSummaryObject = () => {
    // Get total number of members
    const totalMembers = members?.length || 0;

    // Return empty string if there are no members
    const stat = {totalMembers: 5,participatingMembersTotal: 6};
    if (totalMembers === 0) return stat;

    // Filter participating members who have attended at least one session
    const participatingMembers = attendanceStats.filter(stat => stat.totalSessions > 0);
    const participatingMembersTotal = participatingMembers.length;

    return {totalMembers, participatingMembersTotal};
};


  return (
    <div className="insights-container">
      <h2>Session and Member Insights</h2>

      <section className="insight-section">
        <PieChartComponent totalMembers={getSummaryObject().totalMembers} participatingMembersTotal={getSummaryObject().participatingMembersTotal}/>
        {getSummary()}
      </section>
      <hr></hr>
      <section className="insight-section">
        <details ref={detailsRef}>
          <summary><h3><i className="fa fa-chevron-circle-down" aria-hidden="true"></i> Attendance Stats</h3></summary>
          <article>
            <BarChartComponent attendanceStats={attendanceStats}/>
            <ul>
              {attendanceStats.sort().map((stat, index) => (
                <li key={index} className={stat?.totalSessions=== 0?'attendance-stat-bad':''}>{stat.fullname}: Attended {stat.totalSessions} sessions</li>
              ))}
            </ul>
          </article>
        </details>
      </section>

      <section className="insight-section">
        <details>
          <summary><h3><i className="fa fa-chevron-circle-down" aria-hidden="true"></i> Prayer Hours</h3></summary>
          <article>
            <ul>
              {prayerHoursStats.map((stat, index) => (
                <li key={index}>{stat.fullname}: {stat.prayerHours} hours</li>
              ))}
            </ul>
          </article>
        </details>
      </section>

      <section className="insight-section">
        <details>
          <summary><h3><i className="fa fa-chevron-circle-down" aria-hidden="true"></i> Upcoming Birthdays</h3></summary>
          <article>
            <ul>
              {birthdayStats.map((stat, index) => (
                <li key={index}>{stat.fullname}: {new Date(stat.birthday).toLocaleDateString()}</li>
              ))}
            </ul>
          </article>
        </details>
      </section>

      <section className="insight-section">
        <details>
          <summary><h3><i className="fa fa-chevron-circle-down" aria-hidden="true"></i> Teacher Engagements</h3></summary>
          <article>
            <ul>
              {teacherEngagementStats.map((stat, index) => (
                <li key={index}>{stat.teacher}: Led {stat.sessionCount} sessions</li>
              ))}
            </ul>
          </article>
        </details>
      </section>

      <section className="insight-section session-topics-section">
        <details>
          <summary><h3><i className="fa fa-chevron-circle-down" aria-hidden="true"></i> Session Topics</h3></summary>
          <article>
            <ul className='session-topics-section'>
              {sessionTopicsStats.map((stat, index) => (
                <li key={index}>
                  {stat.date} - {stat.area}: <strong>{stat.teacher} </strong>taught on <strong>"{stat.topic}"</strong>
                  <ol>
                  {stat.membersPresent?.map((member)=><li>{members.find((m)=>m.id ===member)?.fullname}</li>)}
                  </ol>
                </li>
              ))}
            </ul>
          </article>
        </details>
      </section>
    </div>
  );
};

export default InsightsComponent;
