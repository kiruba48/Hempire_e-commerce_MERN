import React from 'react';

const Star = ({ value, min, max, color }) => {
  return (
    <span>
      <i
        style={{ color }}
        className={
          value >= max
            ? 'fas fa-star'
            : value >= min
            ? 'fas fa-star-half-alt'
            : 'far fa-star'
        }
      ></i>
    </span>
  );
};

export default Star;
