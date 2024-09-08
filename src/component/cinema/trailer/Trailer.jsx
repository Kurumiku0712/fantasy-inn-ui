import {useParams, useNavigate} from 'react-router-dom';
import ReactPlayer from 'react-player';
import './Trailer.css';

import React from 'react'

const Trailer = () => {

    let params = useParams();
    let key = params.ytTrailerId;

    const navigate = useNavigate();

  return (
    <div className="react-player-container">
      {(key!=null)?<ReactPlayer controls="true" playing={true} url ={`https://www.youtube.com/watch?v=${key}&hl=en`} 
      width = '100%' height='100%' />:null}
      <button className="back-button" onClick={() => navigate(-1)}>Back</button>
    </div>
  )
}

export default Trailer
