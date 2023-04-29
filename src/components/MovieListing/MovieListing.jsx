import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getAllmovies, getAllshows } from '../../Redux/movieSlice';
import MovieCard from '../MovieCard/Moviecard';
import './MovieListing.scss';
import Slider from 'react-slick';
import { Settings } from '../../common/Settings';
import LoadingSpinner from '../Spinner/Spinner';

function MovieListing({ isLoading }) {
  const movies = useSelector(getAllmovies);
  const shows = useSelector(getAllshows);
  let renderMovies,
    renderShows = null;

  if (movies.Response === 'True') {
    renderMovies = movies.Search.map((movie, index) => {
      return <MovieCard key={index} data={movie} />;
    });
  } else {
    renderMovies = (
      <div className='movie-error'>
        <h2>{movies.Error}</h2>
      </div>
    );
  }
  if (shows.Response === 'True') {
    renderShows = shows.Search.map((show, index) => {
      return <MovieCard key={index} data={show} />;
    });
  } else {
    renderShows = (
      <div className='movie-error'>
        <h2>{shows.Error}</h2>
      </div>
    );
  }

  return (
    <div className='movie-container'>
      {isLoading ? (
        <div className='spinner-container'>
          <div className='spinner'>
            <LoadingSpinner />
          </div>
        </div>
      ) : (
        <>
          <div className='movies'>
            <h3 className='movie-heading'>Movies</h3>

            <div className='movie-list'>
              <Slider {...Settings}>{renderMovies} </Slider>
            </div>
          </div>
          <div className='movies'>
            <h3 className='movie-heading'>Shows</h3>
            <div className='movie-list'>
              <Slider {...Settings}>{renderShows} </Slider>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MovieListing;
