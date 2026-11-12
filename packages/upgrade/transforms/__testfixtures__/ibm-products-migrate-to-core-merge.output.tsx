/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { SidePanel } from '@carbon/ibm-products';
import { Button, type ButtonProps, AddSelect } from '@carbon/react';
import type { SelectProps, AddSelectProps } from '@carbon/react';
import { AddSelectData, type AddSelectItem } from '@carbon/utilities';
import { Cascade } from '@carbon-labs/react-cascade';
import * as Products from '@carbon/ibm-products';
import ProductsDefault from '@carbon/ibm-products';

export const Merge = (props: AddSelectProps) => <AddSelect />;
export const data = new AddSelectData();
export const item: AddSelectItem = {};
export const Other = <SidePanel />;
export const Unchanged = Products.SidePanel;
