import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getAllUserAction, userDeleteAction } from '../actions/userActions';
import Modal from '../components/Model';

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [id, setId] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userList = useSelector((state) => state.userList);
  const { users, error, loading } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete, error: errorDelete } = userDelete;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
    if (userInfo && !userInfo.isAdmin) {
      history.push('/');
    }

    if (userInfo && userInfo.isAdmin) {
      // dispatch(getAllUserAction({ type: USER_LIST_RESET }));
      dispatch(getAllUserAction());
    }
  }, [dispatch, history, successDelete, userInfo, userDelete]);

  const confirmDelete = (id) => {
    dispatch(userDeleteAction(id));
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
      <h1>Users</h1>
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table
          striped
          bordered
          hover
          responsive
          className='table-sm'
          variant='dark'
        >
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }}>NAME</th>
              <th style={{ textAlign: 'center' }}>EMAIL</th>
              <th style={{ textAlign: 'center' }}>USER TYPE</th>
              <th style={{ textAlign: 'center' }}>ID</th>
              <th style={{ textAlign: 'center' }}>UPDATE/DELETE</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                  <a
                    href={`mailto:${user.email}`}
                    style={{ color: 'whitesmoke' }}
                  >
                    {user.email}
                  </a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i
                      className='fas fa-users-cog ml-5'
                      style={{ color: 'whitesmoke' }}
                    ></i>
                  ) : (
                    <i
                      className='fas fa-users ml-5'
                      style={{ color: 'whitesmoke' }}
                    ></i>
                  )}
                </td>
                <td>{user._id}</td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='dark' className='btn-sm'>
                      <i
                        className='fas fa-user-edit'
                        style={{ color: 'whitesmoke' }}
                      ></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => handleDelete(user._id)}
                  >
                    <i
                      className='fas fa-user-slash'
                      style={{ color: 'whitesmoke' }}
                    ></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
