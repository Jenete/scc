import { useState, useEffect } from "react";
import { getAllMembers } from "../../controllers/MemberControllerMock";
import './styles/memberList.css';

const MemberList = ({ onSelectMember }) => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      const data = await getAllMembers();
      setMembers(data);
    };
    fetchMembers();
  }, []);

  const filteredMembers = members.filter((member) =>
    member.fullname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="member-list-container">
      <input
        className="member-list-search-input"
        type="text"
        placeholder="Search Members"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="member-list-ul">
        {filteredMembers.map((member) => (
          <li className="member-list-item" key={member.id}>
            <span className="member-list-name">{member.fullname}</span> {" "}
            <span className="member-list-phone"><a href={`tel:${member.cellnumber}`}>{member.cellnumber}</a></span>
            <button
              className="member-list-view-profile-btn"
              onClick={() => onSelectMember(member)}
            >
              View Profile
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemberList;
