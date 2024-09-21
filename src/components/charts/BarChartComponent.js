import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const BarChartComponent = ({ attendanceStats }) => {
  const data = {
    labels: attendanceStats.map(stat => stat.fullname),
    datasets: [
      {
        label: 'Sessions Attended',
        data: attendanceStats.map(stat => stat.totalSessions),
        backgroundColor: '#36A2EB',
      },
    ],
  };

  return (
    <div className="bar-chart-container">
      <h3>Sessions Attended by Members</h3>
      <Bar data={data} />
    </div>
  );
};

export default BarChartComponent;
