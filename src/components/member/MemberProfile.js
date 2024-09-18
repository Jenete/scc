import React, { useState } from "react";
import { updateMember, removeMember } from "../../controllers/MemberControllerMock";
import './styles/memberProfile.css'; 

const MemberProfile = ({ member }) => {
  const [formData, setFormData] = useState(member);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedMember = await updateMember(formData);
      console.log("Member Updated:", updatedMember);
      setError(null);
    } catch (err) {
      setError(err.error);
    }
  };

  const handleRemove = async (memberId) => {
    try {
      await removeMember(memberId);
      setFormData({
        fullname: "",
        cellnumber: "",
        alternativenumber: "",
        address: ""
      });
      setError("Removed member");
    } catch (err) {
      setError("Error removing member");
    }
  };

  return (
    <div className="member-profile">
      <h3>Profile of {member.fullname}</h3>
      <form onSubmit={(e)=>e.preventDefault()}>
        <label>
          Full Name:
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Cell Number:
          <input
            type="text"
            name="cellnumber"
            value={formData.cellnumber}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Alternative Number:
          <input
            type="text"
            name="alternativenumber"
            value={formData.alternativenumber}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit" onClick={handleSubmit}>Update Member</button>
        <button onClick={() => handleRemove(member.id)} className="remove-button">Remove</button>
      </form>
    </div>
  );
};

export default MemberProfile;
