import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import CartToggle from '../components/cart/CartToggle';
import Badge from '../components/Badge';
import { logoutAction } from '../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();

  // Get the stored user login info
  const { cart, userLogin } = useSelector((state) => ({
    cart: state.cart,
    userLogin: state.userLogin,
  }));
  const { cartItems } = cart;
  const { userInfo } = userLogin;

  const handleLogout = () => {
    dispatch(logoutAction());
  };

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
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <i className='fas fa-user px-2'></i>Sign In
                    </Nav.Link>
                  </LinkContainer>
                )}
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
