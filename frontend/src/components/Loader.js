import React from 'react';
import { Spinner } from 'react-bootstrap';

function Loader() {
  return (
    <Spinner
      animation='grow'
      variant='dark'
      role='status'
      aria-hidden='true'
      style={{
        width: '100px',
        height: '100px',
        margin: 'auto',
        display: 'block',
      }}
    >
      <span className='sr-only'>Loading</span>
    </Spinner>
  );
}

export default Loader;
