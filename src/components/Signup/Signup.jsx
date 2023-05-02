import './Signup.scss';
import signupImg from '../../image/signup.jpg';
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
import { useDispatch, useSelector } from 'react-redux';
import {
  addEmail,
  addPassword,
  addUserName,
  getEmail,
  getPassword,
  getUserName,
  removeData,
  signupAsyncUser,
} from '../../Redux/userSlice';
import { useNavigate } from 'react-router';

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let userName = useSelector(getUserName);
  let password = useSelector(getPassword);
  let email = useSelector(getEmail);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupAsyncUser());
    setTimeout(() => {
      navigate('/');
    }, 1000);
    dispatch(removeData());
  };
  const navigateLogin = () => {
    navigate('/login');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'userName':
        dispatch(addUserName(value));
        break;
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
  return (
    <MDBContainer className='my-5 signup-container'>
      <MDBRow className='g-0 align-items-center'>
        <MDBCol col='6'>
          <MDBCard
            className='my-5 cascading-right'
            style={{
              background: 'hsla(0, 0%, 100%, 0.55)',
              backdropFilter: 'blur(30px)',
            }}
          >
            <MDBCardBody className='p-5 shadow-5 text-center'>
              <h2 className='fw-bold mb-5'>Sign up now</h2>

              <MDBRow>
                <MDBCol col='6'>
                  <MDBInput
                    className='signup-input'
                    wrapperClass='mb-4'
                    label='Name'
                    id='form1'
                    type='text'
                    name='userName'
                    value={userName}
                    onChange={handleChange}
                  />
                </MDBCol>
              </MDBRow>

              <MDBInput
                className='signup-input'
                wrapperClass='mb-4'
                label='Email'
                id='form3'
                type='email'
                name='email'
                value={email}
                onChange={handleChange}
              />
              <MDBInput
                className='signup-input'
                wrapperClass='mb-4'
                label='Password'
                id='form4'
                name='password'
                type='password'
                value={password}
                onChange={handleChange}
              />

              <MDBBtn className='w-100 mb-4' size='md' onClick={handleSubmit}>
                sign up
              </MDBBtn>

              <div className='text-center'>
                <p>
                  or{' '}
                  <span
                    onClick={navigateLogin}
                    style={{ color: '#990000', cursor: 'pointer' }}
                    className='signup-link'
                  >
                    Login
                  </span>{' '}
                  with:
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

        <MDBCol className=' signup-img' col='6'>
          <img src={signupImg} className='w-100 rounded-4 shadow-4' alt='' />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Signup;
