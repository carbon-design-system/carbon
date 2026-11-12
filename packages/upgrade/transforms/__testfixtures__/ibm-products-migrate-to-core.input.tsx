/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  preview__AddSelect,
  type preview__AddSelectProps,
  type AddSelectBodyProps,
  preview__Tearsheet as Tearsheet,
  StackProvider,
  type preview__TearsheetProps,
  previewCandidate__ConditionBuilder,
  ConditionBuilderContext,
  getEmptyState,
  previewCandidate__Coachmark,
  preview__CoachmarkBeacon as Beacon,
  SidePanel,
  MultiAddSelect,
} from '@carbon/ibm-products';
import { Button } from '@carbon/react';

export const Example = (
  props: preview__TearsheetProps & AddSelectBodyProps
) => (
  <StackProvider>
    <Tearsheet open>
      <Button>Open</Button>
    </Tearsheet>
    <preview__AddSelect items={[]} />
    <previewCandidate__ConditionBuilder />
    <previewCandidate__Coachmark />
    <Beacon label="Show" />
    <SidePanel open />
    <MultiAddSelect />
  </StackProvider>
);

export const Typed: preview__AddSelectProps = {};
export const ctx = [ConditionBuilderContext, getEmptyState];
