import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const LineChartComponent = ({ sessions }) => {
  // Add basic validation and error handling
  if (!sessions || !Array.isArray(sessions) || sessions.length === 0) {
    return (
      <div className="line-chart-container">
        <h5>Sessions Over Time</h5>
        <p>No session data available.</p>
      </div>
    );
  }

  try {
    const sortedSessionsByDate = sessions.sort((a, b) => (new Date(a.date) - new Date(b.date)) );
    const dates = sortedSessionsByDate.map(session => {
      if (!session.date) throw new Error('Invalid session date');
      return session.date;
    });

    const sessionCounts = sortedSessionsByDate.map(session => {
      if (!session.membersPresent || !Array.isArray(session.membersPresent)) {
        throw new Error('Invalid session members data');
      }
      return session.membersPresent.length;
    });
    
    const data = {
      labels: dates,
      datasets: [
        {
          label: 'Attendance Count',
          data: sessionCounts,
          borderColor: '#36A2EB',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
        },
      ],
    };

    return (
      <div className="line-chart-container">
        <h5>Attendance Over Time</h5>
        <Line data={data} />
      </div>
    );
  } catch (error) {
    console.error("Error processing session data: ", error);
    return (
      <div className="line-chart-container">
        <h5>Attendance Over Time</h5>
        <p>Error loading session data. Please try again later.</p>
      </div>
    );
  }
};

export default LineChartComponent;

