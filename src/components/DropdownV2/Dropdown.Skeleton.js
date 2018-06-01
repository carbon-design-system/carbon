import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const DropdownSkeleton = ({ inline }) => {
  const wrapperClasses = classNames({
    'bx--skeleton': true,
    'bx--dropdown-v2': true,
    'bx--list-box': true,
    'bx--form-item': true,
    'bx--list-box--inline': inline,
  });
  return (
    <div className={wrapperClasses}>
      <div role="button" className="bx--list-box__field">
        <span className="bx--list-box__label" />
      </div>
    </div>
  );
};

DropdownSkeleton.propTypes = {
  inline: PropTypes.bool,
};

DropdownSkeleton.defaultProps = {
  inline: false,
};

export default DropdownSkeleton;
