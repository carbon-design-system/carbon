import PropTypes from 'prop-types';
import React from 'react';

const TextInputSkeleton = ({ hideLabel, id }) => {
  const label = hideLabel ? null : (
    <label className="bx--label bx--skeleton" htmlFor={id} />
  );

  return (
    <div className="bx--form-item">
      {label}
      <div className="bx--skeleton bx--text-input" />
    </div>
  );
};

TextInputSkeleton.propTypes = {
  hideLabel: PropTypes.bool,
};

export default TextInputSkeleton;
