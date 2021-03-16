import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  getUserDetails,
  updateUserDetailsAction,
} from '../actions/userActions';
import { USER_DETAILS_UPDATE_RESET } from '../constants/userConstants';
import { fetchMyOrdersAction } from '../actions/orderActions';

const ProfileScreen = ({ history, location }) => {
  //   const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  //   Getting the user Info from global state
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const userProfileDetail = useSelector((state) => state.userProfileDetail);
  const { loading, error, user, detailSuccess } = userProfileDetail;

  const userProfileUpdate = useSelector((state) => state.userProfileUpdate);
  const { updateSuccess } = userProfileUpdate;

  const ordersOfLoggedUser = useSelector((state) => state.ordersOfLoggedUser);
  const {
    orders,
    loading: loadingOrders,
    error: errorsOrders,
  } = ordersOfLoggedUser;

  useEffect(() => {
    if (!userInfo) {
      //To check the user's been logged in
      history.push('/login');
    } else {
      if (!user || !user.name || updateSuccess) {
        dispatch({ type: USER_DETAILS_UPDATE_RESET });
        dispatch(getUserDetails('profile'));
        dispatch(fetchMyOrdersAction());
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
        <h2 className='my-3'>{userInfo && `Welcome ${userInfo.name}`}</h2>
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
        <h2>MY ORDER DETAILS</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorsOrders ? (
          <Message variant='danger'>{errorsOrders}</Message>
        ) : (
          orders.map((order) => (
            <Card key={order._id}>
              <Card.Header>
                <Row>
                  <Col md={3}>
                    <span style={{ fontSize: '0.7rem' }}>ORDER PLACED</span>
                    <br />
                    <span style={{ fontSize: '0.6rem' }}>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <Message variant='danger'>Yet to Pay</Message>
                      )}
                    </span>
                  </Col>
                  <Col md={2}>
                    <span style={{ fontSize: '0.7rem' }}>TOTAL</span>
                    <br />
                    <span style={{ fontSize: '0.6rem' }}>
                      £{order.totalPrice.toFixed(2)}
                    </span>
                  </Col>
                  <Col md={3}>
                    <span style={{ fontSize: '0.7rem' }}>DISPATCH TO</span>
                    <br />
                    <span style={{ fontSize: '0.6rem' }}>
                      {order.shippingAddress.address}
                    </span>
                  </Col>
                  <Col md={4}>
                    <span style={{ fontSize: '0.7rem' }}>ORDER ID</span>
                    <br />
                    <span style={{ fontSize: '0.6rem' }}>{order._id}</span>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={8}>
                    <Card.Title>
                      {order.isDelivered
                        ? `Delivered ${order.deliveredAt.substring(0, 10)}`
                        : `Delivery Scheduled`}
                      <br />
                      {order.isDelivered && (
                        <span style={{ fontSize: '0.6rem' }}>
                          Your Parcel was collected by a Resident
                        </span>
                      )}
                    </Card.Title>
                    <Card.Text>
                      {order.orderItems.map((item, i) => (
                        <li key={i}>
                          {item.name} x {item.quantity}
                        </li>
                      ))}
                    </Card.Text>
                  </Col>
                  <Col md={4}>
                    <LinkContainer to='/'>
                      <Button className='btn-sm btn-block' variant='primary'>
                        Buy Again
                      </Button>
                    </LinkContainer>
                    {/* <LinkContainer to={`/product/${orders.orderItems[0]._id}`}>
                      <Button className='btn-sm btn-block' variant='primary'>
                        Leave Review
                      </Button>
                    </LinkContainer> */}
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm btn-block' variant='primary'>
                        Order Details
                      </Button>
                    </LinkContainer>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
