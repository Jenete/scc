// OutreachForm.js
import React, { useState } from 'react';
import './styles/outreachForm.css';

const OutreachForm = ({ addContact }) => {
  const [contact, setContact] = useState({
    name: '',
    phone: '',
    notes: '',
    recruiter: '',
    status: 'Contacted', // Initial status
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addContact({...contact, notes: `${contact.notes}\nRecruited by: ${contact.recruiter}`});
    setContact({
      name: '',
      phone: '',
      notes: '',
      status: 'Contacted',
    });
  };

  return (
    <div className="outreach-form-container">
      <h2 className="outreach-form-title">Add New Outreach Contact</h2>
      <form className="outreach-form" onSubmit={handleSubmit}>
        <div className="outreach-form-group">
          <label>Name</label>
          <input type="text" name="name" value={contact.name} onChange={handleInputChange} required />
        </div>
        <div className="outreach-form-group">
          <label>Phone</label>
          <input type="tel" name="phone" value={contact.phone} onChange={handleInputChange} required />
        </div>
        <div className="outreach-form-group">
          <label>Notes</label>
          <textarea name="notes" value={contact.notes} onChange={handleInputChange}></textarea>
        </div>
        <div className="outreach-form-group">
          <label>Recruited by:</label>
          <input name="recruiter" value={contact.recruiter} onChange={handleInputChange}></input>
        </div>
        <button type="submit" className="outreach-form-submit">Add Contact</button>
      </form>
    </div>
  );
};

export default OutreachForm;
