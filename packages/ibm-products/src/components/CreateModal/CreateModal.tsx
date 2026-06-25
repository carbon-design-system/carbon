/**
 * Copyright IBM Corp. 2021, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Carbon and package components we use.
import {
  Button,
  ComposedModal,
  Form,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@carbon/react';
// Import portions of React that are needed.
import React, { PropsWithChildren, ReactNode, Ref } from 'react';

import PropTypes from 'prop-types';
import cx from 'classnames';
import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg } from '../../settings';
import { usePortalTarget } from '../../global/js/hooks/usePortalTarget';

const componentName = 'CreateModal';
const blockClass = `${pkg.prefix}--create-modal`;

export interface CreateModalProps extends PropsWithChildren {
  /**
   * Specify an optional className to be applied to the modal root node
   */
  className?: string;
  /**
   * Specifies an optional handler which is called when the CreateModal
   * is closed.
   */
  onRequestClose?(): void;
  /**
   * Specifies an optional handler which is called when the CreateModal
   * primary button is pressed.
   */
  onRequestSubmit?(): void;
  /**
   * Specifies whether the CreateModal is open or not.
   */
  open?: boolean;
  /**
   * The title of the CreateModal is usually the product or service name.
   */
  title: ReactNode;
  /**
   * The subtitle of the CreateModal is optional and serves to provide more information about the modal.
   */
  subtitle?: ReactNode;
  /**
   * The description of the CreateModal serves to provide more information about the modal.
   */
  description: ReactNode;
  /**
   * Specifies the secondary button's text in the modal.
   */
  secondaryButtonText: string;
  /**
   * The DOM node the tearsheet should be rendered within. Defaults to document.body.
   */
  portalTarget?: ReactNode;
  /**
   * Specifies the primary button's text in the modal.
   */
  primaryButtonText: string;
  /**
   * Specifies a boolean for disabling or enabling the primary button. This is important for form validation
   * Returning `true` prevents the primary button from being clicked until required fields are completed.
   */
  disableSubmit?: boolean;
  /**
   * Specifies which DOM element in the form should be focused.
   */
  selectorPrimaryFocus: string;
}

/**
 * The `CreateModal` component provides a way for a user to quickly generate a new
resource. It is triggered by a user’s action, appears on top of the main page
content, and is persistent until dismissed. The purpose of this modal should be
immediately apparent to the user, with a clear and obvious path to completion.
 */
export const CreateModal = React.forwardRef<HTMLDivElement, CreateModalProps>(
  (props, ref) => {
    const {
      className,
      children,
      onRequestClose,
      onRequestSubmit,
      open,
      title,
      subtitle,
      description,
      secondaryButtonText,
      portalTarget: portalTargetIn,
      primaryButtonText,
      disableSubmit,
      selectorPrimaryFocus,
      ...rest
    } = props;
    const renderPortalUse = usePortalTarget(portalTargetIn);

    return renderPortalUse(
      <ComposedModal
        {...rest}
        selectorPrimaryFocus={selectorPrimaryFocus}
        className={cx(blockClass, className)}
        {...{ open, ref }}
        aria-label={title}
        size="sm"
        preventCloseOnClickOutside
        onClose={() => {
          onRequestClose?.();
          return false;
        }}
        {...getDevtoolsProps(componentName)}
      >
        <ModalHeader title={title} titleClassName={`${blockClass}__title`}>
          {subtitle && <p className={`${blockClass}__subtitle`}>{subtitle}</p>}
        </ModalHeader>
        <ModalBody hasForm>
          {description && (
            <p className={`${blockClass}__description`}>{description}</p>
          )}
          <Form
            className={`${blockClass}__form`}
            aria-label={title}
            onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
              e.preventDefault()
            }
          >
            {children}
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button type="button" kind="secondary" onClick={onRequestClose}>
            {secondaryButtonText}
          </Button>
          <Button
            type="submit"
            kind="primary"
            onClick={onRequestSubmit}
            disabled={disableSubmit}
          >
            {primaryButtonText}
          </Button>
        </ModalFooter>
      </ComposedModal>
    );
  }
);

// Return a placeholder if not released and not enabled by feature flag

CreateModal.propTypes = {
  /**
   * Children refers to all form items within a form inside of the modal's body.
   */
  children: PropTypes.node,
  /**
   * Specify an optional className to be applied to the modal root node
   */
  className: PropTypes.string,
  /**
   * The description of the CreateModal serves to provide more information about the modal.
   */
  description: PropTypes.node.isRequired,
  /**
   * Specifies a boolean for disabling or enabling the primary button. This is important for form validation
   * Returning `true` prevents the primary button from being clicked until required fields are completed.
   */
  disableSubmit: PropTypes.bool,
  /**
   * Specifies an optional handler which is called when the CreateModal
   * is closed.
   */
  onRequestClose: PropTypes.func,
  /**
   * Specifies an optional handler which is called when the CreateModal
   * primary button is pressed.
   */
  onRequestSubmit: PropTypes.func,
  /**
   * Specifies whether the CreateModal is open or not.
   */
  open: PropTypes.bool,

  /**
   * The DOM node the tearsheet should be rendered within. Defaults to document.body.
   */
  portalTarget: PropTypes.node,

  /**
   * Specifies the primary button's text in the modal.
   */
  primaryButtonText: PropTypes.string.isRequired,
  /**
   * Specifies the secondary button's text in the modal.
   */
  secondaryButtonText: PropTypes.string.isRequired,
  /**
   * Specifies which DOM element in the form should be focused.
   */
  selectorPrimaryFocus: PropTypes.string.isRequired,
  /**
   * The subtitle of the CreateModal is optional and serves to provide more information about the modal.
   */
  subtitle: PropTypes.node,
  /**
   * The title of the CreateModal is usually the product or service name.
   */
  title: PropTypes.node.isRequired,
};

CreateModal.displayName = componentName;
