/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { ReactNode } from 'react';
import {
  ComposedModal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@carbon/react';

const blockClass = 'about-modal';

export interface AboutModalProps {
  additionalInfo?: ReactNode;
  closeIconDescription: string;
  content?: ReactNode;
  copyrightText: string;
  links?: ReactNode[];
  logo: ReactNode;
  modalAriaLabel?: string;
  onClose?: () => void;
  open?: boolean;
  title: ReactNode;
  version: string;
}

export const AboutModal = ({
  additionalInfo,
  closeIconDescription,
  content,
  copyrightText,
  links,
  logo,
  modalAriaLabel,
  onClose,
  open,
  title,
  version,
}: AboutModalProps) => {
  return (
    <ComposedModal
      className={blockClass}
      aria-label={modalAriaLabel}
      open={open}
      onClose={onClose}
    >
      <div className={`${blockClass}__logo`}>{logo}</div>
      <ModalHeader
        className={`${blockClass}__header`}
        closeModal={onClose}
        iconDescription={closeIconDescription}
        label={title}
        labelClassName={`${blockClass}__title`}
      />
      <ModalBody className={`${blockClass}__body`}>
        <div className={`${blockClass}__body-content`}>
          <div className={`${blockClass}__version`}>{version}</div>
          {links && links.length > 0 && (
            <div className={`${blockClass}__links-container`}>
              {links.map((link, i) => (
                <React.Fragment key={i}>{link}</React.Fragment>
              ))}
            </div>
          )}
          {content && <p className={`${blockClass}__content`}>{content}</p>}
          {copyrightText && (
            <p className={`${blockClass}__copyright-text`}>{copyrightText}</p>
          )}
        </div>
      </ModalBody>
      {additionalInfo && (
        <ModalFooter className={`${blockClass}__footer`}>
          {additionalInfo}
        </ModalFooter>
      )}
    </ComposedModal>
  );
};

AboutModal.displayName = 'AboutModal';
