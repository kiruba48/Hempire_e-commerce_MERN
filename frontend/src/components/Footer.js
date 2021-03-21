import React from 'react';
import {
  Container,
  Row,
  Col,
  ButtonToolbar,
  ButtonGroup,
  Button,
} from 'react-bootstrap';

const Footer = () => {
  return (
    <footer style={{ borderTop: '1px solid silver' }} className='my-3'>
      <Container>
        <Row>
          <Col className='my-3' md={6}>
            <strong>
              <span>
                Developed by{' '}
                <a
                  href='https://github.com/kiruba48'
                  target='_blank'
                  rel='noreferrer'
                >
                  KIRUBA
                </a>
              </span>
            </strong>
            <h5 className='my-3'>CONTACT ME:</h5>
            <ButtonToolbar
              aria-label='Toolbar with button groups'
              className='align-right'
            >
              <ButtonGroup className='pr-2 ' aria-label='First group'>
                <Button className='btn-light rounded'>
                  <a
                    href='https://www.linkedin.com/in/kiruba48'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <i className='fab fa-linkedin-in fa-2x'></i>
                  </a>
                </Button>
                <Button className='btn-light rounded'>
                  <a
                    href='https://github.com/kiruba48'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <i className='fab fa-github fa-2x'></i>
                  </a>
                </Button>
                <Button className='btn-light rounded'>
                  <a
                    href='https://twitter.com/KirubakaranMut3'
                    target='_blank'
                    rel='noreferrer'
                  >
                    {' '}
                    <i className='fab fa-twitter fa-2x'></i>
                  </a>
                </Button>
              </ButtonGroup>
            </ButtonToolbar>
          </Col>
          <Col md={6}></Col>
        </Row>
        <Row>
          <Col className='text-center py-3'>Copyright &copy; HEMPIRE</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
