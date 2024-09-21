import React, { useState } from "react";
import MemberList from "./MemberList";
import RegisterMember from "./RegisterMember";
import MemberProfile from "./MemberProfile";
import './styles/membersView.css';
import InsightsView from "../insights/InsightsView";

const MembersView = () => {
  const [activeView, setActiveView] = useState("insights"); // 'list', 'register', or 'profile'
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
          className={`view-tab-button ${activeView === "insights" ? "active" : ""}`}
          onClick={() => handleViewSwitch("insights")}
        >
          Insights
        </button>
        <button
          className={`view-tab-button ${activeView === "list" ? "active" : ""}`}
          onClick={() => handleViewSwitch("list")}
        >
          Member List
        </button>
        <button
          className={`view-tab-button ${activeView === "register" ? "active" : ""}`}
          onClick={() => handleViewSwitch("register")}
        >
          Register Member
        </button>
      </div>

      {/* Conditionally render the active view */}
      <div className="view-content">
        {activeView === "list" && (
          <MemberList onSelectMember={(member) => handleViewSwitch("profile", member)} />
        )}
        {activeView === "register" && <RegisterMember />}
        {activeView === "insights" && <InsightsView />}
        {activeView === "profile" && selectedMember && (
          <MemberProfile member={selectedMember} />
        )}
      </div>
    </div>
  );
};

export default MembersView;
