import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col sm={12} md={9} style={{ border: '0.5px solid whitesmoke' }}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
