/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import NotFoundEmptyState from '../../components/NotFoundEmptyState';
import { getEmptyStateProps } from '../EmptyState/getEmptyStateProps';
import '../../styles/_empty-state.scss';

export const NotFoundEmptyStatePreview = (props) => (
  <NotFoundEmptyState {...getEmptyStateProps(props)} />
);
