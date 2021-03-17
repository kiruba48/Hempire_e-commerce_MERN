import React, { useState, useEffect } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
  fetchOrderDetails,
  orderPaymentDetailsAction,
  orderDeliveryUpdateAction,
} from '../actions/orderActions';
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants';
import { cartResetAction } from '../actions/cartActions';

const OrderScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false);
  const orderId = match.params.id;

  // const { cart, userLogin } = useSelector((state) => ({
  //   cart: state.cart,
  //   userLogin: state.userLogin,
  // }));

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetails;
  let itemsPrice;
  let shippingPrice;
  let orderPrice;
  let totalPrice;

  if (!loading) {
    itemsPrice = order.itemsPrice;
    shippingPrice = order.shippingPrice;
    orderPrice = order.taxPrice;
    totalPrice = order.totalPrice;
  }

  const paymentUpdate = useSelector((state) => state.paymentUpdate);
  const { loading: loadingPay, success: successPay } = paymentUpdate;

  const deliveryUpdate = useSelector((state) => state.deliveryUpdate);
  const { loading: loadingDelivery, success: successDelivery } = deliveryUpdate;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
    // Fetching paypal client Id for add paypal script to our app document.
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get(`/api/config/paypal`);
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      // Dynamically adding paypal script into our document.
      document.body.appendChild(script);
    };
    if (!order || order._id !== orderId || successPay || successDelivery) {
      dispatch(orderPaymentDetailsAction({ type: ORDER_PAY_RESET }));
      dispatch(orderDeliveryUpdateAction({ type: ORDER_DELIVER_RESET }));
      // Fetch the order details by id.
      dispatch(fetchOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [
    history,
    userInfo,
    dispatch,
    orderId,
    order,
    successPay,
    successDelivery,
  ]);

  // On payment success, this updates the database with the payment result.
  // POST /api/orders/:id/pay
  const successPaymentHandler = (paymentResult) => {
    dispatch(orderPaymentDetailsAction(orderId, paymentResult));
    dispatch(cartResetAction());
  };

  const handleDelivery = () => {
    dispatch(orderDeliveryUpdateAction(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>ORDER ID: {order._id}</h1>
      <Row className='mt-5'>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item style={{ border: '1px solid whitesmoke' }}>
              <h4 className='mb-4'>Order Information</h4>
              <p>
                <strong className='mr-4'>NAME:</strong>
                {order.user.name}
              </p>
              <p>
                <strong className='mr-4'>EMAIL:</strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
            </ListGroup.Item>

            <ListGroup.Item
              className='my-3'
              style={{ border: '1px solid whitesmoke' }}
            >
              <h4 className='mb-4'>Shipping Address</h4>
              <ul style={{ listStyle: 'none' }}>
                <li>{order.shippingAddress.address}</li>
                <li>{order.shippingAddress.city}</li>
                <li>{order.shippingAddress.postcode}</li>
                <li>{order.shippingAddress.country}</li>
              </ul>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on{order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item
              className='my-3'
              style={{ border: '1px solid whitesmoke' }}
            >
              <h4 className='mb-4'>Payment Method</h4>
              <p>
                <strong className='mr-4'>METHOD:</strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item
              className='my-3'
              style={{ border: '1px solid whitesmoke' }}
            >
              <h4 className='mb-4'>Order Items</h4>
              {order.orderItems.length === 0 ? (
                <Message>Your Cart is Empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
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
                <Col>Sub Total:</Col>
                <Col>£ {itemsPrice.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item className='my-3'>
              <Row>
                <Col>Shipping:</Col>
                <Col>£ {shippingPrice.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item className='my-3'>
              <Row>
                <Col>Tax Price:</Col>
                <Col>£ {orderPrice.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>
            {/* <ListGroup.Item className='my-3'>
            </ListGroup.Item> */}
            <Row className='my-3'>
              <Col style={{ fontWeight: '800' }}>
                <h3>TOTAL</h3>
              </Col>
              <Col className='my-3' style={{ fontWeight: '800' }}>
                <h4>£ {totalPrice.toFixed(2)}</h4>
              </Col>
            </Row>

            {!order.isPaid && (
              <ListGroup.Item>
                {loadingPay && <Loader />}
                {!sdkReady ? (
                  <Loader />
                ) : (
                  <PayPalButton
                    amount={order.totalPrice}
                    onSuccess={successPaymentHandler}
                  />
                )}
              </ListGroup.Item>
            )}
            {loadingDelivery && <Loader />}
            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isDelivered && (
                <ListGroup.Item>
                  <Button className='button btn-block' onClick={handleDelivery}>
                    Mark as Delivered
                  </Button>
                </ListGroup.Item>
              )}
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
