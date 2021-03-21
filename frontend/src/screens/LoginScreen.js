import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import {
  userLoginAction,
  userForgotPasswordAction,
} from '../actions/userActions';
import { USER_RESET_PASSWORD_RESET } from '../constants/userConstants';

const LoginScreen = ({ history, location }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');

  const handleClose = () => {
    setMessage('');
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  //   Getting the user Info from global state
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  // console.log(location.search);
  //   console.log(userLogin);
  const redirect = location.search ? location.search.split('=')[1] : '/';

  const userForgotPasswordRequest = useSelector(
    (state) => state.userForgotPasswordRequest
  );
  const {
    loading: loadingResetPassword,
    error: errorResetPassword,
    success: successResetPassword,
  } = userForgotPasswordRequest;

  const passwordResetMessage =
    'Password Reset request Token has been sent to your email, Please check and use the link in email to create new password';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
    if (successResetPassword) {
      setMessage(passwordResetMessage);
      handleShow();
      dispatch({ type: USER_RESET_PASSWORD_RESET });
    }
  }, [redirect, userInfo, history, successResetPassword, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userLoginAction(email, password));
  };

  const handlePasswordReset = () => {
    if (email) {
      dispatch(userForgotPasswordAction(email));
    } else {
      setMessage('Please Enter valid email');
      handleShow();
    }
    // if (successResetPassword) {
    //   setMessage(passwordResetMessage);
    //   handleShow();
    // }
  };

  return (
    <FormContainer>
      <h1 className='my-3'>Sign In</h1>
      {errorResetPassword && (
        <Message variant='danger'>{errorResetPassword}</Message>
      )}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      {loadingResetPassword && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Sign In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            DON'T HAVE AN ACCOUNT?
          </Link>
        </Col>
      </Row>
      <Row className='py-1'>
        <Col>
          <Button className='button btn-light' onClick={handlePasswordReset}>
            FORGOT PASSWORD?
          </Button>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>PASSWORD RESET</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </FormContainer>
  );
};

export default LoginScreen;
