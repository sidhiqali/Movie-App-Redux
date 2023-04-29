import MovieListing from '../MovieListing/MovieListing';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAsyncMovies, fetchAsyncShows } from '../../Redux/movieSlice';

function Home({isLoading}) {
  const initialText = "Fire"
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAsyncMovies(initialText));
    dispatch(fetchAsyncShows(initialText));
  }, [dispatch]);
  return (
    <div className='home'>
      <div className='home-banner'></div>
      <MovieListing isLoading={isLoading}  />
    </div>
  );
}

export default Home;
