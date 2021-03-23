import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listOfProducts } from '../actions/productActions';
import Sections from '../components/Sections';
import Paginate from '../components/Paginate';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';

// import products from '../products';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();

  // Getting the data from our State repository
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listOfProducts(keyword, pageNumber)); //dispatching action to reducers
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      {!keyword && <Banner />}
      <Container>
        {!keyword ? (
          <Sections />
        ) : (
          <Link to='/' className='btn btn-light'>
            Go Back
          </Link>
        )}
        <h1 className='mt-5'>Featured Products</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <Row>
              {products.map((product) => {
                return (
                  <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                    <Product product={product} />
                  </Col>
                );
              })}
            </Row>
            <Paginate page={page} pages={pages} keyword={keyword && keyword} />
          </>
        )}
      </Container>
    </>
  );
};

export default HomeScreen;
