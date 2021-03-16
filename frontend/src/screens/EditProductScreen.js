import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import {
  productDetailsAction,
  productUpdateAction,
} from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

const EditProductScreen = ({ history, match }) => {
  const productId = match.params.id;

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState('');
  const [image, setImage] = useState('');
  const [sex, setSex] = useState('');
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [numReviews, setNumReviews] = useState(0);
  const [rating, setRating] = useState(0);

  const dispatch = useDispatch();

  //   Getting the user Info from global state
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    success: successUpdate,
    loading: loadingUpdate,
    error: errorUpdate,
  } = productUpdate;

  useEffect(() => {
    if (userInfo && !userInfo.isAdmin) {
      history.push('/login');
    }

    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push('/admin/productlist');
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(productDetailsAction(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setBrand(product.brand);
        setImage(product.image);
        setColor(product.color);
        setSex(product.sex);
        setSize(product.size);
        setCountInStock(product.countInStock);
        setDescription(product.description);
        setNumReviews(product.numReviews);
        setRating(product.rating);
      }
    }
  }, [userInfo, history, product, productId, dispatch, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    // update product
    dispatch(
      productUpdateAction(productId, {
        name,
        price,
        brand,
        image,
        color,
        sex,
        size,
        countInStock,
        description,
        numReviews,
        rating,
      })
    );
  };

  return (
    <>
      <FormContainer>
        <h1 className='my-3'>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='color'>
              <Form.Label>Color</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter color'
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='sex'>
              <Form.Label>Sex</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter sex'
                value={sex}
                onChange={(e) => setSex(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='size'>
              <Form.Label>Size</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter size'
                value={size}
                onChange={(e) => setSize(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='numReviews'>
              <Form.Label>Number Of Reviews</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter numReviews'
                value={numReviews}
                onChange={(e) => setNumReviews(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='rating'>
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter rating'
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </Form.Group>

            <Button variant='primary' type='submit' className='mr-3'>
              Update
            </Button>
            <Link to='/admin/productlist' className='btn btn-dark my-3'>
              Go Back
            </Link>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default EditProductScreen;
