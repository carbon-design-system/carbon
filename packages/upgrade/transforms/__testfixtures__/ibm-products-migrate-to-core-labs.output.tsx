/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { TruncatedList } from '@carbon/ibm-products';

import { Cascade } from '@carbon-labs/react-cascade';
import { Checklist } from '@carbon-labs/react-checklist';
import { InlineTip, InlineTipButton, InlineTipLink as TipLink, type InlineTipProps } from '@carbon-labs/react-inline-tip';
import { NonLinearReading } from '@carbon-labs/react-non-linear-reading';

export const Example = (props: InlineTipProps) => (
  <Cascade>
    <Checklist />
    <InlineTip>
      <InlineTipButton />
      <TipLink href="#" />
    </InlineTip>
    <NonLinearReading />
    <TruncatedList />
  </Cascade>
);
