import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import axios from 'axios';

import Product from '../components/Product';
import Loader from '../components/Loader';

function SectionScreen({ location }) {
  const [products, setProducts] = useState([]);
  const section = location.search ? location.search.split('=')[1] : null;
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(`/api/products?sex=${section}`);
      setProducts(data);
    };
    fetchProducts();
  }, [section]);
  return products ? (
    <>
      <h1 className='my-5'>Shop</h1>
      <Row>
        <Col sm={12} md={3}>
          Filters
        </Col>
        <Col sm={12} md={9}>
          <Row>
            {products.map((product) => {
              return (
                <Col sm={8} md={5} key={product._id}>
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </>
  ) : (
    <Loader />
  );
}

export default SectionScreen;
