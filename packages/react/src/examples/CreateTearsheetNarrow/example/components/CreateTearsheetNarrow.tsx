/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { ReactNode, RefObject, useMemo } from 'react';
import { preview__Tearsheet as Tearsheet } from '@carbon/ibm-products';
import { Form } from '@carbon/react';

export interface CreateTearsheetNarrowProps {
  children?: ReactNode;
  open?: boolean;
  onClose?: () => void;
  setOpen?: (open: boolean) => void;
  title?: string;
  label?: string;
  description?: string | ReactNode;
  formTitle?: string;
  formDescription?: string | ReactNode;
  hasCloseIcon?: boolean;
  closeIconDescription?: string;
  selectorPrimaryFocus?: string;
  launcherButtonRef?: RefObject<HTMLButtonElement | null>;
  submitButtonText?: string;
  cancelButtonText?: string;
  onRequestSubmit?: () => void | Promise<void>;
  decorator?: ReactNode;
  headerActions?: ReactNode;
  disableSubmit?: boolean;
  className?: string;
}

export const CreateTearsheetNarrow = ({
  children,
  open,
  setOpen,
  onClose,
  title = 'Create',
  label,
  description,
  formTitle,
  formDescription,
  hasCloseIcon = true,
  closeIconDescription = 'Close',
  selectorPrimaryFocus,
  launcherButtonRef,
  submitButtonText = 'Create',
  cancelButtonText = 'Cancel',
  onRequestSubmit,
  headerActions,
  disableSubmit = false,
  className,
  ...rest
}: CreateTearsheetNarrowProps) => {
  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    await onRequestSubmit?.();
    setOpen?.(false);
  };

  // Create actions array for the footer
  const actions = useMemo(
    () => [
      {
        key: 'cancel',
        kind: 'ghost' as const,
        label: cancelButtonText,
        onClick: () => {
          onClose?.();
          setOpen?.(false);
        },
      },
      {
        key: 'submit',
        kind: 'primary' as const,
        label: submitButtonText,
        onClick: () => {
          handleSubmit();
        },
        disabled: disableSubmit,
      },
    ],
    [cancelButtonText, submitButtonText, disableSubmit, onClose, setOpen]
  );

  return (
    <Tearsheet
      open={open}
      variant="narrow"
      onClose={() => {
        onClose?.();
        setOpen?.(false);
      }}
      launcherButtonRef={launcherButtonRef}
      selectorPrimaryFocus={selectorPrimaryFocus}
      preventCloseOnClickOutside
      className={className}
      {...rest}
    >
      <Tearsheet.Header hideCloseButton={hasCloseIcon}>
        <Tearsheet.HeaderContent
          label={label || ''}
          title={title || ''}
          description={description || ''}
          headerActions={headerActions}
        />
      </Tearsheet.Header>
      <Tearsheet.Body className="create-tearsheet-narrow__body">
        <Tearsheet.MainContent isFlush={true}>
          {formTitle && (
            <h3 className="create-tearsheet-narrow__form-title">{formTitle}</h3>
          )}
          {formDescription && (
            <p className="create-tearsheet-narrow__form-description">
              {formDescription}
            </p>
          )}
          <Form onSubmit={handleSubmit}>{children}</Form>
        </Tearsheet.MainContent>
      </Tearsheet.Body>
      <Tearsheet.Footer actions={actions} buttonSize="2xl" />
    </Tearsheet>
  );
};

CreateTearsheetNarrow.displayName = 'CreateTearsheetNarrow';
