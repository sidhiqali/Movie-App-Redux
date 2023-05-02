import React, { useEffect, useState } from 'react';
import './Header.scss';
import logoimg from "../../image/user.jpg"
import logo from '../../image/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncMovies, fetchAsyncShows } from '../../Redux/movieSlice';
import { MDBBtn } from 'mdb-react-ui-kit';
import { auth, db } from '../../Firebase/firebase';
import { onAuthStateChanged ,signOut} from 'firebase/auth';
import {  doc, getDoc } from 'firebase/firestore';
function Header({ setIsLoading }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('Signed out successfully');
      })
      .catch((error) => {
        console.log(`Error signing out: ${error}`);
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        setUser(userAuth);
        const userRef = doc(db, "users", userAuth.uid);
        getDoc(userRef)
          .then((docSnapshot) => {
            if (docSnapshot.exists()) {
              setUserName(docSnapshot.data().userName);
            } else {
              console.log("No matching document found in Firestore");
            }
          })
          .catch((error) => {
            console.log(`Error fetching user document: ${error}`);
          });
      } else {
        setUser(null);
        setUserName("");
      }
    });

    return unsubscribe;
  }, []);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleLogin = () => {
    navigate('/login');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
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
          <img className='logo-img' src={logo} alt='' />
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
      {user ? (
        <div className='last-section'>
          <div className='user-img'>
            <img src={logoimg} alt="" />
          </div>
          <div className='login-button'>
            <MDBBtn
              onClick={handleSignOut}
              className='login-btn'
              color='secondary'
            >
              Logout
            </MDBBtn>
          </div>
        </div>
      ) : (
        <div className='login-button'>
          <MDBBtn onClick={handleLogin} className='login-btn' color='secondary'>
            Login
          </MDBBtn>
        </div>
      )}
    </div>
  );
}

export default Header;
