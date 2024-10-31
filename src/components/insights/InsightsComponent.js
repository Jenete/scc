// InsightsComponent.js
import React, { useState, useEffect, useRef } from 'react';
import { 
  getAttendanceStats, 
  getPrayerHoursStats, 
  getBirthdayStats, 
  getTeacherEngagementStats, 
  getSessionTopicsStats,
  getBacentaSessionStats 
} from '../../controllers/InsightsController';
import './styles/insightsComponent.css';
import BarChartComponent from '../charts/BarChartComponent';
import PieChartComponent from '../charts/PieChartComponent';
import LineChartComponent from '../charts/LineChartComponent';

const InsightsComponent = ({ members, sessions, bacentas }) => {
  const [attendanceStats, setAttendanceStats] = useState([]);
  const [prayerHoursStats, setPrayerHoursStats] = useState([]);
  const [birthdayStats, setBirthdayStats] = useState([]);
  const [teacherEngagementStats, setTeacherEngagementStats] = useState([]);
  const [sessionTopicsStats, setSessionTopicsStats] = useState([]);
  const [bacentaSessionStats, setBacentaSessionStats] = useState([]);
  const detailsRef = useRef(null);

  useEffect(() => {
    setAttendanceStats(getAttendanceStats(members, sessions)?.sort((a,b)=> b.totalSessions-a.totalSessions));
    setPrayerHoursStats(getPrayerHoursStats(members)?.sort((a,b)=> b.prayerHours-a.prayerHours));
    setBirthdayStats(getBirthdayStats(members));
    setTeacherEngagementStats(getTeacherEngagementStats(sessions));
    setSessionTopicsStats(getSessionTopicsStats(sessions));
    setBacentaSessionStats(getBacentaSessionStats(bacentas, sessions));
  }, [members, sessions, bacentas]);

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
    <h2 className="insights-header">Church Insights</h2>

    <section className="insight-card pie-chart-card">
      <PieChartComponent
        totalMembers={getSummaryObject().totalMembers}
        participatingMembersTotal={getSummaryObject().participatingMembersTotal}
      />
      <div className="summary-text">{getSummary()}</div>
    </section>

    <section className="insight-card">
      <details ref={detailsRef}>
        <summary className="insight-summary">
          <h3><i className="fa fa-chevron-circle-down"></i> Attendance Stats</h3>
        </summary>
        <article className="insight-content">
          <BarChartComponent attendanceStats={attendanceStats} />
          <ul className="insight-list">
            {attendanceStats.sort().map((stat, index) => (
              <li
                key={index}
                className={`insight-item ${stat?.totalSessions === 0 ? 'highlight-bad' : ''}`}
              >
                {stat.fullname}: Attended {stat.totalSessions} sessions
              </li>
            ))}
          </ul>
        </article>
      </details>
    </section>

    <section className="insight-card">
      <details>
        <summary className="insight-summary">
          <h3><i className="fa fa-chevron-circle-down"></i> Prayer Hours</h3>
        </summary>
        <article className="insight-content">
          <ul className="insight-list">
            {prayerHoursStats.map((stat, index) => (
              <li key={index} className="insight-item">
                {stat.fullname}: {stat.prayerHours} hours
              </li>
            ))}
          </ul>
        </article>
      </details>
    </section>

    <section className="insight-card">
      <details>
        <summary className="insight-summary">
          <h3><i className="fa fa-chevron-circle-down"></i> Upcoming Birthdays</h3>
        </summary>
        <article className="insight-content">
          <ul className="insight-list">
            {birthdayStats.map((stat, index) => (
              <li key={index} className="insight-item">
                {stat.fullname}: {new Date(stat.birthday).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </article>
      </details>
    </section>

    <section className="insight-card">
      <details>
        <summary className="insight-summary">
          <h3><i className="fa fa-chevron-circle-down"></i> Teacher Engagements</h3>
        </summary>
        <article className="insight-content">
          <ul className="insight-list">
            {teacherEngagementStats.map((stat, index) => (
              <li key={index} className="insight-item">
                {stat.teacher}: Led {stat.sessionCount} sessions
              </li>
            ))}
          </ul>
        </article>
      </details>
    </section>

    <section className="insight-card session-topics-card">
      <details>
        <summary className="insight-summary">
          <h3><i className="fa fa-chevron-circle-down"></i> Session Topics</h3>
        </summary>
        <article className="insight-content">
          <ul className="insight-list">
            {sessionTopicsStats.map((stat, index) => (
              <li key={index} className="session-topic-item">
                <strong>{stat.teacher} </strong>
                taught on <strong>"{stat.topic}"</strong> at {stat.area} {stat.date}
                <ol className="members-list">
                  {stat.membersPresent?.map((member) => (
                    <li key={member}>
                      {members.find((m) => m.id === member)?.fullname}
                    </li>
                  ))}
                </ol>
              </li>
            ))}
          </ul>
        </article>
      </details>
    </section>


     {/* Bacenta Session Stats Section */}
     <section className="insight-card bacenta-session-card">
        <details>
          <summary className="insight-summary">
            <h3><i className="fa fa-chevron-circle-down"></i> Bacenta Sessions</h3>
          </summary>
          <article className="insight-content-bacenta-session">
              <ul className="insight-list-bacenta-session">
                {bacentaSessionStats.map((stat, index) => (
                  <li key={index} className="session-item-bacenta-session">
                    <div className="session-info">
                      <strong className="bacenta-name">{stat.bacentaName}</strong> 
                      <span className="leader-info">by {stat.leader}</span>
                      <p className="session-count">Total sessions: {stat.totalSessions}</p>
                    </div>

                    {/* Line Chart Section */}
                    <div className="chart-wrapper">
                      <LineChartComponent sessions={stat?.sessions} />
                    </div>
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
