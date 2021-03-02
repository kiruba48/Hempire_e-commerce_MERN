import React from 'react';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ButtonToolbar,
  ButtonGroup,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import products from '../products';

const ProductScreen = ({ match }) => {
  const product = products.find((p) => p._id == match.params.id);
  return (
    <>
      <Link to='/'>
        <Button className='btn-dark my-3'>Go Back</Button>
      </Link>
      <Row>
        <Col md={7}>
          <Row className='my-3'>
            <Col>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
          </Row>
          <Row>
            <Col>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
          </Row>
        </Col>
        <Col md={5}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h1 style={{ color: 'black' }}>{product.name}</h1>
            </ListGroup.Item>
          </ListGroup>

          <ListGroup variant='flush'>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} REVIEWS`}
                color='orange'
              />
            </ListGroup.Item>
          </ListGroup>

          <ListGroup variant='flush' className='my-5'>
            <ListGroup.Item>
              <Row>
                <Col md={6}>
                  <h3 style={{ color: 'black' }}>COLOR:</h3>
                </Col>
                <Col md={6}>
                  <Row>
                    <Col>
                      <i
                        className='fas fa-circle fa-3x py-3'
                        style={{ color: `${product.color}` }}
                      ></i>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <h3 style={{ color: 'black' }}>SIZE:</h3>
                </Col>
                <Col md={6}>
                  <ButtonToolbar aria-label='Toolbar with button groups'>
                    <ButtonGroup className='mr-2' aria-label='First group'>
                      {product.size.map((p) => {
                        return (
                          <Button
                            style={{ border: '1px wheat solid' }}
                            className='btn-light mx-1'
                          >
                            {p}
                          </Button>
                        );
                      })}
                    </ButtonGroup>
                  </ButtonToolbar>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <h1 className='my-3'>{`$${product.price.toFixed(2)}`}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col md={4}>a</Col>
                <Col md={8}>b</Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
