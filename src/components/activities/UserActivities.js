import React, { useEffect, useState } from "react";
import "./styles/UserActivities.css";
import ActivityController from "../../controllers/ActivityController";

const UserActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchInterval = 5000; // Fetch new activities every 5 seconds

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const userActivities = await ActivityController.getLogActivities();
        const sortedActivities = [...userActivities].sort((a, b) => (new Date(b.createdAt) - new Date(a.createdAt)) );

        setActivities(sortedActivities);
      } catch (err) {
        console.error("Error fetching activities:", err);
        setError("Failed to load activities. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities(); // Initial fetch
    const intervalId = setInterval(fetchActivities, fetchInterval); // Set interval for live updates

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  return (
    <div className="activities-container">
      <h1>User Activities</h1>
      {loading ? (
        <div className="loading">Loading activities...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="activities-list">
          {activities.length > 0 ? (
            activities.map((activity) => (
              <div className="activity-card" key={activity.id}>
                <div className="activity-title">{activity.title}</div>
                <p className="activity-description">{activity.description}</p>
                <span className="activity-date">{activity.createdAt?.substring(0,19).replace("T", "  ")}</span>
              </div>
            ))
          ) : (
            <p>No activities found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserActivities;
