/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Modal, { type ModalProps } from './Modal';
import {
  ModalPresence,
  withModalPresence,
  type ModalPresenceProps,
} from './ModalPresence';
import { ModalStackProvider, useModalStack } from './ModalStackContext';

export default Modal;
export {
  Modal,
  ModalPresence,
  ModalStackProvider,
  withModalPresence,
  useModalStack,
  type ModalProps,
  type ModalPresenceProps,
};
