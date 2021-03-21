import React from 'react';

const Banner = () => {
  return (
    <div className='header'>
      <div className='header__text-container'>
        {/* <h1 className='primary-heading'>Make way 2021</h1> */}
        <h1 className='primary-heading'>
          Make way
          <br />
          <span className='highlight banner-span'>2021</span>
        </h1>
        {/* <Link to=``>
        <Button style={{ width: '15rem' }} className='btn-light'>
          Shop
        </Button>
        </Link> */}
      </div>
    </div>
  );
};

export default Banner;
