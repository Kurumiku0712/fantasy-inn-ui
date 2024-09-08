import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ApiService from '../../service/ApiService';

const HouseSearch = ({ handleSearchResult }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [houseType, setHouseType] = useState('');
  const [houseTypes, setHouseTypes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHouseTypes = async () => {
      try {
        const types = await ApiService.getHouseTypes();
        setHouseTypes(types);
      } catch (error) {
        console.error('Error fetching house types:', error.message);
      }
    };
    fetchHouseTypes();
  }, []);

  /**This methods is going to be used to show errors */
  const showError = (message, timeout = 5000) => {
    setError(message);
    setTimeout(() => {
      setError('');
    }, timeout);
  };

  /**THis is going to be used to fetch avaailabe houses from database base on seach data that'll be passed in */
  const handleInternalSearch = async () => {
    if (!startDate || !endDate || !houseType) {
      showError('Please select all fields');
      return false;
    }
    try {
      // Convert startDate to the desired format
      const formattedStartDate = startDate ? startDate.toISOString().split('T')[0] : null;
      const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : null;
      // Call the API to fetch available houses
      const response = await ApiService.getAvailableHousesByDateAndType(formattedStartDate, formattedEndDate, houseType);

      // Check if the response is successful
      if (response.statusCode === 200) {
        if (response.houseList.length === 0) {
          showError('House not currently available for this date range on the selected rom type.');
          return
        }
        handleSearchResult(response.houseList);
        setError('');
      }
    } catch (error) {
      showError("Unown error occured: " + error.response.data.message);
    }
  };

  return (
    <section>
      <div className="search-container">
        <div className="search-field">
          <label>Check-in Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select Check-in Date"
          />
        </div>
        <div className="search-field">
          <label>Check-out Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select Check-out Date"
          />
        </div>

        <div className="search-field">
          <label>House Type</label>
          <select value={houseType} onChange={(e) => setHouseType(e.target.value)}>
            <option disabled value="">
              Select House Type
            </option>
            {houseTypes.map((houseType) => (
              <option key={houseType} value={houseType}>
                {houseType}
              </option>
            ))}
          </select>
        </div>
        <button className="home-search-button" onClick={handleInternalSearch}>
          Search Houses
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </section>
  );
};

export default HouseSearch;
