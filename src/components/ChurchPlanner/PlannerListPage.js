import React, { useEffect, useState } from 'react';
import FirestoreService from '../../services/FirebaseConfig';
import './styles/PlannerListPage.css';


const PlannerListPage = () => {
  const [plannerData, setPlannerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const plannerService = new FirestoreService('planners'); // Assuming your Firestore collection is named 'planners'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await plannerService.getPlannerData();
        if(data.success && data.data) setPlannerData([data.data]);
        
      } catch (err) {
        setError('Failed to fetch planner data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='planner-list'>
      <h1>Planner Data</h1>
      {plannerData.length === 0 ? (
        <p>No planners found</p>
      ) : (
        <div>
          {plannerData.map((planner) => (
            <div key={planner.id} className="planner-item">
              <h3>Opener: {planner.opener}</h3>
              <div>
                <h4>Songs:</h4>
                <ul>
                  {planner.songs.map((song, index) => (
                    <li key={index}>{song.title}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>Choir Songs:</h4>
                <ul>
                  {planner.choirSongs.map((song, index) => (
                    <li key={index}>{song.title}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>Dancing Stars Songs:</h4>
                <ul>
                  {planner.dancingStarsSongs.map((song, index) => (
                    <li key={index}>{song.title}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>TSA Song: {planner.tsaSong.title}</h4>
              </div>
              <div>
                <h4>Announcements:</h4>
                <ul>
                  {planner.announcements.map((announcement, index) => (
                    <li key={index}>{announcement.title}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlannerListPage;
