import React, { useEffect, useState } from 'react';
import ApiService from '../../service/ApiService';
import { Link } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import './MovieList.css';

const MovieList = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await ApiService.getAllMovies();
                setMovies(response);
            } catch (error) {
                console.error("Error fetching movies: ", error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className='movie-carousel-container'>
            <Carousel interval={3000}>
                {
                    movies?.map(movie => {
                        return (
                            <Paper key={movie.imdbId}>
                                <div className='movie-card-container'>
                                    <div className="movie-card" style={{ "--img": `url(${movie.backdrops[0]})` }}>
                                        <div className="movie-detail">
                                            <div className="movie-poster">
                                                <img src={movie.poster} alt="" />
                                            </div>
                                            <div className="movie-title">
                                                <h4>{movie.title}</h4>
                                            </div>
                                            <div className="movie-buttons-container">
                                                <Link to={movie.trailerLink && movie.trailerLink.length >= 11 ? `/Trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}` : '#'}>
                                                    <div className="play-button-icon-container">
                                                        <FontAwesomeIcon className="play-button-icon" icon={faCirclePlay} />
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Paper>
                        )
                    })
                }
            </Carousel>
        </div>
    );
};

export default MovieList;
