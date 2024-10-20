import React, { useEffect, useState } from "react";
import { getAllBacentas } from "../../services/BacentaService";
import "./styles/BacentaInsights.css"

const BacentaInsights = () => {
  const [totalBacentas, setTotalBacentas] = useState(0);
  const [bacentas, setBacentas] = useState([]);
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchInsights = async () => {
      const bacentas = await getAllBacentas();
      if (bacentas?.length) {
        setTotalBacentas(bacentas.length);
        
        const sortedBacentas = [...bacentas].sort((a, b) => (b.members?.length || 0) - (a.members?.length || 0) );
        setLeaders([...new Set(bacentas?.map(b => b.leader))]);
        setBacentas(sortedBacentas);
      } else {
        setBacentas([]);
      }
      
    };
    fetchInsights();
  }, []);

  return (
    <div className="bacenta-insights-container">
      <h2>Bacenta Insights</h2>
      <div className="insight-card">
        <h3>Total Bacentas</h3>
        <p><strong>{totalBacentas}</strong></p>
      </div>
      
      <div className="insight-card">
        <p><ol>
        {bacentas.map((bacenta)=><li>{bacenta.name} <i className="fa fa-user" aria-hidden="true"></i> {bacenta.members?.length || 0}</li>)}
          </ol></p>
      </div>

      <div className="insight-card">
        <h3>Unique Leaders - {leaders.length}</h3>
        <p><ol>
        {leaders.map((leader)=><li>{leader}</li>)}
          </ol></p>
      </div>
    </div>
  );
};

export default BacentaInsights;
