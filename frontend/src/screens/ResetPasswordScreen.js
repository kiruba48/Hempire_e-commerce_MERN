import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { userForgotPasswordConfirmAction } from '../actions/userActions';
import FormContainer from '../components/FormContainer';

const ResetPasswordScreen = ({ history, location, match }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const resetToken = match.params.resetToken;
  const dispatch = useDispatch();

  const userResetPasswordConfirm = useSelector(
    (state) => state.userResetPasswordConfirm
  );
  const { error, success, loading } = userResetPasswordConfirm;

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(userForgotPasswordConfirmAction(password, resetToken));
      // dispatch resetPassword request //is going to be update dispatch
    }
  };

  return (
    <FormContainer>
      <h1 className='my-3'>Reset Password</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {success && (
        <Message variant='success'>
          Your Password is Updated and You are Logged In
        </Message>
      )}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
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
          <Link to={'/login'}>Remember password?? Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default ResetPasswordScreen;
