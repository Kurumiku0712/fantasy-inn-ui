import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const EditHousePage = () => {
    const { houseId } = useParams();
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

    useEffect(() => {
        const fetchHouseDetails = async () => {
            try {
                const response = await ApiService.getHouseById(houseId);
                setHouseDetails({
                    housePhotoUrl: response.house.housePhotoUrl,
                    houseType: response.house.houseType,
                    housePrice: response.house.housePrice,
                    houseDescription: response.house.houseDescription,
                });
            } catch (error) {
                setError(error.response?.data?.message || error.message);
            }
        };
        fetchHouseDetails();
    }, [houseId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHouseDetails(prevState => ({
            ...prevState,
            [name]: value,
        }));
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


    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('houseType', houseDetails.houseType);
            formData.append('housePrice', houseDetails.housePrice);
            formData.append('houseDescription', houseDetails.houseDescription);

            if (file) {
                formData.append('photo', file);
            }

            const result = await ApiService.updateHouse(houseId, formData);
            if (result.statusCode === 200) {
                setSuccess('House updated successfully.');
                
                setTimeout(() => {
                    setSuccess('');
                    navigate('/admin/manage-houses');
                }, 3000);
            }
            setTimeout(() => setSuccess(''), 5000);
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Do you want to delete this house?')) {
            try {
                const result = await ApiService.deleteHouse(houseId);
                if (result.statusCode === 200) {
                    setSuccess('House Deleted successfully.');
                    
                    setTimeout(() => {
                        setSuccess('');
                        navigate('/admin/manage-houses');
                    }, 3000);
                }
            } catch (error) {
                setError(error.response?.data?.message || error.message);
                setTimeout(() => setError(''), 5000);
            }
        }
    };

    return (
        <div className="edit-house-container">
            <h2>Edit House</h2>
            <div className="edit-house-form">
                <div className="form-group">
                    {preview ? (
                        <img src={preview} alt="House Preview" className="house-photo-preview" />
                    ) : (
                        houseDetails.housePhotoUrl && (
                            <img src={houseDetails.housePhotoUrl} alt="House" className="house-photo" />
                        )
                    )}
                    <input
                        type="file"
                        name="housePhoto"
                        onChange={handleFileChange}
                    />
                </div>
                <div className="form-group">
                    <label>House Type</label>
                    <input
                        type="text"
                        name="houseType"
                        value={houseDetails.houseType}
                        onChange={handleChange}
                    />
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
                <button className="update-button" onClick={handleUpdate}>Update house</button>
                <button className="delete-button" onClick={handleDelete}>Delete house</button>
            </div>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success + " Redirecting to All Houses..."}</p>}
        </div>
    );
};

export default EditHousePage;
