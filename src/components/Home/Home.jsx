import MovieListing from '../MovieListing/MovieListing';
import Movieapi from '../../api/Movieapi';
import { APIkey } from '../../api/MovieapiKey';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addMovies } from '../../Redux/movieSlice';
function Home() {
  const searchText = 'Harry';
  const dispatch = useDispatch();
  useEffect(() => {
    const FetchMovies = async () => {
      const response = await Movieapi.get(
        `?apikey=${APIkey}&s=${searchText}&type=movie`
      ).catch((err) => {
        console.log(err);
      });
      dispatch(addMovies(response.data));
    };
    FetchMovies();
  }, []);
  return (
    <div className='home'>
      <div className='home-banner'></div>
      <MovieListing />
    </div>
  );
}

export default Home;
