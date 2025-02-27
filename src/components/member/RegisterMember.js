import { useState } from "react";
import { addMember } from "../../controllers/MemberControllerMock";
import './styles/registerMember.css'; 
import { useNavigate } from "react-router-dom";
import TimeViewer from "../calendar/TimeViewer";
import { getInstantDateTime } from "../../helpers/utils";

const RegisterMember = ({isNewMember}) => {
  const [formData, setFormData] = useState({
    fullname: "",
    cellnumber: "",
    alternativenumber: "",
    address: "",
    birthday: ""
  });
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const isValidPhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.fullname || !formData.cellnumber || !formData.address) {
      setError("All fields are required.");
      return;
    }
  
    if (!isValidPhoneNumber(formData.cellnumber)) {
      setError("Cell number must be a valid 10-digit number.");
      return;
    }
  
    try {
        setMessage('Loading...');
      const newMember = await addMember({...formData, created: getInstantDateTime()});
      console.log("New Member Registered:", newMember);
      setMessage(`New Member Registered: ${newMember?.fullname}`)
      setFormData({
        fullname: "",
        cellnumber: "",
        alternativenumber: "",
        address: "",
        birthday: "",
      })
      setError(null); // Clear any previous errors

      if(isNewMember === true)navigate('/login');
    } catch (err) {
      setError(err.error);
      setMessage(null);
    }
  };

  return (
    <form className="register-member-form" onSubmit={handleSubmit}>
      <TimeViewer/>
      <input
        className="register-member-input"
        name="fullname"
        placeholder="Full Name"
        type="text"
        onChange={handleChange}
      />
      <input
        className="register-member-input"
        name="cellnumber"
        type="tel"
        placeholder="Cell Number"
        onChange={handleChange}
      />
      <input
        className="register-member-input"
        name="alternativenumber"
        type="tel"
        placeholder="Alternative Number"
        onChange={handleChange}
      />
      <input
        className="register-member-input"
        name="address"
        type="address"
        placeholder="Address"
        onChange={handleChange}
      />
      <label>Birthday:</label>
      <input
        className="register-member-input"
        name="birthday"
        type="date"
        placeholder="Birthday"
        onChange={handleChange}
      />
      {error && <p className="register-member-error">{error}</p>}
      {message && <p className="register-member-message">{message}</p>}
      <button className="register-member-button" type="submit">
        Register Member
      </button>
      
    </form>
  );
  
};

export default RegisterMember;
