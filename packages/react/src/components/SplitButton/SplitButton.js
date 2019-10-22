import PropTypes from 'prop-types';
import React, { useState, useRef } from 'react';
import cx from 'classnames';
import { settings } from '@rocketsoftware/carbon-components';
import Button from '../Button';
import OverflowMenu from '../OverflowMenu';
import { ChevronDown16 } from '@rocketsoftware/icons-react';

const { prefix } = settings;
const SplitButton = ({
  classNameContainer,
  classNameButton,
  classNameOverflow,
  disabled,
  tabIndex,
  type,
  role,
  children,
  getViewport,
  ...other
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);

  const getOffset = () => {
    const { top } = buttonRef.current.getBoundingClientRect();

    return {
      top: top * -1,
      left: 'auto',
    };
  };

  const childrenArray = React.Children.toArray(children);
  const primaryAction = childrenArray.splice(0, 1)[0].props;

  const primaryButtonProps = {
    onClick: primaryAction.onClick,
    text: primaryAction.itemText,
  };

  const forOnOpen = () => {
    setIsOpen(true);
  };

  const forOnClose = () => {
    setIsOpen(false);
  };

  const containerClasses = cx({
    [classNameContainer]: true,
    [`${prefix}--btn--split--container`]: true,
  });

  const overflowClasses = cx({
    [classNameOverflow]: true,
    [`${prefix}--btn--split--overflow`]: true,
    [`${prefix}--btn--split--overflow--disabled`]: disabled,
  });

  const overflowIconClasses = cx({
    [`${prefix}--btn--split--overflow__open`]: isOpen,
    [`${prefix}--btn--split--overflow--icon`]: true,
  });

  return (
    <div
      className={containerClasses}
      tabIndex={tabIndex}
      ref={buttonRef}
      {...other}
      data-floating-menu-container>
      <Button
        type={type}
        role={role}
        disabled={disabled}
        className={classNameButton}
        {...primaryButtonProps}>
        {primaryButtonProps.text}
      </Button>
      <OverflowMenu
        className={overflowClasses}
        disabled={disabled}
        onOpen={forOnOpen}
        onClose={forOnClose}
        iconClass={overflowIconClasses}
        menuOptionsClass={`${prefix}--overflow-menu-options--container`}
        renderIcon={ChevronDown16}
        menuOffset={getOffset}
        getViewport={getViewport}>
        {childrenArray.map(child => {
          return child;
        })}
      </OverflowMenu>
    </div>
  );
};

SplitButton.propTypes = {
  /**
   * Container classes
   */
  classNameContainer: PropTypes.string,

  /**
   * Add an optional class to the button
   */
  classNameButton: PropTypes.string,

  /**
   * Add an optional class to the button
   */
  classNameOverflow: PropTypes.string,

  /**
   * Child nodes to be rendered in secondary actions menu
   */
  children: PropTypes.node.isRequired,

  /**
   * For specifying whether the button is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Optional prop to specify the tabIndex of the SplitButton
   */
  tabIndex: PropTypes.number,

  /**
   * Optional prop to specify the type of the Primary Button
   */
  type: PropTypes.oneOf(['button', 'reset', 'submit']),

  /**
   * Optional prop to specify the role of the Primary Button
   */
  role: PropTypes.string,

  /**
   * Optional callback used to obtain a custom 'viewport' that differs from the window.
   */
  getViewport: PropTypes.func,
};
SplitButton.defaultProps = {
  tabIndex: 0,
  type: 'button',
  disabled: false,
};

export default SplitButton;
