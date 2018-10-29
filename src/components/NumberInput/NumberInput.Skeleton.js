import PropTypes from 'prop-types';
import React from 'react';

const NumberInputSkeleton = ({ hideLabel, id }) => {
  const label = hideLabel ? null : (
    // eslint-disable-next-line jsx-a11y/label-has-for,jsx-a11y/label-has-associated-control
    <label className="bx--label bx--skeleton" htmlFor={id} />
  );

  return (
    <div className="bx--form-item">
      {label}
      <div className="bx--number bx--skeleton" />
    </div>
  );
};

NumberInputSkeleton.propTypes = {
  hideLabel: PropTypes.bool,
};

export default NumberInputSkeleton;
