import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { productCreateAction } from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

const CreateProductScreen = ({ history, match }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState('');
  const [image, setImage] = useState('');
  const [sex, setSex] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [numReviews, setNumReviews] = useState(0);
  const [rating, setRating] = useState(0);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  //   Getting the user Info from global state
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //   const productDetails = useSelector((state) => state.productDetails);
  //   const { product, loading, error } = productDetails;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate,
  } = productCreate;

  useEffect(() => {
    if (userInfo && !userInfo.isAdmin) {
      history.push('/login');
    }

    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      history.push('/admin/productlist');
    }
  }, [userInfo, history, dispatch, successCreate]);

  const uploadFileHandler = async (e) => {
    //   Upload Image
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const sizeArr = size.split(',');

  const colorArr = color.split(',');

  const submitHandler = (e) => {
    e.preventDefault();
    // update product
    dispatch(
      productCreateAction({
        user: userInfo._id,
        name,
        price,
        brand,
        image,
        sex,
        color: colorArr,
        size: sizeArr,
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
        <h1 className='my-3'>Create Product</h1>
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name *</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='price'>
            <Form.Label>Price *</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='brand'>
            <Form.Label>Brand *</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter brand'
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='color'>
            <Form.Label>Color *</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter color'
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <span style={{ color: 'red' }}>Comma Seperated if Multiple</span>
          </Form.Group>

          <Form.Group controlId='image'>
            <Form.Label>Image *</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter image'
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <Form.File
              id='image-file'
              label='Choose File'
              custom
              onChange={uploadFileHandler}
            ></Form.File>
            {uploading && <Loader />}
          </Form.Group>

          <Form.Group controlId='sex'>
            <Form.Label>Sex *</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter sex'
              value={sex}
              onChange={(e) => setSex(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='size'>
            <Form.Label>Size *</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter size'
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
            <span style={{ color: 'red' }}>Comma Seperated if Multiple</span>
          </Form.Group>

          <Form.Group controlId='countInStock'>
            <Form.Label>Count In Stock *</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter countInStock'
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='description'>
            <Form.Label>Description *</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='numReviews'>
            <Form.Label>Number Of Reviews *</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter numReviews'
              value={numReviews}
              onChange={(e) => setNumReviews(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='rating'>
            <Form.Label>Rating *</Form.Label>
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
        {/* {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          
        )} */}
      </FormContainer>
    </>
  );
};

export default CreateProductScreen;
