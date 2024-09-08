import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';


const AddHousePage = () => {
    const navigate = useNavigate();
    const [houseDetails, setHouseDetails] = useState({
        housePhotoUrl: '',
        houseType: '',
        housePrice: '',
        houseDescription: '',
    });
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [houseTypes, setHouseTypes] = useState([]);
    const [newHouseType, setNewHouseType] = useState(false);


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



    const handleChange = (e) => {
        const { name, value } = e.target;
        setHouseDetails(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };


    const handleHouseTypeChange = (e) => {
        if (e.target.value === 'new') {
            setNewHouseType(true);
            setHouseDetails(prevState => ({ ...prevState, houseType: '' }));
        } else {
            setNewHouseType(false);
            setHouseDetails(prevState => ({ ...prevState, houseType: e.target.value }));
        }
    };


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        } else {
            setFile(null);
            setPreview(null);
        }
    };


    const addHouse = async () => {
        if (!houseDetails.houseType || !houseDetails.housePrice || !houseDetails.houseDescription) {
            setError('All house details must be provided.');
            setTimeout(() => setError(''), 5000);
            return;
        }

        if (!window.confirm('Do you want to add this house?')) {
            return
        }

        try {
            const formData = new FormData();
            formData.append('houseType', houseDetails.houseType);
            formData.append('housePrice', houseDetails.housePrice);
            formData.append('houseDescription', houseDetails.houseDescription);

            if (file) {
                formData.append('photo', file);
            }

            const result = await ApiService.addHouse(formData);
            if (result.statusCode === 200) {
                setSuccess('House Added successfully.');
                
                setTimeout(() => {
                    setSuccess('');
                    navigate('/admin/manage-houses');
                }, 3000);
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    };

    return (
        <div className="edit-house-container">
            <h2>Add New House</h2>
            <div className="edit-house-form">
                <div className="form-group">
                <label>House Photo</label>
                    {preview && (
                        <img src={preview} alt="House Preview" className="house-photo-preview" />
                    )}
                    <input
                        type="file"
                        name="housePhoto"
                        onChange={handleFileChange}
                    />
                </div>

                <div className="form-group">
                    <label>House Type</label>
                    <select value={houseDetails.houseType} onChange={handleHouseTypeChange}>
                        <option value="">Select a house type</option>
                        {houseTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                        <option value="new">Other (please specify)</option>
                    </select>
                    {newHouseType && (
                        <input
                            type="text"
                            name="houseType"
                            placeholder="Enter new house type"
                            value={houseDetails.houseType}
                            onChange={handleChange}
                        />
                    )}
                </div>
                <div className="form-group">
                    <label>House Price</label>
                    <input
                        type="text"
                        name="housePrice"
                        value={houseDetails.housePrice}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>House Description</label>
                    <textarea
                        name="houseDescription"
                        value={houseDetails.houseDescription}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <button className="update-button" onClick={addHouse}>Add House</button>
            </div>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success + " Redirecting to All Houses..."}</p>}
        </div>
    );
};

export default AddHousePage;
