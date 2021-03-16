import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const Model = ({ show, modalBody, closeModal, confirmDelete, id }) => {
  const handleClickDelete = () => {
    confirmDelete(id);
  };

  return (
    <>
      <Modal show={show} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={closeModal}>
            Close
          </Button>
          <Button variant='primary' onClick={handleClickDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Model;
