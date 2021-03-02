import React from 'react';
import Star from './Star';
import PropTypes from 'prop-types';

const Rating = ({ value, text, color }) => {
  return (
    <div className='rating'>
      <Star value={value} max={1} min={0.5} color={color} />
      <Star value={value} max={2} min={1.5} color={color} />
      <Star value={value} max={3} min={2.5} color={color} />
      <Star value={value} max={4} min={3.5} color={color} />
      <Star value={value} max={5} min={4.5} color={color} />
      <span style={{ marginLeft: '0.5rem' }}>{text && text}</span>
    </div>
  );
};

Rating.defaultProps = {
  color: '#f8e825',
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};
export default Rating;
