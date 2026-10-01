/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { ReactNode, useState, useEffect } from 'react';
import { Modal, ToastNotification } from '@carbon/react';
import { getCurrentTime } from './utils';

export interface DeleteAndRemoveProps {
  open: boolean;
  onRequestClose: () => void;
  onRequestSubmit: () => void;
  onSecondarySubmit?: () => void;
  modalHeading: string;
  modalLabel?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  primaryButtonDisabled?: boolean;
  loadingStatus?: 'inactive' | 'active' | 'finished' | 'error';
  loadingDescription?: string;
  onLoadingSuccess?: () => void;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  danger?: boolean;
  successNotificationTitle?: string;
  successNotificationSubtitle?: string;
  showSuccessNotification?: boolean;
  children?: ReactNode;
}

export const DeleteAndRemove = ({
  open,
  onRequestClose,
  onRequestSubmit,
  onSecondarySubmit,
  modalHeading,
  modalLabel,
  primaryButtonText = 'Delete',
  secondaryButtonText = 'Cancel',
  primaryButtonDisabled,
  loadingStatus,
  loadingDescription,
  onLoadingSuccess,
  size,
  danger = true,
  successNotificationTitle = 'Success',
  successNotificationSubtitle,
  showSuccessNotification = false,
  children,
  ...rest
}: DeleteAndRemoveProps) => {
  const [openNotification, setOpenNotification] = useState(false);

  useEffect(() => {
    if (showSuccessNotification && loadingStatus === 'finished') {
      setOpenNotification(true);
    }
    if (loadingStatus === 'inactive') {
      setOpenNotification(false);
    }
  }, [showSuccessNotification, loadingStatus]);

  return (
    <>
      <Modal
        open={open}
        onRequestClose={onRequestClose}
        danger={danger}
        modalHeading={modalHeading}
        modalLabel={modalLabel}
        primaryButtonText={primaryButtonText}
        secondaryButtonText={secondaryButtonText}
        onRequestSubmit={onRequestSubmit}
        onSecondarySubmit={onSecondarySubmit ?? onRequestClose}
        primaryButtonDisabled={primaryButtonDisabled}
        loadingStatus={loadingStatus}
        loadingDescription={loadingDescription}
        onLoadingSuccess={onLoadingSuccess}
        size={size}
        {...rest}
      >
        {children}
      </Modal>
      {openNotification && successNotificationSubtitle && (
        <ToastNotification
          aria-label="closes notification"
          caption={getCurrentTime()}
          kind="success"
          lowContrast
          onClose={() => setOpenNotification(false)}
          role="status"
          statusIconDescription="notification"
          subtitle={successNotificationSubtitle}
          timeout={3000}
          title={successNotificationTitle}
          className="notification"
        />
      )}
    </>
  );
};

DeleteAndRemove.displayName = 'DeleteAndRemove';
