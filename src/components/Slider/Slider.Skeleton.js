import PropTypes from 'prop-types';
import React from 'react';

const SliderSkeleton = ({ hideLabel, id }) => {
  const label = hideLabel ? null : (
    <label className="bx--label bx--skeleton" htmlFor={id} />
  );

  return (
    <div className="bx--form-item">
      {label}
      <div className="bx--slider-container bx--skeleton">
        <span className="bx--slider__range-label" />
        <div className="bx--slider">
          <div className="bx--slider__track" />
          <div className="bx--slider__filled-track" />
          <div className="bx--slider__thumb" />
        </div>
        <span className="bx--slider__range-label" />
      </div>
    </div>
  );
};

SliderSkeleton.propTypes = {
  hideLabel: PropTypes.bool,
};

export default SliderSkeleton;
