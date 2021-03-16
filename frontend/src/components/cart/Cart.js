import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Form, Button, Image } from 'react-bootstrap';
import CartToggle from './CartToggle';
// import Message from '../components/Message';
// import { addToCartAction } from '../actions/cartActions';
import {
  addToCartAction,
  removeFromCartAction,
} from '../../actions/cartActions';

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const history = useHistory();

  //   Remove item from cart
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCartAction(id));
  };
  //   Total amount calculation
  const calculateTotal = () => {
    return cartItems
      .reduce((acc, item) => acc + item.quantity * item.price, 0)
      .toFixed(2);
  };

  //   Handle checkout
  const checkoutHandler = () => {
    if (cartItems.length !== 0) {
      document.body.classList.remove('is-basket-open');
      history.push('/login?redirect=shipping');
    }
  };

  //   Close Cart
  const closeCart = () => {
    document.body.classList.remove('is-basket-open');
  };
  return (
    <div className='basket'>
      <div className='basket-list'>
        <div className='basket-header'>
          <h3 className='basket-header-title'>
            My Basket &nbsp;
            <span>
              (
              {` ${cartItems.length} ${
                cartItems.length > 1 ? 'items' : 'item'
              }`}
              )
            </span>
          </h3>
          <CartToggle>
            {({ onClickToggle }) => (
              <button
                style={{ border: 'none', backgroundColor: 'white' }}
                className='basket-toggle'
                onClick={onClickToggle}
              >
                <i className='fas fa-times fa-2x'></i>
              </button>
            )}
          </CartToggle>
        </div>
        {cartItems.length <= 0 && (
          <div className='basket-empty'>
            <h5 className='basket-empty-msg'>Your basket is empty</h5>
          </div>
        )}
        <ListGroup variant='flush'>
          {cartItems.map((item) => (
            <ListGroup.Item key={item.productId}>
              <Row>
                <Col md={2}>
                  <Image src={item.image} alt={item.name} fluid rounded />
                </Col>
                <Col md={4} style={{ marginTop: '1.5rem' }}>
                  <Link to={`/product/${item.productId}`}>
                    <h4 onClick={closeCart}>{item.name}</h4>
                  </Link>
                  <span>{`Color ${item.color} / Size ${item.size}`}</span>
                </Col>
                <Col md={2} style={{ marginTop: '1.5rem' }}>
                  <Form.Control
                    as='select'
                    className='rounded light'
                    value={item.quantity}
                    onChange={(e) =>
                      dispatch(
                        addToCartAction(
                          item.productId,
                          Number(e.target.value),
                          item.color,
                          item.size
                        )
                      )
                    }
                    disabled={item.countInStock === 0}
                  >
                    {[...Array(item.countInStock).keys()].map((
                      q //Creating array length of countInstock number and spread the values using keys()
                    ) => (
                      <option key={q + 1} value={q + 1}>
                        {q + 1}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
                <Col style={{ marginTop: '2rem' }} md={2}>
                  <h4>£{item.price.toFixed(2)}</h4>
                  <span>x{item.quantity}</span>
                </Col>
                <Col md={2} style={{ marginTop: '1rem' }}>
                  <Button
                    type='button'
                    variant='light'
                    onClick={() => removeFromCartHandler(item.productId)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className='basket-checkout'>
        <div className='basket-total'>
          <p className='basket-total-title'>Subtotal:</p>
          <h2 className='basket-total-amount'>£{calculateTotal()}</h2>
        </div>
        <Button
          type='button'
          className='basket-checkout-button btn-block'
          disabled={cartItems.length === 0}
          onClick={checkoutHandler}
        >
          CHECKOUT
        </Button>
      </div>
    </div>
  );
}

export default Cart;
