import React from 'react';
import './Moviecard.scss';
import { Link } from 'react-router-dom';

function MovieCard({ data }) {
  return (
    <div className='movie-card'>
      <Link to={`/movie/${data.imdbID}`} style={{textDecoration:'none'}} >
        <div className='card-wrap'>
          <div className='card-top'>
            <div className='movie-poster'>
              <img src={data.Poster} alt={data.Title} />
            </div>
          </div>
          <div className='card-bottom'>
            <div className='card-info'>
              <div className='movie-title'>{data.Title}</div>
              <div className='movie-year'>{data.Year}</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;
