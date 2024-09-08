import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ApiService from '../../service/ApiService'; 

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await ApiService.getMovieById(movieId);
        setMovie(response);
      } catch (error) {
        console.error("Error fetching movie details: ", error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{movie.title}</h2>
      <p>Release Date: {movie.releaseDate}</p>
      <p>{movie.description}</p>
      {/* 显示影评等其他信息 */}
    </div>
  );
};

export default MovieDetails;
