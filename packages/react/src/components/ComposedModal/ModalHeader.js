/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Close } from '@carbon/icons-react';
import { usePrefix } from '../../internal/usePrefix';

export const ModalHeader = React.forwardRef(function ModalHeader(
  {
    buttonOnClick,
    children,
    className: customClassName,
    closeClassName,
    closeIconClassName,
    closeModal,
    iconDescription,
    label,
    labelClassName,
    title,
    titleClassName,
    ...rest
  },
  ref
) {
  const prefix = usePrefix();

  function handleCloseButtonClick(evt) {
    closeModal(evt);
    buttonOnClick();
  }

  const headerClass = cx({
    [`${prefix}--modal-header`]: true,
    [customClassName]: customClassName,
  });

  const labelClass = cx({
    [`${prefix}--modal-header__label ${prefix}--type-delta`]: true,
    [labelClassName]: labelClassName,
  });

  const titleClass = cx({
    [`${prefix}--modal-header__heading ${prefix}--type-beta`]: true,
    [titleClassName]: titleClassName,
  });

  const closeClass = cx({
    [`${prefix}--modal-close`]: true,
    [closeClassName]: closeClassName,
  });

  const closeIconClass = cx({
    [`${prefix}--modal-close__icon`]: true,
    [closeIconClassName]: closeIconClassName,
  });

  return (
    <div className={headerClass} {...rest} ref={ref}>
      {label && <h2 className={labelClass}>{label}</h2>}

      {title && <h3 className={titleClass}>{title}</h3>}

      {children}

      <button
        onClick={handleCloseButtonClick}
        className={closeClass}
        title={iconDescription}
        aria-label={iconDescription}
        type="button">
        <Close size={20} className={closeIconClass} />
      </button>
    </div>
  );
});

ModalHeader.propTypes = {
  /**
   * Provide an optional function to be called when the close button is
   * clicked
   */
  buttonOnClick: PropTypes.func,

  /**
   * Specify the content to be placed in the ModalHeader
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the modal header
   */
  className: PropTypes.string,

  /**
   * Specify an optional className to be applied to the modal close node
   */
  closeClassName: PropTypes.string,

  /**
   * Specify an optional className to be applied to the modal close icon node
   */
  closeIconClassName: PropTypes.string,

  /**
   * Provide an optional function to be called when the modal is closed
   */
  closeModal: PropTypes.func,

  /**
   * Specify a description for the close icon that can be read by screen
   * readers
   */
  iconDescription: PropTypes.string,

  /**
   * Specify an optional label to be displayed
   */
  label: PropTypes.node,

  /**
   * Specify an optional className to be applied to the modal header label
   */
  labelClassName: PropTypes.string,

  /**
   * Specify an optional title to be displayed
   */
  title: PropTypes.node,

  /**
   * Specify an optional className to be applied to the modal heading
   */
  titleClassName: PropTypes.string,
};

ModalHeader.defaultProps = {
  iconDescription: 'Close',
  buttonOnClick: () => {},
  closeModal: () => {},
};
