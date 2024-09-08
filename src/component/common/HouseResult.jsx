import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ApiService from '../../service/ApiService';

const HouseResult = ({ houseSearchResults }) => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const isAdmin = ApiService.isAdmin();
    return (
        <section className="house-results">
            {houseSearchResults && houseSearchResults.length > 0 && (
                <div className="house-list">
                    {houseSearchResults.map(house => (
                        <div key={house.id} className="house-list-item">
                            <img className='house-list-item-image' src={house.housePhotoUrl} alt={house.houseType} />
                            <div className="house-details">
                                <h3>{house.houseType}</h3>
                                <p>Price: ${house.housePrice} / night</p>
                                <p>Description: {house.houseDescription}</p>
                            </div>

                            <div className='book-now-div'>
                                {isAdmin ? (
                                    <button
                                        className="edit-house-button"
                                        onClick={() => navigate(`/admin/edit-house/${house.id}`)} // Navigate to edit house with house ID
                                    >
                                        Edit House
                                    </button>
                                ) : (
                                    <button
                                        className="book-now-button"
                                        onClick={() => navigate(`/house-details-book/${house.id}`)} // Navigate to book house with house ID
                                    >
                                        View/Book Now
                                    </button>
                                )}
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default HouseResult;
