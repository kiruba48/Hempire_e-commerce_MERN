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
    <Carousel pause='hover'>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Row>
              <Col md={8}>
                <Image
                  src={product.image}
                  alt={product.name}
                  className='d-block'
                  style={{
                    height: '30rem',
                    width: '80%',
                    overflow: 'hidden',
                    marginLeft: '15rem',
                  }}
                  fluid
                />
              </Col>
              <Col md={4}>
                <Carousel.Caption className='carousel-caption text-right'>
                  <h2 style={{ color: 'black' }}>{product.name}</h2>
                  <h2 style={{ color: 'black' }}>(£{product.price})</h2>
                </Carousel.Caption>
              </Col>
            </Row>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousal;
