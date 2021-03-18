import React from 'react';
import Star from './Star';

const Rating = (props) => {
  const {
    index,
    rating,
    hoverRating,
    onMouseEnter,
    onMouseLeave,
    onSaveRating,
  } = props;

  const fill = React.useMemo(() => {
    if (hoverRating >= index) {
      return 'orange';
    } else if (!hoverRating && rating >= index) {
      return 'orange';
    }
    return 'none';
  }, [rating, hoverRating, index]);

  return (
    <div
      className='cursor-pointer'
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={() => onMouseLeave()}
      onClick={() => onSaveRating(index)}
    >
      <Star fill={fill} />
    </div>
  );
};

export default Rating;
