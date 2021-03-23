import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import Message from '../components/Message';
import { Col, Row } from 'react-bootstrap';
import { listOfProductsBySection } from '../actions/productActions';
import ProductCarousal from '../components/ProductCarousal';
import useScrollTop from '../hooks/useScrollTop';
import SectionPaginate from '../components/SectionPaginate';
import Product from '../components/Product';
import Loader from '../components/Loader';

function SectionScreen({ location, match }) {
  useScrollTop();

  const pageNumber = match.params.pageNumber || 1;
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200);
  const [size, setSize] = useState('S');

  const dispatch = useDispatch();
  // const [products, setProducts] = useState([]);
  let section;
  let query;
  if (pageNumber === 1) {
    section = location.search ? location.search.split('=')[1] : null;
  } else {
    query = location.search.split('/')[0];

    section = query.split('=')[1];
  }

  // Getting the data from our State repository
  const productSectionList = useSelector((state) => state.productSectionList);
  const { loading, error, products, page, sectionPages } = productSectionList;

  // console.log(sectionPages);

  useEffect(() => {
    dispatch(
      listOfProductsBySection(section, minPrice, maxPrice, size, pageNumber)
    );
    // eslint-disable-next-line
  }, [section, dispatch, pageNumber]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      listOfProductsBySection(section, minPrice, maxPrice, size, pageNumber)
    );
  };

  // console.log(section, pageNumber);

  return (
    <>
      <ProductCarousal />
      <h1 className='my-5'>Shop</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col sm={12} md={3} style={{ border: '1px solid whitesmoke' }}>
            <Form className='my-3' onSubmit={handleSubmit}>
              {/* controlId='minpricerange' */}
              <Form.Group>
                <Form.Label>
                  <h4>Price</h4>
                </Form.Label>
                <Form.Control
                  type='range'
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  custom
                  min={20}
                  max={200}
                  step={10}
                  id='minpricerange'
                />
                <Row>
                  <Col md={4}>
                    <p className='mt-3'>MIN:</p>
                  </Col>
                  <Col md={4}>
                    <Form.Control
                      value={`£ ${minPrice}`}
                      style={{ width: '6rem' }}
                      id='min'
                      readOnly
                    />
                  </Col>
                </Row>
              </Form.Group>
              {/* controlId='maxpricerange' */}
              <Form.Group>
                <Form.Control
                  type='range'
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  custom
                  min={20}
                  max={200}
                  step={10}
                  id='maxpricerange'
                />
                <Row>
                  <Col md={4}>
                    <p className='mt-3'>MAX:</p>
                  </Col>
                  <Col md={4}>
                    <Form.Control
                      value={`£ ${maxPrice}`}
                      style={{ width: '6rem' }}
                      readOnly
                      id='max'
                    />
                  </Col>
                </Row>
              </Form.Group>
              <h4 className='mt-5'>size</h4>

              <Form.Group controlId='size' className='mt-3'>
                <Form.Check
                  className='mt-2'
                  custom
                  type='radio'
                  label='S'
                  value='S'
                  id='S'
                  onChange={(e) => setSize(e.target.value)}
                ></Form.Check>
                <Form.Check
                  className='mt-2'
                  custom
                  type='radio'
                  label='M'
                  value='M'
                  id='M'
                  onChange={(e) => setSize(e.target.value)}
                ></Form.Check>
                <Form.Check
                  className='mt-2'
                  custom
                  type='radio'
                  label='L'
                  value='L'
                  id='L'
                  onChange={(e) => setSize(e.target.value)}
                ></Form.Check>
                <Form.Check
                  className='mt-2'
                  custom
                  type='radio'
                  label='XL'
                  value='XL'
                  id='XL'
                  onChange={(e) => setSize(e.target.value)}
                ></Form.Check>
              </Form.Group>
              <Button type='submit' className='button btn-block'>
                Search
              </Button>
            </Form>
          </Col>
          <Col sm={12} md={9}>
            <Row>
              {products.length <= 0 && (
                <div className='basket-empty'>
                  <h5 className='basket-empty-msg'>
                    No Products! Please search for different range
                  </h5>
                </div>
              )}
              {products.map((product) => {
                return (
                  <Col sm={8} md={4} key={product._id}>
                    <Product product={product} />
                  </Col>
                );
              })}
            </Row>
            <SectionPaginate
              pages={sectionPages}
              page={page}
              section={section}
            />
          </Col>
        </Row>
      )}
    </>
  );
}

export default SectionScreen;
