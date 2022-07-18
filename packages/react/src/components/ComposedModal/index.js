/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as FeatureFlags from '@carbon/feature-flags';
import { ModalHeader as ModalHeaderNext } from './next/ModalHeader';
import { ModalFooter as ModalFooterNext } from './next/ModalFooter';
import { default as ComposedModalNext } from './next/ComposedModal';
import {
  default as ComposedModalClassic,
  ModalHeader as ModalHeaderClassic,
  ModalBody,
  ModalFooter as ModalFooterClassic,
} from './ComposedModal';

export const ModalHeader = FeatureFlags.enabled('enable-v11-release')
  ? ModalHeaderNext
  : ModalHeaderClassic;

export const ModalFooter = FeatureFlags.enabled('enable-v11-release')
  ? ModalFooterNext
  : ModalFooterClassic;

export const ComposedModal = FeatureFlags.enabled('enable-v11-release')
  ? ComposedModalNext
  : ComposedModalClassic;

export { ModalBody };
