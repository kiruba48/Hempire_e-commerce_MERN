import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckOutHeader = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='justify-content-center md-5'>
      <Nav.Item>
        {step1 ? (
          <LinkContainer to='/login'>
            <Nav.Link>
              <h5>Sign In</h5>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            {/* <h4></h4> */}
            SIGN IN
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to='/shipping'>
            <Nav.Link>
              <h5>Shipping</h5>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            {/* <h4></h4> */}
            SHIPPING
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to='/payment'>
            <Nav.Link>
              <h5>Payment</h5>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            {/* <h4></h4> */}
            PAYMENT
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to='/placeOrder'>
            <Nav.Link>
              <h5>Place Order</h5>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            {/* <h4></h4> */}
            PLACE ORDER
          </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckOutHeader;
