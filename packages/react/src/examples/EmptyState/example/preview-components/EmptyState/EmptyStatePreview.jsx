/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import EmptyState from '../../components/EmptyState';
import { getEmptyStateProps } from './getEmptyStateProps';
import '../../styles/_empty-state.scss';

export const EmptyStatePreview = (props) => (
  <EmptyState {...getEmptyStateProps(props)} />
);
