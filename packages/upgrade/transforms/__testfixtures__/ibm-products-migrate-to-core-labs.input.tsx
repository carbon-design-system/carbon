/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  Cascade,
  Checklist,
  InlineTip,
  previewCandidate__InlineTipButton,
  InlineTipLink as TipLink,
  previewCandidate__NonLinearReading,
  TruncatedList,
  type InlineTipProps,
} from '@carbon/ibm-products';

export const Example = (props: InlineTipProps) => (
  <Cascade>
    <Checklist />
    <InlineTip>
      <previewCandidate__InlineTipButton />
      <TipLink href="#" />
    </InlineTip>
    <previewCandidate__NonLinearReading />
    <TruncatedList />
  </Cascade>
);
