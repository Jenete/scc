import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale);

const LineChartComponent = ({ sessions }) => {
  const dates = sessions.map(session => session.date);
  const sessionCounts = sessions.map(session => session.membersPresent.length);

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Sessions Count',
        data: sessionCounts,
        borderColor: '#36A2EB',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
      },
    ],
  };

  return (
    <div className="line-chart-container">
      <h3>Sessions Over Time</h3>
      <Line data={data} />
    </div>
  );
};

export default LineChartComponent;
