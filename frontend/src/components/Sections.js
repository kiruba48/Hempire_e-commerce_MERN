import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Sections() {
  return (
    <Container>
      <Row>
        <Col md={6} sm={12}>
          <Link to={`/section?sex=men`}>
            <Image
              className='img-fluid section-img'
              src='/images/section-men.png'
              fluid
            />
          </Link>
        </Col>
        <Col md={6} sm={12}>
          <Link to={`/section?sex=women`}>
            <Image
              className='img-fluid section-img'
              //   style={{ height: '20rem' }}
              src='/images/section-women.png'
              fluid
            />
          </Link>
        </Col>
      </Row>
      {/* <Row style={{ height: '30rem', overflow: 'hidden' }}>
        <Link src={`/product?sex=Unisex`}>
          <Image className='img-fluid' src='/images/section-unisex.jpg' fluid />
        </Link>
      </Row> */}
    </Container>
  );
}

export default Sections;
