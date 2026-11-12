/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import type { preview__AddSelectProps } from '@carbon/ibm-products';
import { preview__AddSelect, SidePanel } from '@carbon/ibm-products';
import { Button, type ButtonProps } from '@carbon/react';
import type { SelectProps } from '@carbon/react';
import { AddSelectData } from '@carbon/ibm-products-utilities';
import { type AddSelectItem } from '@carbon/ibm-products';
import { Cascade } from '@carbon/ibm-products';
import * as Products from '@carbon/ibm-products';
import ProductsDefault from '@carbon/ibm-products';

export const Merge = (props: preview__AddSelectProps) => <preview__AddSelect />;
export const data = new AddSelectData();
export const item: AddSelectItem = {};
export const Other = <SidePanel />;
export const Unchanged = Products.SidePanel;
