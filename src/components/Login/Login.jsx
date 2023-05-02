import React from 'react';
import './Login.scss';
import signupImg from '../../image/signup3.jpg';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBCheckbox,
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router';
import {
  addEmail,
  addPassword,
  getEmail,
  getPassword,
  getUser,
  removeData,
  signInAsyncUser,
} from '../../Redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';

function Login() {
  const dispatch = useDispatch();
  let password = useSelector(getPassword);
  let email = useSelector(getEmail);

  const handleSubmit = (e) => {
    e.preventDefault(); 
    dispatch(signInAsyncUser());
 navigate('/') 
    dispatch(removeData());
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'email':
        dispatch(addEmail(value));
        break;
      case 'password':
        dispatch(addPassword(value));
        break;

      default:
        break;
    }
  };
  const navigate = useNavigate();
  const navigateSignup = () => {
    navigate('/signup');
  };
  return (
    <MDBContainer className=' my-5 signup-container'>
      <MDBRow className='g-0 align-items-center'>
        <MDBCol col='6'>
          <MDBCard
            className='my-5 cascading-right'
            style={{
              background: 'hsla(0, 0%, 100%, 0.55)',
              backdropFilter: 'blur(30px)',
            }}
          >
            <MDBCardBody className='p-5  shadow-5 text-center'>
              <h2 className='fw-bold mb-5'>Login</h2>

              <MDBInput
                className='signup-input'
                wrapperClass='mb-4'
                label='Email'
                name='email'
                id='form3'
                type='email'
                value={email}
                onChange={handleChange}
              />
              <MDBInput
                className='signup-input'
                wrapperClass='mb-4'
                label='Password'
                id='form4'
                type='password'
                name='password'
                value={password}
                onChange={handleChange}
              />

              <MDBBtn onClick={handleSubmit} className='w-100 mb-4' size='md'>
                Login
              </MDBBtn>

              <div className='text-center'>
                <p>
                  or{' '}
                  <span
                    onClick={navigateSignup}
                    style={{ color: '#990000', cursor: 'pointer' }}
                    className='signup-link'
                  >
                    Signup
                  </span>{' '}
                  with
                </p>

                <MDBBtn
                  tag='a'
                  color='none'
                  className='mx-3'
                  style={{ color: '#1266f1' }}
                >
                  <MDBIcon fab icon='facebook-f' size='sm' />
                </MDBBtn>

                <MDBBtn
                  tag='a'
                  color='none'
                  className='mx-3'
                  style={{ color: '#1266f1' }}
                >
                  <MDBIcon fab icon='twitter' size='sm' />
                </MDBBtn>

                <MDBBtn
                  tag='a'
                  color='none'
                  className='mx-3'
                  style={{ color: '#1266f1' }}
                >
                  <MDBIcon fab icon='google' size='sm' />
                </MDBBtn>

                <MDBBtn
                  tag='a'
                  color='none'
                  className='mx-3'
                  style={{ color: '#1266f1' }}
                >
                  <MDBIcon fab icon='github' size='sm' />
                </MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol col='6'>
          <img
            src={signupImg}
            className='w-100 h-50 login-img rounded-7 shadow-4 '
            alt=''
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
