/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  type ReactNode,
  type MouseEvent,
  type HTMLAttributes,
} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Close } from '@carbon/icons-react';
import { usePrefix } from '../../internal/usePrefix';
import { IconButton } from '../IconButton';

type DivProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'>;
export interface ModalHeaderProps extends DivProps {
  /**
   * Provide an optional function to be called when the close button is
   * clicked
   */
  buttonOnClick?(event: MouseEvent): void;

  /**
   * Specify the content to be placed in the ModalHeader
   */
  children?: ReactNode;

  /**
   * Specify an optional className to be applied to the modal header
   */
  className?: string;

  /**
   * Specify an optional className to be applied to the modal close node
   */
  closeClassName?: string;

  /**
   * Specify an optional className to be applied to the modal close icon node
   */
  closeIconClassName?: string;

  /**
   * Provide an optional function to be called when the modal is closed
   */
  closeModal?(event: MouseEvent): void;

  /**
   * Specify a description for the close icon that can be read by screen
   * readers
   */
  iconDescription?: string;

  /**
   * Specify an optional label to be displayed
   */
  label?: ReactNode;

  /**
   * Specify an optional className to be applied to the modal header label
   */
  labelClassName?: string;

  /**
   * Specify an optional title to be displayed
   */
  title?: ReactNode;

  /**
   * Specify an optional className to be applied to the modal heading
   */
  titleClassName?: string;
}

export const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  function ModalHeader(
    {
      buttonOnClick,
      children,
      className: customClassName,
      closeClassName,
      closeIconClassName,
      closeModal,
      iconDescription = 'Close',
      label,
      labelClassName,
      title,
      titleClassName,
      ...rest
    },
    ref
  ) {
    const prefix = usePrefix();

    function handleCloseButtonClick(evt: MouseEvent) {
      closeModal?.(evt);
      buttonOnClick?.(evt);
    }

    const headerClass = cx(`${prefix}--modal-header`, customClassName);

    const labelClass = cx(
      `${prefix}--modal-header__label ${prefix}--type-delta`,
      labelClassName
    );

    const titleClass = cx(
      `${prefix}--modal-header__heading ${prefix}--type-beta`,
      titleClassName
    );

    const closeClass = cx(`${prefix}--modal-close`, closeClassName);

    const closeIconClass = cx(
      `${prefix}--modal-close__icon`,
      closeIconClassName
    );

    return (
      <div className={headerClass} {...rest} ref={ref}>
        {label && <h2 className={labelClass}>{label}</h2>}

        {title && <h3 className={titleClass}>{title}</h3>}

        {children}

        <div className={`${prefix}--modal-close-button`}>
          <IconButton
            className={closeClass}
            label={iconDescription}
            onClick={handleCloseButtonClick}
            title={iconDescription}
            aria-label={iconDescription}
            align="left">
            <Close
              size={20}
              aria-hidden="true"
              tabIndex="-1"
              className={closeIconClass}
            />
          </IconButton>
        </div>
      </div>
    );
  }
);

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
