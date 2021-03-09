import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listOfProducts } from '../actions/productActions';
import Sections from '../components/Sections';

// import products from '../products';

const HomeScreen = () => {
  const dispatch = useDispatch();

  // Getting the data from our State repository
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listOfProducts()); //dispatching action to reducers
  }, [dispatch]);

  return (
    <>
      <Sections />
      <h1 className='my-5'>Featured Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => {
            return (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product} />
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
