import PropTypes from 'prop-types';
import React, { useState, useRef } from 'react';
import cx from 'classnames';
import Button from '../Button';
import OverflowMenu from '../OverflowMenu';
import { ButtonTypes } from '../../prop-types/types';
import { ChevronDown16 } from '@rocketsoftware/icons-react';

import { settings } from '@rocketsoftware/carbon-components';

const { prefix } = settings;

const ButtonGroup = ({ children, buttonLabel, disabled, size, kind }) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);

  const getOffset = () => {
    const { top } = buttonRef.current.getBoundingClientRect();

    return {
      top: top * -1,
      left: 'auto',
    };
  };

  const forOnOpen = () => {
    setIsOpen(true);
  };

  const forOnClose = () => {
    setIsOpen(false);
  };

  const iconClasses = cx(`${prefix}--btn-group-icon`, {
    [`${prefix}--btn-group-icon__open`]: isOpen,
  });

  return (
    <div
      data-floating-menu-container
      ref={buttonRef}
      className={`${prefix}--btn-group`}>
      <OverflowMenu
        renderIcon={React.forwardRef(() => (
          <Button
            className={iconClasses}
            renderIcon={ChevronDown16}
            kind={kind}
            size={size}
            disabled={disabled}>
            {buttonLabel}
          </Button>
        ))}
        onOpen={forOnOpen}
        menuOptionsClass={`${prefix}--overflow-menu-options--container`}
        onClose={forOnClose}
        menuOffset={getOffset}
        disabled={disabled}>
        {children}
      </OverflowMenu>
    </div>
  );
};

ButtonGroup.propTypes = {
  /**
   * Specify button label
   */
  buttonLabel: PropTypes.string,

  /**
   * Specify button size
   */
  size: PropTypes.oneOf(['default', 'field', 'small']),

  /**
   * Specify button type
   */
  kind: ButtonTypes.buttonKind.isRequired,
};

ButtonGroup.defaultProps = {
  kind: 'primary',
  size: 'default',
};
export default ButtonGroup;
