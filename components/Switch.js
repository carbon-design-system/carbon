import React, { PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {
  className: PropTypes.string,
  index: PropTypes.number,
  kind: PropTypes.oneOf([
    'button',
    'anchor',
  ]).isRequired,
  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  text: PropTypes.string.isRequired,
};

const defaultProps = {
  selected: false,
  kind: 'anchor',
  onClick: () => { },
};

const Switch = (props) => {
  const {
    className,
    index,
    kind,
    name,
    onClick,
    selected,
    text,
    ...other,
  } = props;

  const handleClick = (e) => {
    e.preventDefault();
    onClick({ index, name, text });
  };

  const classes = classNames(
    className,
    'bx--content-switcher__btn',
    { 'bx--content-switcher--selected': selected },
  );

  const commonProps = {
    onClick: handleClick,
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
    <a href="#" {...other} {...commonProps}>
      {text}
    </a>
  );
};

Switch.defaultProps = defaultProps;
Switch.propTypes = propTypes;

export default Switch;
