import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PieChartComponent = ({ totalMembers, participatingMembersTotal }) => {
  const data = {
    labels: ['Participating Members', 'Non-Participating Members'],
    datasets: [
      {
        data: [participatingMembersTotal, totalMembers - participatingMembersTotal],
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  return (
    <div className="pie-chart-container">
      <details>
        <summary><h3>Participation Overview</h3></summary>
        <article>
        <Pie data={data} />
        </article>
      </details>
      
    </div>
  );
};

export default PieChartComponent;
