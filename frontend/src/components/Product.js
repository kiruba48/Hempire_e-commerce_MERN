import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card
      border='light'
      className='my-3 p-3 rounded'
      // style={{ boxShadow: '0px 1px 8px 0px rgba(0,0,0,0.50)' }}
    >
      <Link to={`/product/${product._id}`}>
        <Card.Img
          className='image-small-screen'
          style={{
            height: '20rem',
            boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.50)',
          }}
          variant='top'
          src={product.image}
        />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <h5>{product.name}</h5>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          {product.sex === 'men' ? (
            <p>MEN's</p>
          ) : product.sex === 'women' ? (
            <p>WOMEN's</p>
          ) : null}
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as='h3'>${product.price}</Card.Text>
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
  );
};

export default Product;
