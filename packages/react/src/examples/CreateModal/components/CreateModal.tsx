/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  Button,
  ComposedModal,
  Form,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@carbon/react';
import React, { PropsWithChildren, ReactNode } from 'react';
import cx from 'classnames';

const blockClass = `create-modal`;

export interface CreateModalProps extends PropsWithChildren {
  className?: string;
  onRequestClose?(): void;
  onRequestSubmit?(): void;
  open?: boolean;
  title: string;
  subtitle?: ReactNode;
  description: ReactNode;
  secondaryButtonText: string;
  primaryButtonText: string;
  disableSubmit?: boolean;
  selectorPrimaryFocus: string;
}

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
      primaryButtonText,
      disableSubmit,
      selectorPrimaryFocus,
      ...rest
    } = props;

    return (
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

CreateModal.displayName = 'CreateModal';
