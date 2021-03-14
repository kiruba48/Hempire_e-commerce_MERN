import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, ListGroup, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import CheckoutHeader from '../components/CheckOutHeader';
import { createOrderAction } from '../actions/orderActions';

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const { cart, userLogin } = useSelector((state) => ({
    cart: state.cart,
    userLogin: state.userLogin,
  }));

  const { userInfo } = userLogin;

  //   Calculate Payment Summary
  const toFixed2 = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = toFixed2(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );

  cart.shippingPrice = toFixed2(cart.itemsPrice > 40 ? 0 : 5);

  const freeShipping =
    cart.itemsPrice < 40
      ? `Add £${40 - cart.itemsPrice} to get Free Shipping`
      : null;

  cart.taxPrice = toFixed2(Number((0.15 * cart.itemsPrice).toFixed(2)));

  cart.totalPrice = toFixed2(
    Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)
  );

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }

    if (success) {
      history.push(`/order/${order._id}`);
    } // eslint-disable-next-line
  }, [history, userInfo, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrderAction({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };
  return (
    <>
      <CheckoutHeader step1 step2 step3 step4 />
      <Row className='mt-5'>
        <Col md={8}>
          <h3>{`${userInfo.name}, Order Summary`}</h3>
          <ListGroup variant='flush'>
            <ListGroup.Item style={{ border: '1px solid whitesmoke' }}>
              <h4 className='mb-4'>Contact Information</h4>
              <p>
                <strong className='mr-4'>EMAIL:</strong>
                {userInfo.email}
              </p>
            </ListGroup.Item>

            <ListGroup.Item
              className='my-3'
              style={{ border: '1px solid whitesmoke' }}
            >
              <h4 className='mb-4'>Shipping Address</h4>
              <ul style={{ listStyle: 'none' }}>
                <li>{cart.shippingAddress.address}</li>
                <li>{cart.shippingAddress.city}</li>
                <li>{cart.shippingAddress.postcode}</li>
                <li>{cart.shippingAddress.country}</li>
              </ul>
            </ListGroup.Item>

            <ListGroup.Item
              className='my-3'
              style={{ border: '1px solid whitesmoke' }}
            >
              <h4 className='mb-4'>Payment Method</h4>
              <p>
                <strong className='mr-4'>METHOD:</strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item
              className='my-3'
              style={{ border: '1px solid whitesmoke' }}
            >
              <h4 className='mb-4'>Order Items</h4>
              {cart.cartItems.length === 0 ? (
                <Message>Your Cart is Empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.productId}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.quantity} x £{item.price} = £
                          {item.quantity * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <h3>Payment Summary</h3>
          <ListGroup variant='flush'>
            <ListGroup.Item className='my-3'>
              <Row>
                <Col>SUB TOTAL</Col>
                <Col>£{cart.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item className='my-3'>
              <Row>
                <Col>SHIPPING</Col>
                <Col>£{cart.shippingPrice}</Col>
              </Row>
              <span style={{ color: 'red' }}>{freeShipping}</span>
            </ListGroup.Item>
            <ListGroup.Item className='my-3'>
              <Row>
                <Col>TAX</Col>
                <Col>£{cart.taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item className='my-3'>
              <Row>
                <Col style={{ fontWeight: '800' }}>TOTAL</Col>
                <Col style={{ fontWeight: '800' }}>£{cart.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              {error && <Message variant='danger'>{error}</Message>}
            </ListGroup.Item>
            <Button
              type='button'
              className='btn-block'
              disabled={cart.cartItems.length === 0}
              onClick={placeOrderHandler}
            >
              PLACE ORDER
            </Button>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
