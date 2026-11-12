/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { SidePanel, MultiAddSelect } from '@carbon/ibm-products';
import {
  Button,
  AddSelect,
  type AddSelectProps,
  type AddSelectBodyProps,
  Tearsheet,
  StackProvider,
  type TearsheetProps,
  ConditionBuilder,
  ConditionBuilderContext,
  getEmptyState,
  Coachmark,
  CoachmarkBeacon as Beacon,
} from '@carbon/react';

export const Example = (
  props: TearsheetProps & AddSelectBodyProps
) => (
  <StackProvider>
    <Tearsheet open>
      <Button>Open</Button>
    </Tearsheet>
    <AddSelect items={[]} />
    <ConditionBuilder />
    <Coachmark />
    <Beacon label="Show" />
    <SidePanel open />
    <MultiAddSelect />
  </StackProvider>
);

export const Typed: AddSelectProps = {};
export const ctx = [ConditionBuilderContext, getEmptyState];
