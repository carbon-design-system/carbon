import PropTypes from 'prop-types';
import React from 'react';

const DatePickerSkeleton = ({ range, id }) => {
  const dateInput = (
    <div className="bx--date-picker-container">
      <label className="bx--label" htmlFor={id} />
      <div className="bx--date-picker__input bx--skeleton" />
    </div>
  );

  if (range) {
    return (
      <div className="bx--form-item">
        <div className="bx--date-picker bx--date-picker--range bx--skeleton">
          {dateInput}
          {dateInput}
        </div>
      </div>
    );
  }

  return (
    <div className="bx--form-item">
      <div className="bx--date-picker bx--date-picker--short bx--date-picker--simple bx--skeleton">
        {dateInput}
      </div>
    </div>
  );
};

DatePickerSkeleton.propTypes = {
  range: PropTypes.bool,
};

export default DatePickerSkeleton;
