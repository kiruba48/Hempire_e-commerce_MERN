import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel, Image, Row, Col } from 'react-bootstrap';
import Loader from './Loader';
import Message from './Message';
import { listTopProducts } from '../actions/productActions';

const ProductCarousal = () => {
  const dispatch = useDispatch();

  const productTopList = useSelector((state) => state.productTopList);
  const { products, error, loading } = productTopList;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='carousel'>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image
              src={product.image}
              alt={product.name}
              className='d-block'
              fluid
            />
            <Carousel.Caption className='carousel-caption'>
              <h2>{product.name}</h2>
              <h2>(£{product.price})</h2>
            </Carousel.Caption>
            {/* <Row>
              <Col md={8}>
              </Col>
              <Col md={4}>
              </Col>
            </Row> */}
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousal;
