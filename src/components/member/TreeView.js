import React, { useEffect, useState } from 'react';
import './styles/TreeView.css'; // Import the CSS styles
import { getMemberAssignments, getUnassignedMembers } from '../../controllers/MemberControllerMock';

const TreeNode = ({ bacenta }) => {
  return (
    <div className="tree-node">
      <div className="bacenta-header">
        <h4 className="bacenta-title">{bacenta.leader}'s </h4>
        <span className="bacenta-count"><i className="fa fa-circle" aria-hidden="true"></i> {bacenta.count}</span>
      </div>
      <ul className="member-list">
        {bacenta.members.map((member) => (
          <li key={member.id} className="member-item">
            {member.fullname}
          </li>
        ))}
      </ul>
    </div>
  );
};

const TreeView = () => {

  const [assignments, setAssignments] = useState(null);
  const [unassigned, setUnassigned] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  // Load Tree on component mount
  useEffect(() => {
    const loadTree = async () => {
      try {
        setStatusMessage("Loading...");
        const loadedTree = await getMemberAssignments();
        setAssignments(loadedTree);
        setStatusMessage("");
      } catch (error) {
        console.error("Error loading Tree:", error);
        setStatusMessage("Failed to load Tree.");
      }
    };
    loadTree();
    const loadUnassigned = async () => {
      try {
        const loadedTree = await getUnassignedMembers();
        setUnassigned(loadedTree);
      } catch (error) {
        console.error("Error loading Tree:", error);
        setStatusMessage("Failed to load unassigned.");
      }
    };
    loadUnassigned();
  }, []); // Empty dependency array means this runs once when the component moun
  return (
    <div className="tree-view-container">
      <p>{statusMessage}</p>
      {unassigned?.length > 0 && (
          <div className="unassigned-section">
            <strong>Unassigned Members:</strong>
            <ul className="unassigned-list">
              {unassigned.map((member) => (
                <li key={member.id} className="unassigned-item">
                  {member.fullname}
                </li>
              ))}
            </ul>
          </div>
        )}
      <div className="tree-view">
        {assignments?.map((bacenta) => (
          <TreeNode key={bacenta.id} bacenta={bacenta} />
        ))}
      </div>
      
    </div>
  );
};

export default TreeView;
