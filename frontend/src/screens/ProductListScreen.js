import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listOfProducts, productDeleteAction } from '../actions/productActions';
import Modal from '../components/Model';
import Paginate from '../components/Paginate';

const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  //   Modal states
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productList = useSelector((state) => state.productList);
  const { products, error, loading, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
    if (userInfo && !userInfo.isAdmin) {
      history.push('/');
    }

    if (userInfo && userInfo.isAdmin) {
      // dispatch(getAllUserAction({ type: USER_LIST_RESET }));
      dispatch(listOfProducts('', pageNumber));
    }
  }, [dispatch, history, userInfo, successDelete, pageNumber]);

  const confirmDelete = (id) => {
    // Delete product
    dispatch(productDeleteAction(id));
    handleClose();
  };

  const handleDelete = (id) => {
    handleShow();
    setId(id);
  };

  const createProductHandler = () => {
    console.log('create product');
  };

  return (
    <>
      <Modal
        show={show}
        modalBody={`You want to delete the Product`}
        closeModal={handleClose}
        confirmDelete={confirmDelete}
        id={id}
      />

      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <LinkContainer to={`/admin/products/createProduct`}>
            <Button
              className='btn btn-light my-3'
              onClick={createProductHandler}
            >
              <i className='fas fa-folder-plus'></i> Create Product
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th style={{ textAlign: 'center' }}>NAME</th>
                <th style={{ textAlign: 'center' }}>CATEGORY</th>
                <th style={{ textAlign: 'center' }}>PRICE</th>
                <th style={{ textAlign: 'center' }}>ID</th>
                <th style={{ textAlign: 'center' }}>BRAND</th>
                <th style={{ textAlign: 'center' }}>EDIT/DELETE</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.sex}</td>
                  <td>£{product.price}</td>
                  <td>{product._id}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='far fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => handleDelete(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate page={page} pages={pages} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
