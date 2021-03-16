import React, { useState, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CheckOutHeader from '../components/CheckOutHeader';

import { choosePaymentMethodAction } from '../actions/cartActions';
import FormContainer from '../components/FormContainer';

const ChoosePaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
  }, [history, userInfo]);

  if (!shippingAddress) {
    history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(choosePaymentMethodAction(paymentMethod));
    history.push('/placeOrder');
  };

  return (
    <FormContainer>
      <CheckOutHeader step1 step2 step3 />

      <h1 className='mt-5 mb-3'>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-3'>
          <Form.Label as='legend'>Select Method *</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label={<i className='fab fa-paypal'> PayPal/Credit Card</i>}
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>

            <Form.Check
              className='my-3'
              type='radio'
              label={<i className='fab fa-stripe fa-2x'></i>}
              id='Stripe'
              name='paymentMethod'
              value='Stripe'
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button variant='primary' type='submit' className='mt-3'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ChoosePaymentScreen;
