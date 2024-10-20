import React, { useState, useEffect } from "react";
import { getAllBacentas } from "../../services/BacentaService";
import BacentaDetails from "./BacentaDetails";
import BacentaForm from "./BacentaForm";
import './styles/BacentaList.css';

const BacentaList = () => {
  const [bacentas, setBacentas] = useState([]);
  const [selectedBacenta, setSelectedBacenta] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchBacentas = async () => {
      const fetchedBacentas = await getAllBacentas();
      const sortedBacentas = [...fetchedBacentas]?.sort((a, b) => (b.members?.length || 0) - (a.members?.length || 0) );
      setBacentas(sortedBacentas|| []);
    };
    fetchBacentas();
  }, [selectedBacenta]);

  const handleEditBacenta = (bacenta) => {
    setSelectedBacenta(bacenta);
    setShowForm(true);
  };

  const handleCreateNew = () => {
    setSelectedBacenta(null); // reset the form for new Bacenta
    setShowForm(true);
  };

  const handleFormSubmit = () => {
    // Handle form submission and refresh the list of bacentas
    setShowForm(false); // Hide the form after submission
  };

  return (
    <div className="bacenta-list-container">

      <h2>All Bacentas 
        <button className="create-new-button" onClick={handleCreateNew}>
          <i className="fa fa-plus"></i> Create New
        </button>
      </h2>
      
      {showForm && (
        <div className="bacenta-form-wrapper">
          <BacentaForm
            currentBacenta={selectedBacenta}
            setCurrentBacenta={setSelectedBacenta}
            onSubmit={handleFormSubmit}
            onCloseForm={() => setShowForm(false)}
          />
        </div>
      )}
      
      {!selectedBacenta && <div className="bacenta-cards-container">
        {bacentas.map((bacenta) => (
          <div
            key={bacenta.id}
            className="bacenta-card"
            onClick={() => setSelectedBacenta(bacenta)}
          >
            <button
              className="fa fa-edit top-right-aligned-button"
              onClick={(e) => {
                e.stopPropagation();
                handleEditBacenta(bacenta);
              }}
            ></button>
            
            <h3>{bacenta.name}</h3>
            <p><i className="fa fa-user-circle" aria-hidden="true"></i> {bacenta.leader}</p>
            <p><i className="fa fa-location-arrow" aria-hidden="true"></i> {bacenta.zone}</p>
            <p><i className="fa fa-user" aria-hidden="true"></i> {bacenta.members?.length}</p>
          </div>
        ))}
      </div>}

      {selectedBacenta && (
        <BacentaDetails 
          bacenta={selectedBacenta} 
          onEdit={handleEditBacenta} 
          onRemove={() => setSelectedBacenta(null)} 
        />
      )}
    </div>
  );
};

export default BacentaList;
