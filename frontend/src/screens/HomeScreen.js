import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import { listOfProducts } from '../actions/productActions';

// import products from '../products';

const HomeScreen = () => {
  const dispatch = useDispatch();

  // Getting the data from our State repository
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listOfProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Featured Products</h1>

      {loading ? (
        <h2>Loading</h2>
      ) : error ? (
        <h3>{error}</h3>
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
