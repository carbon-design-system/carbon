/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings } from 'carbon-components';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { useOutsideClick } from '../../internal/useOutsideClick';
import { useControllableState } from '../../internal/useControllableState';

const { prefix } = settings;

const Disclosure = React.forwardRef(function Disclosure(
  {
    className,
    children,
    defaultOpen = false,
    onChange,
    open: controlledOpen,
    ...rest
  },
  ref
) {
  const detailsRef = useOptionalRef(ref);
  const [open, setOpen, isControlled] = useControllableState(
    controlledOpen,
    onChange,
    defaultOpen
  );

  function onToggle(event) {
    if (!event.defaultPrevented) {
      setOpen(event.target.open);
    }
  }

  useOutsideClick(detailsRef, () => {
    if (isControlled) {
      return;
    }
    if (open === true) {
      setOpen(false);
    }
  });

  return (
    <details
      {...rest}
      className={cx(
        `${prefix}--disclosure-container`,
        `${prefix}--disclosure-overlay`,
        className
      )}
      onToggle={onToggle}
      open={open}
      ref={detailsRef}>
      {children}
    </details>
  );
});

Disclosure.propTypes = {
  /**
   * The child nodes.
   */
  children: PropTypes.node,

  /**
   * Specify className to be applied to Disclosure and DisclosureButton
   */
  className: PropTypes.string,
};

function DisclosureButton({ className, children, ...rest }) {
  return (
    <summary
      {...rest}
      className={cx(`${prefix}--disclosure-btn`, className)}
      role="button">
      {children}
    </summary>
  );
}

DisclosureButton.propTypes = {
  /**
   * The child nodes.
   */
  children: PropTypes.node,

  /**
   * Specify className to be applied to Disclosure and DisclosureButton
   */
  className: PropTypes.string,
};

function useOptionalRef(optionalRef) {
  const ref = useRef(null);
  if (optionalRef) {
    return optionalRef;
  }
  return ref;
}

export { Disclosure, DisclosureButton };
