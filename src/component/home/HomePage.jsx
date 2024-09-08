import React, { useState } from "react";
import HouseResult from "../common/HouseResult";
import HouseSearch from "../common/HouseSearch";
import FooterComponent from '../common/Footer';



const HomePage = () => {

    const [houseSearchResults, setHouseSearchResults] = useState([]);

    // Function to handle search results
    const handleSearchResult = (results) => {
        setHouseSearchResults(results);
    };

    return (
        <div className="home">
            {/* HEADER / BANNER HOUSE SECTION */}
            <section>
                <header className="header-banner">
                    <img src="./assets/images/home.jpg" alt="Fantasy Inn" className="header-image" />
                    <div className="overlay"></div>
                    <div className="animated-texts overlay-content">
                        <h1>
                            Welcome to <span className="percy-color">Fantasy Inn</span>
                        </h1><br />
                        <h3>Step into the Haven of Anime Worlds</h3>
                    </div>
                </header>
            </section>

            {/* SEARCH/FIND AVAILABLE House SECTION */}
            <HouseSearch handleSearchResult={handleSearchResult} />
            <HouseResult houseSearchResults={houseSearchResults} />

            <h4><a className="view-houses-home" href="/houses">View All Houses</a></h4>

            <h2 className="home-services">Services</h2>

            {/* SERVICES SECTION */}
            <section className="service-section"><div className="service-card">
                <img src="./assets/images/Wind_Bottle.jpg" alt="Wind Bottle" />
                <div className="service-details">
                    <h3 className="service-title">Wind Bottle</h3>
                    <p className="service-description">Easily adjust your house's temperature with this magical wind bottle.</p>
                </div>
            </div>
                <div className="service-card">
                    <img src="./assets/images/Doraemon_Pocket.jpg" alt="Magical pocket" />
                    <div className="service-details">
                        <h3 className="service-title">Magical pocket</h3>
                        <p className="service-description">Get any snack or drink instantly from this magical pocket.</p>
                    </div>
                </div>
                <div className="service-card">
                    <img src="./assets/images/Portal_Gate.jpg" alt="Portal Gate" />
                    <div className="service-details">
                        <h3 className="service-title">Portal Gate</h3>
                        <p className="service-description">Teleport your vehicle directly to a safe parking space.</p>
                    </div>
                </div>
                <div className="service-card">
                    <img src="./assets/images/Smartphone.jpg" alt="Smartphone" />
                    <div className="service-details">
                        <h3 className="service-title">Smartphone</h3>
                        <p className="service-description">Stay connected with seamless internet using our enchanted smartphone.</p>
                    </div>
                </div>

            </section>
            {/* AVAILABLE HOUSES SECTION */}
            <section>

            </section>
        <FooterComponent />
        </div>
    );
}

export default HomePage;
