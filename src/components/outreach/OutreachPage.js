import React, { useEffect, useState } from 'react';
import OutreachForm from './OutreachForm';
import OutreachDashboard from './OutreachDashboard';
import './styles/outreachPage.css'; // Import the CSS for styling
import {
  getAllContacts,
  addContact,
  removeContact as removeContactController
} from '../../controllers/MemberControllerMock'; // Update to use the refined methods
import { generateID } from '../../helpers/utils';

const OutreachPage = () => {
  const [view, setView] = useState('dashboard'); // State to track the current view ('dashboard' or 'form')
  const [contacts, setContacts] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');

  // Load contacts on component mount
  useEffect(() => {
    const loadContacts = async () => {
      try {
        setStatusMessage("Loading...");
        const loadedContacts = await getAllContacts();
        setContacts(loadedContacts);
        setStatusMessage("");
      } catch (error) {
        console.error("Error loading contacts:", error);
        setStatusMessage("Failed to load contacts.");
      }
    };

    loadContacts();
  }, []); // Empty dependency array means this runs once when the component mounts

  const handleAddContact = async (newContact) => {
    try {
      setStatusMessage("Loading...");
      const addedContact = await addContact({ ...newContact, id: generateID() });
      setContacts([...contacts, addedContact]);
      setStatusMessage("Contact added successfully!");
    } catch (error) {
      console.error(error);
      setStatusMessage("Error adding contact.");
    }
  };

  const removeContact = async (contactId) => {
    try {
      setStatusMessage("Loading...");
      await removeContactController(contactId);
      setContacts(contacts.filter(c => c.id !== contactId));
      setStatusMessage("Contact removed successfully!");
    } catch (error) {
      console.error("Error removing contact:", error);
      setStatusMessage("Error removing contact.");
    }
  };

  return (
    <div className="outreach-page-container">
      <h1 className="page-title">Outreach Management</h1>
      <div className="view-switcher">
        <button
          className={`view-btn ${view === 'dashboard' ? 'active' : ''}`}
          onClick={() => setView('dashboard')}
        >
          View Dashboard
        </button>
        <button
          className={`view-btn ${view === 'form' ? 'active' : ''}`}
          onClick={() => setView('form')}
        >
          Add New Contact
        </button>
      </div>
      {statusMessage && <div className="status-message">{statusMessage}</div>}
      {/* Conditionally render either the dashboard or the form */}
      {view === 'dashboard' ? 
        <OutreachDashboard 
          contacts={contacts} 
          removeContact={removeContact} 
        /> 
        : 
        <OutreachForm addContact={handleAddContact} />
      }
    </div>
  );
};

export default OutreachPage;
