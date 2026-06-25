/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ReactNode } from 'react';

export type Theme = 'light' | 'dark';

export interface Filter {
  id?: string;
  label?: string;
}

export interface Modifier {
  id?: string;
  label?: string;
  options?: string[];
  multiSelect?: boolean;
}

export interface Avatar {
  alt?: string;
  icon?: () => void;
  src?: string;
  theme?: Theme;
}

export interface Meta {
  id?: string;
  title?: string;
  value?: string;
}

export interface Entry {
  id: string;
  title: string;
  value: string;
  avatar?: Avatar;
  children?: ReactNode;
  icon?: () => void | object;
  meta?: Meta[] | ReactNode;
  subtitle?: string;
}

export interface Item {
  entries: Entry[];
  modifiers?: Modifier;
  sortBy?: string[];
  filterBy?: string[];
}

export interface SortOption {
  id?: string;
  direction?: string;
  attribute?: string;
  label?: string;
}
