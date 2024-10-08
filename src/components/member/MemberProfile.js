import React, { useState } from "react";
import { updateMember, removeMember } from "../../controllers/MemberControllerMock";
import './styles/memberProfile.css'; 
import UserSummary from "../user/UserSummary";

const MemberProfile = ({ member, adminView }) => {
  const [formData, setFormData] = useState(member);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [toggledEdit, setToggledEdit] = useState(null);

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
      setMessage("Member Updated!");
    } catch (err) {
      setError(err.error);
      setMessage(null);
    }
  };

  const handleRemove = async (memberId) => {
    try {
      await removeMember(memberId);
      setFormData({
        fullname: "",
        cellnumber: "",
        alternativenumber: "",
        address: "",
        birthday: "",
        prayerHours: ""
      });
      setError("Removed member");
    } catch (err) {
      setError("Error removing member");
    }
  };

  return (
    <div className="member-profile">
      
      {member&& !toggledEdit&& <UserSummary member={member}/>}
      <button className="upload-button" onClick={()=> setToggledEdit(prev=> !prev)}>{toggledEdit?'Done':`Edit`}</button>
      {toggledEdit && <form onSubmit={(e)=>e.preventDefault()}>
        <label>
          Full Name:
          <input
          readOnly={!adminView}
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Cell Number:
          <input
          readOnly={!adminView}
            type="text"
            name="cellnumber"
            value={formData.cellnumber}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Alternative Number:
          <input
          readOnly={!adminView}
            type="text"
            name="alternativenumber"
            value={formData.alternativenumber}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Address:
          <input
          readOnly={!adminView}
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Birthday:
          <input
            type="date"
            name="birthday"
            placeholder="YYYYMMDD"
            value={formData.birthday}
            onChange={handleInputChange}
          />
        </label>
        <label className="prayer-hours-label"> 
          Prayer hours:
          <input
            type="range"
            name="prayerHours"
            value={formData.prayerHours} 
            min={0}
            max={45}
            step={0.5}
            onChange={handleInputChange}
            className="prayer-hours-range"
          />
          <span className="prayer-hours-value">{formData.prayerHours||0}</span>
        </label>
        {message}
        {error && <p className="error">{error}</p>}
        <button type="submit" onClick={handleSubmit}>Update Member</button>
        {adminView && <button onClick={() => handleRemove(member.id)} className="remove-button">Remove</button>}
      </form>}
    </div>
  );
};

export default MemberProfile;
