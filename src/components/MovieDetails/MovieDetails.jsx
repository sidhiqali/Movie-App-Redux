import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import {
  fetchAsyncDetails,
  getAllDetails,
  removeDetails,
} from '../../Redux/movieSlice';
import LoadingSpinner from '../Spinner/Spinner';
import './MovieDetails.scss';

function MovieDetails() {
  const { imdbID } = useParams();
  const dispatch = useDispatch();
  const details = useSelector(getAllDetails);

  useEffect(() => {
    const delay = setTimeout(() => {
      dispatch(fetchAsyncDetails(imdbID));;
    }, 100);

    return () => {
      dispatch(removeDetails());
    };
  }, [dispatch, imdbID]);

  return (
    <div className='details-section'>
      {Object.keys(details).length === 0 ? (
        <div className='spinner-container'>
          <div className='spinner'>
            <LoadingSpinner />
          </div>
        </div>
      ) : (
        <>
          <div className='section-left'>
            <div className='movie-title'>{details.Title}</div>
            <div className='movie-rating'>
              <span>
                IMDB Rating : <i className='fa fa-star'></i>
                {details.imdbRating}
              </span>
              <span>
                IMDB Votes: <i className='fa fa-thumbs-up'></i>
                {details.imdbVotes}
              </span>
              <span>
                Runtime: <i className='fa fa-film'></i>
                {details.Runtime}
              </span>
              <span>
                Year:<i className='fa fa-calendar'></i>
                {details.Year}
              </span>
            </div>
            <div className='movie-plot'>{details.Plot}</div>
            <div className='movie-info'>
              <div>
                <span>Director</span>
                <span>{details.Director}</span>
              </div>
              <div>
                <span>Stars</span>
                <span>{details.Actors}</span>
              </div>
              <div>
                <span>Generes</span>
                <span>{details.Genre}</span>
              </div>
              <div>
                <span>Languages</span>
                <span>{details.Language}</span>
              </div>
              <div>
                <span>Awards</span>
                <span>{details.Awards}</span>
              </div>
            </div>
          </div>
          <div className='section-right'>
            <img src={details.Poster} alt={details.Title} />
          </div>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
