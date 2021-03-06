import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Form, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import { addToCartAction } from '../actions/cartActions';

// Props:
//  match = to get the id
//  location = to get the query string from url
//  history = to redirect pages(routes)
function CartScreen({ match, location, history }) {
  // Getting the parameters to pass into action creator
  const productId = match.params.id;
  console.log(productId);
  const queryString = location.search ? location.search.split('&') : null;
  const quantity = queryString ? Number(queryString[1].split('=')[1]) : 1;
  const color = queryString ? queryString[2].split('=')[1] : 'white';
  const size = queryString ? queryString[0].split('=')[1] : 'S';

  const dispatch = useDispatch();

  // Getting the items from store
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) dispatch(addToCartAction(productId, quantity, color, size));
  }, [dispatch, productId, size, color, quantity]);

  return <div>Cart</div>;
}

export default CartScreen;
