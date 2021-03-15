import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getAllUserAction } from '../actions/userActions';
import { USER_LIST_RESET } from '../constants/userConstants';

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userList = useSelector((state) => state.userList);
  const { users, error, loading, success } = userList;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else if (userInfo.isAdmin && !success) {
      dispatch(getAllUserAction({ type: USER_LIST_RESET }));
      dispatch(getAllUserAction());
    }

    if (userInfo && !userInfo.isAdmin) {
      history.push('/');
    }
  }, [dispatch, userInfo, history, success]);

  const handleDelete = (id) => {
    console.log(id);
  };

  return (
    <>
      <h1>Users</h1>
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
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>ID</th>
              <th>UPDATE/DELETE</th>
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
                  <LinkContainer to={`/user/${user._id}/edit`}>
                    <Button variant='dark' className='btn-sm'>
                      <i
                        className='fas fa-user-edit'
                        style={{ color: 'whitesmoke' }}
                      ></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='date'
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
