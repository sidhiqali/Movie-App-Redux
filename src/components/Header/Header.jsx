import React from 'react';
import './Header.scss';
import user from '../../image/user.jpg';
import logo from '../../image/logo.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAsyncMovies, fetchAsyncShows } from '../../Redux/movieSlice';
function Header({ setIsLoading }) {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(fetchAsyncMovies(value));
    dispatch(fetchAsyncShows(value));
    setValue('');
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  return (
    <div className='header'>
      <Link to='/' style={{ textDecoration: 'none' }}>
        <div className='logo'>
          <img className='logo-img' src={logo} alt="" />
        </div>
      </Link>
      <div className='search-bar'>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            name=''
            value={value}
            onChange={handleChange}
            placeholder='Search Movies and shows here'
            id=''
          />
          <button type='submit'>
            <i className='fa fa-search'></i>
          </button>
        </form>
      </div>
      <div className='user-img'>
        <img src={user} alt='user' />
      </div>
    </div>
  );
}

export default Header;
