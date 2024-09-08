import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import Pagination from '../common/Pagination';
import HouseResult from '../common/HouseResult';

const ManageHousePage = () => {
  const [houses, setHouses] = useState([]);
  const [filteredHouses, setFilteredHouses] = useState([]);
  const [houseTypes, setHouseTypes] = useState([]);
  const [selectedHouseType, setSelectedHouseType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [housesPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await ApiService.getAllHouses();
        const allHouses = response.houseList;
        setHouses(allHouses);
        setFilteredHouses(allHouses);
      } catch (error) {
        console.error('Error fetching houses:', error.message);
      }
    };

    const fetchHouseTypes = async () => {
      try {
        const types = await ApiService.getHouseTypes();
        setHouseTypes(types);
      } catch (error) {
        console.error('Error fetching house types:', error.message);
      }
    };

    fetchHouses();
    fetchHouseTypes();
  }, []);

  const handleHouseTypeChange = (e) => {
    setSelectedHouseType(e.target.value);
    filterHouses(e.target.value);
  };

  const filterHouses = (type) => {
    if (type === '') {
      setFilteredHouses(houses);
    } else {
      const filtered = houses.filter((house) => house.houseType === type);
      setFilteredHouses(filtered);
    }
    setCurrentPage(1); // Reset to first page after filtering
  };

  // Pagination
  const indexOfLastHouse = currentPage * housesPerPage;
  const indexOfFirstHouse = indexOfLastHouse - housesPerPage;
  const currentHouses = filteredHouses.slice(indexOfFirstHouse, indexOfLastHouse);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='all-houses'>
      <h2>All Houses</h2>
      <div className='all-house-filter-div' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className='filter-select-div'>
          <label>Filter by House Type:</label>
          <select value={selectedHouseType} onChange={handleHouseTypeChange}>
            <option value="">All</option>
            {houseTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <button className='add-house-button' onClick={() => navigate('/admin/add-house')}>
            Add House
          </button>
        </div>
      </div>

      <HouseResult houseSearchResults={currentHouses} />

      <Pagination
        housesPerPage={housesPerPage}
        totalHouses={filteredHouses.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default ManageHousePage;
