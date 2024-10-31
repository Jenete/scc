import React, { useState } from "react";
import MemberList from "./MemberList";
import RegisterMember from "./RegisterMember";
import MemberProfile from "./MemberProfile";
import './styles/membersView.css';
import TreeView from "./TreeView";

const MembersView = () => {
  const [activeView, setActiveView] = useState("list"); // 'list', 'register', or 'profile'
  const [selectedMember, setSelectedMember] = useState(null); // For profile view


  // Handle switching views
  const handleViewSwitch = (view, member = null) => {
    setActiveView(view);
    if (member) {
      setSelectedMember(member); // Set member for profile view if needed
    }
  };

  return (
    <div className="members-view-container">
      {/* Navigation Tabs */}
      <div className="view-tabs">
        <button
          className={`view-tab-button ${activeView === "tree" ? "active" : ""}`}
          onClick={() => handleViewSwitch("tree")}
        >
          Family
        </button>
        <button
          className={`view-tab-button ${activeView === "list" ? "active" : ""}`}
          onClick={() => handleViewSwitch("list")}
        >
          Members
        </button>
        <button
          className={`view-tab-button ${activeView === "register" ? "active" : ""}`}
          onClick={() => handleViewSwitch("register")}
        >
          Register
        </button>
      </div>

      {/* Conditionally render the active view */}
      <div className="view-content">
       {activeView === "tree" && <TreeView />}
        {activeView === "list" && (
          <MemberList onSelectMember={(member) => handleViewSwitch("profile", member)} />
        )}
        {activeView === "register" && <RegisterMember />}
        {activeView === "profile" && selectedMember && (
          <MemberProfile member={selectedMember} adminView={true} />
        )}
      </div>
    </div>
  );
};

export default MembersView;
