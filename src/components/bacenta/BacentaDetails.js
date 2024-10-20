import React from "react";
import "./styles/BacentaDetails.css";

const BacentaDetails = ({ bacenta, onEdit, onRemove }) => {
  



  return (
    <div className="bacenta-details-container">
      <h2>{bacenta.name}</h2>
      <span><i className="fa fa-clock" aria-hidden="true"></i>{bacenta.created}</span>
      <p><strong>Leader:</strong> {bacenta.leader}</p>
      <p><strong><i className="fa fa-info-circle" aria-hidden="true"></i></strong> {bacenta.zone}</p>
      <fieldset className="bacenta-fieldset">
        <legend><i className="fa fa-users" aria-hidden="true"></i> <span className="member-total-number">{bacenta?.members?.length}</span></legend>
        <ul className="member-list">
          {bacenta.members?.map((member) => (
            <li key={member.id}>
              {member.fullname}
            </li>
          ))}
        </ul>
      </fieldset>
      <div className="details-buttons">
        <button className="edit-button" onClick={() => onEdit(bacenta)}>Edit</button>
        <button className="go-back-button" onClick={onRemove}><i className="fa fa-arrow-circle-left" aria-hidden="true"></i>Go back</button>
      </div>
    </div>
  );
};

export default BacentaDetails;
