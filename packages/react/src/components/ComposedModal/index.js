/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as FeatureFlags from '@carbon/feature-flags';
import { ModalHeader as ModalHeaderNext } from './next/ComposedModal';
import {
  ComposedModal,
  ModalHeader as ModalHeaderClassic,
  ModalBody,
  ModalFooter,
} from './ComposedModal';

export { ComposedModal };

export const ModalHeader = FeatureFlags.enabled('enable-v11-release')
  ? ModalHeaderNext
  : ModalHeaderClassic;

export { ModalBody };

export { ModalFooter };

export default from './ComposedModal';
