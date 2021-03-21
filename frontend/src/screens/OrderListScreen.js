import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { fetchAllOrdersAction } from '../actions/orderActions';
import Modal from '../components/Model';

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [id, setId] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const listOfAllOrders = useSelector((state) => state.listOfAllOrders);
  const { orders, success, error, loading } = listOfAllOrders;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
    if (userInfo && !userInfo.isAdmin) {
      history.push('/');
    }

    if (userInfo && userInfo.isAdmin) {
      // Fetch all orders
      dispatch(fetchAllOrdersAction());
    }
  }, [dispatch, history, userInfo]);

  const confirmDelete = (id) => {
    handleClose();
  };

  const handleDelete = (id) => {
    handleShow();
    setId(id);
  };

  return (
    <>
      <Modal
        show={show}
        modalBody={`You want to delete the user`}
        closeModal={handleClose}
        confirmDelete={confirmDelete}
        id={id}
      />
      <h1>ORDERS</h1>
      {/* {errorDelete && <Message variant='danger'>{errorDelete}</Message>} */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }}>NAME</th>
              <th style={{ textAlign: 'center' }}>EMAIL</th>
              <th style={{ textAlign: 'center' }}>DATE</th>
              <th style={{ textAlign: 'center' }}>PRICE</th>
              <th style={{ textAlign: 'center' }}>PAYMENT</th>
              <th style={{ textAlign: 'center' }}>DELIVERY</th>
              <th style={{ textAlign: 'center' }}>ORDER ID</th>
              <th style={{ textAlign: 'center' }}>DETAILS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.user && order.user.name}</td>
                <td>
                  <a href={`mailto:${order.user.email}`}>
                    {order.user && order.user.email}
                  </a>
                </td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>{order._id}</td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-info-circle fa-2x'></i>
                    </Button>
                  </LinkContainer>
                  {/* <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => handleDelete(order._id)}
                  >
                    <i
                      className='fas fa-user-slash'
                      style={{ color: 'whitesmoke' }}
                    ></i>
                  </Button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
