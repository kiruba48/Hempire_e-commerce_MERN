import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  getUserDetails,
  updateUserPasswordAction,
} from '../actions/userActions';
import FormContainer from '../components/FormContainer';

const PasswordChangeScreen = ({ history, location }) => {
  const [CurrentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  //   Getting the user Info from global state
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfileDetail = useSelector((state) => state.userProfileDetail);
  const { loading, error, user } = userProfileDetail;

  const userPasswordUpdate = useSelector((state) => state.userPasswordUpdate);
  const { success } = userPasswordUpdate;

  //   console.log(userLogin);
  //   const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (!userInfo) {
      //To check the user's been logged in
      history.push('/login');
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'));
      }
    }
  }, [dispatch, userInfo, history, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(
        updateUserPasswordAction(CurrentPassword, password, confirmPassword)
      ); //is going to be update dispatch
    }
  };

  return (
    <FormContainer>
      <h1 className='my-3'>Change Password</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {success && <Message variant='success'>Your Password is Updated</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='currentPassword'>
          <Form.Label>Current Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter current password'
            value={CurrentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Confirm
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          <Link to={'/profile'}>GO BACK</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default PasswordChangeScreen;
