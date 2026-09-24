/**
 * Copyright IBM Corp. 2021, 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import '../dialog/index';
import CDSModal from './modal';
import CDSModalBody from './modal-body';
import CDSModalBodyContent from './modal-body-content';
import CDSModalCloseButton from './modal-close-button';
import CDSModalFooter from './modal-footer';
import CDSModalFooterButton from './modal-footer-button';
import CDSModalHeader from './modal-header';
import CDSModalHeading from './modal-heading';
import CDSModalLabel from './modal-label';

export {
  CDSModal,
  CDSModalBody,
  CDSModalBodyContent,
  CDSModalCloseButton,
  CDSModalFooter,
  CDSModalFooterButton,
  CDSModalHeader,
  CDSModalHeading,
  CDSModalLabel,
};

defineCustomElement(CDSModal);
defineCustomElement(CDSModalBody);
defineCustomElement(CDSModalBodyContent);
defineCustomElement(CDSModalCloseButton);
defineCustomElement(CDSModalFooter);
defineCustomElement(CDSModalFooterButton);
defineCustomElement(CDSModalHeader);
defineCustomElement(CDSModalHeading);
defineCustomElement(CDSModalLabel);
