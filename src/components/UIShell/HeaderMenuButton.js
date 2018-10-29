import { Fade32 } from '@carbon/icons-react';
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { action, button } from './classNames';
import isRequiredOneOf from '../../prop-types/isRequiredOneOf';

const HeaderMenuButton = ({
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  className: customClassName,
  onClick,
  isActive,
  ...rest
}) => {
  const className = cx({
    [customClassName]: !!customClassName,
    [action.action]: true,
    [button.button]: true,
    [action.state.active]: isActive,
  });
  const accessibilityLabel = {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
  };
  return (
    <button
      {...rest}
      {...accessibilityLabel}
      className={className}
      title={ariaLabel}
      type="button"
      onClick={onClick}>
      {isActive ? (
        <Fade32 width={16} height={16} />
      ) : (
        <Fade32 width={16} height={16} />
      )}
    </button>
  );
};

HeaderMenuButton.propTypes = {
  /**
   * Required props for accessibility label on the underlying menu
   */
  ...isRequiredOneOf({
    'aria-label': PropTypes.string,
    'aria-labelledby': PropTypes.string,
  }),

  /**
   * Optionally provide a custom class name that is applied to the underlying
   * button
   */
  className: PropTypes.string,

  /**
   * Optionally provide an onClick handler that is called when the underlying
   * button fires it's onclick event
   */
  onClick: PropTypes.func,

  /**
   * Specify whether the action is currently active
   */
  isActive: PropTypes.bool,
};

export default HeaderMenuButton;
