import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
  Modal,
} from 'react-bootstrap';
import RatingIcon from '../components/rating/Rating';
import Rating from '../components/Rating';
import {
  productDetailsAction,
  productReviewCreateAction,
} from '../actions/productActions';
import { addToCartAction } from '../actions/cartActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ColorChooser from '../components/ColorChooser';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

const ProductScreen = ({ history, match }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('S');
  const [selectedColor, setSelectedColor] = useState('white');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const productId = match.params.id;

  const productDetails = useSelector((state) => state.productDetails);
  const { product, error, loading } = productDetails;

  // Review State from store
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    error: errorReview,
    loading: loadingReview,
    success: successReview,
    message: messageReview,
  } = productReviewCreate;

  // Cart State form Store
  const cart = useSelector((state) => state.cart);
  const foundOnBasket = () =>
    cart.cartItems.find((item) => item.productId === product._id);

  // Go to cart page when clicked along with some values
  const addToCartHandler = () => {
    if (foundOnBasket()) {
      console.log('yet to be removed from cart');
    } else {
      dispatch(
        addToCartAction(productId, quantity, selectedColor, selectedSize)
      );
      console.log('Item added to cart');
    }
    // history.push(
    //   `/cart/${productId}?size=${selectedSize}&qty=${quantity}&color=${selectedColor}`
    // );
  };

  // User Info from Store
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successReview) {
      setRating(0);
      setComment('');
      setMessage(messageReview.message);
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    } else if (errorReview) {
      setRating(0);
      setComment('');
      setMessage(errorReview);
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(productDetailsAction(productId));
  }, [productId, dispatch, successReview, errorReview, messageReview]);

  // State change callback to change color state
  const onColorChangeHandle = (color) => {
    setSelectedColor(color);
  };

  // Rating Component methods
  const onMouseEnter = (index) => {
    setHoverRating(index);
  };

  const onMouseLeave = () => {
    setHoverRating(0);
  };

  const onSaveRating = (index) => {
    setRating(index);
  };

  // Modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const reviewSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      productReviewCreateAction(productId, {
        rating,
        comment,
      })
    );
    handleShow();
  };

  return product ? (
    <>
      {/* <Link to='/'>
        <Button className='btn-dark my-3'>Go Back</Button>
        </Link> */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thanks for Your Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
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
                          {product.color
                            ? product.color.length >= 1 && (
                                <ColorChooser
                                  availableColors={product.color}
                                  onColorChange={onColorChangeHandle}
                                />
                              )
                            : null}
                          {/* <i
                          className='fas fa-circle fa-3x m-3'
                          style={{
                            color: `${product.color}`,
                            borderRadius: '50%',
                            border: '1px solid black',
                          }}
                        ></i> */}
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
                        disabled={
                          product.size ? product.size.length === 0 : null
                        }
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
                    {product.price ? `£${product.price.toFixed(2)}` : null}
                  </h1>
                  <p>
                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </p>
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
                        {foundOnBasket()
                          ? 'Remove From Basket'
                          : 'Add To Basket'}
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
                    <h5 style={{ fontWeight: '800' }}>Review Product</h5>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey='1'>
                    <Card.Body>
                      <ListGroup>
                        <ListGroup.Item>
                          <h5>Write a Review</h5>
                          {errorReview && (
                            <Message variant='danger'>{errorReview}</Message>
                          )}
                          {userInfo ? (
                            <Form onSubmit={reviewSubmitHandler}>
                              <Form.Group controlId='rating'>
                                <Form.Label>Rating:</Form.Label>
                                <div className='flex'>
                                  {[1, 2, 3, 4, 5].map((index) => (
                                    <RatingIcon
                                      key={index}
                                      index={index}
                                      rating={rating}
                                      hoverRating={hoverRating}
                                      onMouseEnter={onMouseEnter}
                                      onMouseLeave={onMouseLeave}
                                      onSaveRating={onSaveRating}
                                    />
                                  ))}
                                </div>
                              </Form.Group>
                              <Form.Group>
                                <Form.Label>Comment:</Form.Label>
                                <Form.Control
                                  as='textarea'
                                  row='3'
                                  value={comment}
                                  onChange={(e) => setComment(e.target.value)}
                                ></Form.Control>
                              </Form.Group>
                              <Button
                                type='submit'
                                className='btn-block'
                                variant='primary'
                              >
                                Submit
                              </Button>
                            </Form>
                          ) : (
                            <Message>
                              Please <Link to='/login'>Sign In</Link> to Write a
                              review
                            </Message>
                          )}
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card className='rounded'>
                  <Accordion.Toggle as={Card.Header} eventKey='2'>
                    <h5 style={{ fontWeight: '800' }}>Read Reviews</h5>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey='2'>
                    <Card.Body>
                      <h5>See What Our Customers say about this Product</h5>
                      {product.reviews.length === 0 && (
                        <Message>No Reviews</Message>
                      )}
                      <ListGroup variant='flush'>
                        {product.reviews.map((review) => (
                          <ListGroup.Item key={review._id}>
                            <strong style={{ fontWeight: 'bold' }}>
                              {review.name}
                            </strong>
                            <span className='ml-5'>
                              reviewed at {review.createdAt.substring(0, 10)}
                            </span>
                            <Rating value={review.rating} />
                            <p className='mt-3'>{review.comment}</p>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Card.Body>
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
          {/* <Row>
            <Col md={6}>
              <h4>See What Our Customers say about this Product</h4>
            </Col>
          </Row> */}
        </>
      )}
    </>
  ) : (
    <Loader />
  );
};

export default ProductScreen;
