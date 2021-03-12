import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  getUserDetails,
  updateUserDetailsAction,
} from '../actions/userActions';
import {
  USER_DETAILS_RESET,
  USER_DETAILS_UPDATE_RESET,
} from '../constants/userConstants';

const ProfileScreen = ({ history, location }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  //   const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  //   Getting the user Info from global state
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfileDetail = useSelector((state) => state.userProfileDetail);
  const { loading, error, user, detailSuccess } = userProfileDetail;

  const userProfileUpdate = useSelector((state) => state.userProfileUpdate);
  const { updateSuccess } = userProfileUpdate;

  useEffect(() => {
    if (!userInfo) {
      //To check the user's been logged in
      history.push('/login');
    } else {
      if (!user || !user.name || updateSuccess) {
        // dispatch({ type: USER_DETAILS_RESET });
        dispatch({ type: USER_DETAILS_UPDATE_RESET });
        dispatch(getUserDetails('profile'));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, userInfo, history, user, updateSuccess, detailSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserDetailsAction(name, email)); // update details dispatch
  };

  return (
    <Row>
      <Col sm={12} md={3} style={{ border: '0.5px solid whitesmoke' }}>
        {error && <Message variant='danger'>{error}</Message>}
        {updateSuccess && (
          <Message variant='success'>Your Profile is Updated</Message>
        )}
        {loading && <Loader />}
        <h2 className='my-3'>{user && `Welcome ${user.name}`}</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Button variant='primary' type='submit'>
            Update
          </Button>
        </Form>

        <Row className='py-3'>
          <Col>
            <Link to={'/changePassword'}>CHANGE PASSWORD?</Link>
          </Col>
        </Row>
      </Col>
      <Col sm={12} md={9}>
        MY ORDER DETAILS
      </Col>
    </Row>
  );
};

export default ProfileScreen;
