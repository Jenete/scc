import React, { useState, useEffect } from "react";
import { addBacenta, updateBacenta, deleteBacenta } from "../../services/BacentaService";
import "./styles/BacentaForm.css";
import { getAllMembers } from "../../controllers/MemberControllerMock";
import { getAccurateDateTime } from "../../helpers/utils";

const BacentaForm = ({ currentBacenta, setCurrentBacenta, onCloseForm }) => {
  const [name, setName] = useState("");
  const [leader, setLeader] = useState("");
  const [zone, setZone] = useState("");
  const [created, setCreated] = useState("");
  const [bacentaMembers, setBacentaMembers] = useState([]);
  const [members, setMembers] = useState([]);
  const [membersNotInBacenta, setMembersNotInBacenta] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");
  const [addNew, setAddNew] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await getAllMembers();
        if (data) setMembers(data);
      } catch (err) {
        setError("Failed to fetch members");
      }
    };
    fetchMembers();
  }, []);

  useEffect(() => {
    const getMembersNotInBacenta = () => {
      return members?.filter((mb) => 
        !bacentaMembers?.some((bacentaMember) => mb.id === bacentaMember.id)
      ) || [];
    };
  
    if (members && bacentaMembers) {
      setMembersNotInBacenta(getMembersNotInBacenta());
    } else {
      setMembersNotInBacenta(members || []);
    }
  }, [members, bacentaMembers]);  

  useEffect(() => {
    if (currentBacenta) {
      setName(currentBacenta.name);
      setLeader(currentBacenta.leader);
      setZone(currentBacenta.zone);
      setBacentaMembers(currentBacenta.members || [])
      if (currentBacenta.created)
          setCreated(currentBacenta.created );
      else {
          getAccurateDateTime().then((time)=> setCreated(time));
      }
    } else {
      setName("");
      setLeader("");
      setZone("");
    }
  }, [currentBacenta]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bacenta = { name, leader, zone, members: bacentaMembers, created };
    setStatusMessage("Loading...");
    try {
      if (currentBacenta) {
        await updateBacenta(currentBacenta.id, bacenta);
        setStatusMessage("Bacenta updated successfully!");
      } else {
        const createdTime = await getAccurateDateTime();
        await addBacenta({...bacenta, created: createdTime});
        setStatusMessage("Bacenta added successfully!");
      }
      setCurrentBacenta(null);
    } catch (err) {
      setError("Failed to save Bacenta. Please try again.");
    }
  };

  const addUser = (member) => {
    if(!member) return;
    const memberx = {fullname: member?.fullname, id: member?.id, cellnumber: member?.cellnumber };
    if(bacentaMembers)
    setBacentaMembers([...bacentaMembers, memberx]);
    else setBacentaMembers([memberx]);
  };

  const removeUser = (id) => {
    const filteredMembers = bacentaMembers.filter((mb) => mb.id !== id);
    setBacentaMembers(filteredMembers);
  };
  
  const handleDelete = async () => {
    await deleteBacenta(currentBacenta.id);
  };

  

  return (
    <form onSubmit={handleSubmit} className="bacenta-form">
      <h2>{currentBacenta ? "Edit Bacenta" : "Add Bacenta"}</h2>

      <div className="form-field">
        <label htmlFor="name">Bacenta Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-field">
        <label htmlFor="leader">Leader</label>
        <input
          id="leader"
          type="text"
          value={leader}
          onChange={(e) => setLeader(e.target.value)}
          required
        />
      </div>
      <div className="form-field">
        <label htmlFor="zone">Description</label>
        <textarea
          id="zone"
          value={zone}
          onChange={(e) => setZone(e.target.value)}
          required
        />
      </div>

      <fieldset className="bacenta-fieldset">
        <legend><i className="fa fa-users" aria-hidden="true"></i></legend>
        <ul className="member-list">
          {bacentaMembers?.map((member) => (
            <li key={member.id}>
              {member.fullname}
              <i
                className="fa fa-user-minus remove-icon"
                aria-hidden="true"
                onClick={() => removeUser(member.id)}
              ></i>
            </li>
          ))}
        </ul>
      </fieldset>

      {!addNew ? (
        <button
          type="button"
          className="add-new-button"
          onClick={() => setAddNew(true)}
        ><i
        className="fa fa-user-plus add-icon"
        aria-hidden="true"
      ></i>
          View all
        </button>
      ) : (
        <fieldset className="bacenta-fieldset">
          <legend>Choose Member</legend>
          <ul className="member-list">
            {membersNotInBacenta.map((member) => (
              <li key={member.id}>
                {member.fullname}
                <i
                  className="fa fa-user-plus add-icon"
                  aria-hidden="true"
                  onClick={() => addUser(member)}
                ></i>
              </li>
            ))}
          </ul>
          <button
          type="button"
          className="add-new-button"
          onClick={() => setAddNew(false)}
        >
          Hide
        </button>
        </fieldset>
      )}
{statusMessage && <p className="status-message">{statusMessage}</p>}
{error && <p className="error-message">{error}</p>}
      <div className="button-group">
        
        <button type="submit" className="bacenta-form-button">
          {currentBacenta ? "Update" : "Add"}
        </button>

        {currentBacenta &&         <button className="remove-button" onClick={handleDelete}>Remove</button>
      }
        <button type="button" onClick={onCloseForm} className="remove-button">
          Close
        </button>
      </div>
    </form>
  );
};

export default BacentaForm;
