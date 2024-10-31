import React, { useState } from 'react';
import './styles/outreachDashboard.css';

const OutreachDashboard = ({ contacts, removeContact }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('name'); // Default search by name

  // Filter contacts based on search term and selected feature
  const filteredContacts = contacts.filter((contact) => {
    const valueToSearch = searchBy === 'name' ? contact.name : searchBy === 'number' ? contact.phone :contact.notes;
    return valueToSearch.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="outreach-dashboard-container">
      <h2 className="outreach-dashboard-title">
        Outreach Dashboard {contacts ? `(${contacts.length})` : ''}
      </h2>
      <div className="search-container">
        <select 
          value={searchBy} 
          onChange={(e) => setSearchBy(e.target.value)} 
          className="search-combobox"
        >
          <option value="name">Search by Name</option>
          <option value="notes">Search by Notes</option>
          <option value="number">Search by Number</option>
        </select>
        <input 
          type="text" 
          placeholder={`Search by ${searchBy.charAt(0).toUpperCase() + searchBy.slice(1)}`} 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="search-input"
        />
      </div>
      <div className="outreach-table-container">
        {filteredContacts.length > 0 ? (
          <table className="outreach-table">
            <thead>
              <tr>
                <th>Name</th>
                <th><i className="fa fa-phone"></i> Phone</th>
                <th><i className="fa fa-commenting"></i> Notes</th>
                <th><i className="fa fa-tasks"></i> </th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact, index) => (
                <tr key={index}>
                  <td><i className="fa fa-user"></i> {contact.name}</td>
                  <td><a href={`tel:${contact.phone}`}>{contact.phone}</a></td>
                  <td>{contact.notes}</td>
                  <td>
                    <button
                      className="status-btn"
                      onClick={() => removeContact(contact.id)}
                    >
                      <i className="fa fa-trash"></i> 
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No outreach data found</div>
        )}
      </div>
    </div>
  );
};

export default OutreachDashboard;
