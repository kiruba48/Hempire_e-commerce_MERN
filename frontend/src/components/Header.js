import React from 'react';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container } from 'react-bootstrap';
import CartToggle from '../components/cart/CartToggle';
import Badge from '../components/Badge';

const Header = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <header>
      <Navbar bg='light' expand='lg' collapseOnSelect>
        <Container>
          <Container>
            <LinkContainer to='/'>
              <Navbar.Brand>HEMPIRE</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='ml-auto'>
                {/* <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart px-2'></i>Cart
                </Nav.Link>
              </LinkContainer> */}

                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user px-2'></i>Sign In
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Container>
          <Container style={{ width: '5rem' }}>
            <CartToggle>
              {({ onClickToggle }) => (
                <button
                  className='button-link navigation-menu-link basket-toggle'
                  onClick={onClickToggle}
                >
                  <Badge count={cartItems.length}>
                    <i
                      className='fa fa-shopping-bag'
                      style={{ fontSize: '1.2rem' }}
                    />
                  </Badge>
                </button>
              )}
            </CartToggle>
          </Container>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
