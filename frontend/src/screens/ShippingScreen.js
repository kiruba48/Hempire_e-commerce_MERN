import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Form,
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Container,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CheckOutHeader from '../components/CheckOutHeader';

import {
  saveShippingAddressAction,
  removeFromCartAction,
} from '../actions/cartActions';

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState(shippingAddress.city);
  const [postcode, setPostcode] = useState(shippingAddress.postcode);
  const [address, setAddress] = useState(shippingAddress.address);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddressAction({ address, city, postcode, country }));
    history.push('/payment');
  };

  //   Remove item from cart
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCartAction(id));
  };

  return (
    <Container>
      <CheckOutHeader step1 step2 />
      <Row className='my-4'>
        <Col sm={12} md={6}>
          <Row>
            <h2>CONTACT INFORMATION</h2>

            <Form onSubmit={submitHandler}>
              <Form.Group controlId='name'>
                <Form.Label>Name *</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Enter Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId='email'>
                <Form.Label>Email address *</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <h2>SHIPPING INFORMATION</h2>

              <Form.Group controlId='address'>
                <Form.Label>Street Address *</Form.Label>
                <Form.Control
                  type='address'
                  placeholder='Enter Address'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId='city'>
                <Form.Label>CITY *</Form.Label>
                <Form.Control
                  type='city'
                  placeholder='Enter city'
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId='postcode'>
                <Form.Label>POST CODE *</Form.Label>
                <Form.Control
                  type='postcode'
                  placeholder='Enter Post Code'
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId='country'>
                <Form.Label>Country *</Form.Label>
                <Form.Control
                  type='country'
                  placeholder='Country'
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </Form.Group>

              <Button variant='primary' type='submit'>
                Continue
              </Button>
            </Form>
          </Row>
        </Col>

        <Col sm={12} md={6} style={{ border: '1px solid whitesmoke' }}>
          <h2 className='my-3'>YOUR ORDER</h2>
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.productId}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={5} style={{ marginTop: '1.5rem' }}>
                    <Link to={`/product/${item.productId}`}>
                      <h4>{item.name}</h4>
                    </Link>
                    <span>{`Color ${item.color} / Size ${item.size}`}</span>
                  </Col>
                  {/* <Col md={2} style={{ marginTop: '1.5rem' }}>
                
                </Col> */}
                  <Col style={{ marginTop: '2rem' }} md={3}>
                    <h4>£{item.price.toFixed(2)}</h4>
                    <span>x{item.quantity}</span>
                  </Col>
                  <Col md={2} style={{ marginTop: '1rem' }}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.productId)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default ShippingScreen;
