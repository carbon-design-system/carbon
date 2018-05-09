import PropTypes from 'prop-types';
import React from 'react';

const SelectSkeleton = ({ hideLabel, id }) => {
  const label = hideLabel ? null : (
    <label className="bx--label bx--skeleton" htmlFor={id} />
  );

  return (
    <div className="bx--form-item">
      {label}
      <div className="bx--select bx--skeleton">
        <select className="bx--select-input" />
      </div>
    </div>
  );
};

SelectSkeleton.propTypes = {
  hideLabel: PropTypes.bool,
};

export default SelectSkeleton;
