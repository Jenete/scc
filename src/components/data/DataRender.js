import React, { useEffect, useState } from 'react';
import { getAllMembers } from '../../controllers/MemberControllerMock';
import { getAllBacentas } from "../../services/BacentaService";
import FirestoreService from '../../services/FirebaseConfig.js';

const DataRender = ({ dataType }) => {
  const [dataList, setDataList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch data based on the dataType
  useEffect(() => {
    const fetchData = async () => {
      if (dataType === "bacentas") {
        const fetchedBacentas = await getAllBacentas();
        setDataList(fetchedBacentas);
      } else if (dataType === "members") {
        const fetchedMembers = await getAllMembers();
        setDataList(fetchedMembers);
      } else if (dataType === "songs") {
        const firestoreService = new FirestoreService('scc');
        const fetchedSongs = await firestoreService.getAll('songs');
        setDataList(fetchedSongs);
      }
    };

    fetchData();
  }, [dataType]);

  // Filter data based on search term
  const filteredData = dataList.filter(item =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.title?.toLowerCase().includes(searchTerm.toLowerCase()) // For songs
  );

  return (
    <div>
      <label htmlFor="data-list-input">Search {dataType}:</label>
      <input
        id="data-list-input"
        list="data-options"
        placeholder={`Search ${dataType}...`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <datalist id="data-options">
        {filteredData.map((item, index) => (
          <option key={index} value={item.name || item.title} />
        ))}
      </datalist>
    </div>
  );
};

export default DataRender;

