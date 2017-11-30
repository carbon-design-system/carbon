import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const Switch = props => {
  const {
    className,
    index,
    kind,
    name,
    onClick,
    onKeyDown,
    selected,
    text,
    href,
    ...other
  } = props;

  const handleClick = e => {
    e.preventDefault();
    onClick({ index, name, text });
  };

  const handleKeyDown = e => {
    const key = e.key || e.which;

    if (key === 'Enter' || key === 13 || key === ' ' || key === 32) {
      onKeyDown({ index, name, text });
    }
  };

  const classes = classNames(className, 'bx--content-switcher-btn', {
    'bx--content-switcher--selected': selected,
  });

  const commonProps = {
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    className: classes,
  };

  if (kind === 'button') {
    return (
      <button {...other} {...commonProps}>
        {text}
      </button>
    );
  }

  return (
    <a href={href} {...other} {...commonProps}>
      {text}
    </a>
  );
};

Switch.propTypes = {
  className: PropTypes.string,
  index: PropTypes.number,
  kind: PropTypes.oneOf(['button', 'anchor']).isRequired,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  selected: PropTypes.bool,
  text: PropTypes.string.isRequired,
  href: PropTypes.string,
};

Switch.defaultProps = {
  selected: false,
  kind: 'anchor',
  text: 'Provide text',
  href: '',
  onClick: () => {},
  onKeyDown: () => {},
};

export default Switch;
