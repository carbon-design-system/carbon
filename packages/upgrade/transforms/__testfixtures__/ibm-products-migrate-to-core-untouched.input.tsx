/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  SidePanel,
  MultiAddSelect,
  SingleAddSelect,
  UserAvatar,
} from '@carbon/ibm-products';
import { Tearsheet, Coachmark, PageHeader } from '@carbon/ibm-products';
import { preview__Card } from '@carbon/react';
import { Cascade } from 'some-other-package';

const preview__AddSelect = () => null;
export const Local = () => <preview__AddSelect />;
export const Other = () => (
  <SidePanel>
    <MultiAddSelect />
    <SingleAddSelect />
    <UserAvatar />
    <Tearsheet />
    <Coachmark />
    <PageHeader />
    <Cascade />
  </SidePanel>
);
