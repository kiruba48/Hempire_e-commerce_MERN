import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  Accordion,
  Form,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import { productDetailsAction } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductScreen = ({ history, match }) => {
  const [quantity, setQuantity] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');

  const dispatch = useDispatch();
  const productId = match.params.id;

  useEffect(() => {
    dispatch(productDetailsAction(productId));
  }, [productId, dispatch]);

  // Go to cart page when clicked along with some values
  const addToCartHandler = () => {
    history.push(`/cart/${productId}?size=${selectedSize}&qty=${quantity}`);
  };

  const productDetails = useSelector((state) => state.productDetails);
  const { product, error, loading } = productDetails;

  return (
    <>
      {/* <Link to='/'>
        <Button className='btn-dark my-3'>Go Back</Button>
        </Link> */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
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
                          className='fas fa-circle fa-3x m-3'
                          style={{
                            color: `${product.color}`,
                            borderRadius: '50%',
                            border: '1px solid black',
                          }}
                        ></i>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <h3 style={{ color: 'black' }}>SIZE:</h3>
                  </Col>
                  <Col md={4}>
                    <Form.Control
                      as='select'
                      className='rounded light'
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      disabled={product.size ? product.size.length === 0 : null}
                    >
                      {product.size
                        ? product.size.map((p) => (
                            <option key={p} value={p}>
                              {p}
                            </option>
                          ))
                        : null}
                    </Form.Control>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <h1 className='my-3'>
                  {product.price ? `$${product.price.toFixed(2)}` : null}
                </h1>
                <p>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</p>
              </ListGroup.Item>
              <ListGroup.Item className='my-3'>
                <Row>
                  <Col md={5}>
                    <Col>
                      <Form.Control
                        as='select'
                        className='rounded light'
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        disabled={product.countInStock === 0}
                      >
                        {[...Array(product.countInStock).keys()].map((
                          q //Creating array length of countInstock number and spread the values using keys()
                        ) => (
                          <option key={q + 1} value={q + 1}>
                            {q + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Col>
                  <Col md={7}>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block rounded'
                      type='button'
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col md={6}>
                    <i className='fas fa-shipping-fast fa-xl px-2'></i>
                    <strong>FREE SHIPPING</strong>
                  </Col>
                  <Col md={6}>
                    <i className='fas fa-credit-card fa-xl px-2'></i>
                    <strong>EASY PAYMENT</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>

            <Accordion defaultActiveKey='0'>
              <Card className='rounded'>
                <Accordion.Toggle as={Card.Header} eventKey='0'>
                  <h5 style={{ fontWeight: '800' }}>product info</h5>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey='0'>
                  <Card.Body>{product.description}</Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card className='rounded'>
                <Accordion.Toggle as={Card.Header} eventKey='1'>
                  <h5 style={{ fontWeight: '800' }}>Review</h5>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey='1'>
                  <Card.Body>Hello! I'm another body</Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>

            <Card className='rounded my-5'>
              <Row className='m-3'>
                <Col md={5}>
                  <strong>
                    <p
                      style={{
                        textTransform: 'uppercase',
                        fontWeight: '700',
                      }}
                    >
                      share with your friends
                    </p>
                  </strong>
                </Col>
                <Col md={7}>
                  <ButtonToolbar aria-label='Toolbar with button groups'>
                    <ButtonGroup className='pr-2' aria-label='First group'>
                      <Button className='btn-light rounded'>
                        <i className='fab fa-facebook-f fa-xl'></i>
                      </Button>
                      <Button className='btn-light rounded'>
                        <i className='fab fa-instagram fa-xl'></i>
                      </Button>
                      <Button className='btn-light rounded'>
                        <i className='fab fa-twitter fa-xl'></i>
                      </Button>
                      <Button className='btn-light rounded'>
                        <i className='fab fa-pinterest-p fa-xl'></i>
                      </Button>
                    </ButtonGroup>
                  </ButtonToolbar>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
