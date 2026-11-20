/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { ReactNode } from 'react';
import {
  ComposedModal,
  Loading,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
} from '@carbon/react';
import { CheckmarkFilled, ErrorFilled } from '@carbon/react/icons';

const blockClass = 'export-modal';

export interface ExportModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  loading?: boolean;
  successful?: boolean;
  error?: boolean;
  primaryButtonDisabled?: boolean;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  preventCloseOnClickOutside?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  loadingMessage?: string;
  successMessage?: string;
  errorMessage?: string;
  children?: ReactNode;
}

export const ExportModal = ({
  open,
  onClose,
  onSubmit,
  title = 'Export',
  loading = false,
  successful = false,
  error = false,
  primaryButtonDisabled = false,
  primaryButtonText = 'Export',
  secondaryButtonText = 'Cancel',
  preventCloseOnClickOutside = false,
  size = 'sm',
  loadingMessage = 'Exporting file...',
  successMessage = 'The file has been exported.',
  errorMessage = 'Server error 500',
  children,
}: ExportModalProps) => {
  const submitted = loading || error || successful;

  return (
    <ComposedModal
      open={open}
      size={size}
      preventCloseOnClickOutside={preventCloseOnClickOutside}
      onClose={onClose}
    >
      <ModalHeader
        className={`${blockClass}__header`}
        title={title}
        closeModal={onClose}
      />
      <ModalBody className={`${blockClass}__body-container`}>
        {!submitted && children}

        <div aria-live="polite" className={`${blockClass}__messaging`}>
          {loading && (
            <>
              <Loading
                aria-live="off"
                description=""
                small
                withOverlay={false}
              />
              <p>{loadingMessage}</p>
            </>
          )}
          {successful && (
            <>
              <CheckmarkFilled
                size={16}
                className={`${blockClass}__checkmark-icon`}
              />
              <p>{successMessage}</p>
            </>
          )}
          {error && (
            <>
              <ErrorFilled size={16} className={`${blockClass}__error-icon`} />
              <p>{errorMessage}</p>
            </>
          )}
        </div>
      </ModalBody>
      {!submitted && (
        <ModalFooter className={`${blockClass}__footer`}>
          <Button type="button" kind="secondary" onClick={onClose}>
            {secondaryButtonText}
          </Button>
          <Button
            type="submit"
            kind="primary"
            onClick={onSubmit}
            disabled={primaryButtonDisabled}
          >
            {primaryButtonText}
          </Button>
        </ModalFooter>
      )}
    </ComposedModal>
  );
};

ExportModal.displayName = 'ExportModal';
