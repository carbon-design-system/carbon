/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { forwardRef } from 'react';
import { useFeatureFlag } from '../FeatureFlags';
import LegacyModal, { type ModalProps as LegacyModalProps } from './Modal';
import NextModal, { type ModalProps as NextModalProps } from './next';

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  // common props shared between both components can go here eventually
  // the only difference may be that slug isn't needed in the new component but
  // we could choose to leave it in for now if it makes it easier
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
  const enableDialogElement =
    useFeatureFlag('enable-experimental-focus-wrap-without-sentinels') ||
    useFeatureFlag('enable-dialog-element');

  return enableDialogElement ? (
    <NextModal {...props} ref={ref} />
  ) : (
    <LegacyModal {...props} ref={ref} />
  );
});

export default Modal;
export { Modal, type ModalProps };
