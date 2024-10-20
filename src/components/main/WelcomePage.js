import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/welcomePage.css'; // Import the CSS for styling

const WelcomePage = () => {
  const navigate = useNavigate(); // React Router hook for navigation

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1>Welcome to SCC Media Manager</h1>
        <p>
          Our platform allows you to easily view:
        </p>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>Church Calendar</h3>
            <p>View and manage upcoming church events, bacentas and schedules.</p>
          </div>
          <div className="feature-card">
            <h3>Track Attendance</h3>
            <p>Keep track of member attendance effortlessly.</p>
          </div>
          <div className="feature-card">
            <h3>Plan Events</h3>
            <p>Plan and coordinate church events with ease.</p>
          </div>
          <div className="feature-card">
            <h3>Stay Updated</h3>
            <p>Receive all important announcements in real-time.</p>
          </div>
          <div className="feature-card">
            <h3>Track Prayer Hours</h3>
            <p>Monitor prayer hours for members and sessions.</p>
          </div>
        </div>
        <div className="button-group">
          <button className="btn login-btn" onClick={goToLogin}>Get Started</button>
        </div>
        <footer> ©️ Developed by A.L Jenete</footer>
      </div>
    </div>
  );
};

export default WelcomePage;

