/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { ErrorEmptyState } from '../../components/ErrorEmptyState';
import { NoDataEmptyState } from '../../components/NoDataEmptyState';
import { NoTagsEmptyState } from '../../components/NoTagsEmptyState';
import { NotFoundEmptyState } from '../../components/NotFoundEmptyState';
import { NotificationsEmptyState } from '../../components/NotificationsEmptyState';
import { UnauthorizedEmptyState } from '../../components/UnauthorizedEmptyState';
import '../../styles/_empty-state.scss';

export const ErrorEmptyStatePreview = (props) => <ErrorEmptyState {...props} />;

export const NoDataEmptyStatePreview = (props) => (
  <NoDataEmptyState {...props} />
);

export const NoTagsEmptyStatePreview = (props) => (
  <NoTagsEmptyState {...props} />
);

export const NotFoundEmptyStatePreview = (props) => (
  <NotFoundEmptyState {...props} />
);

export const NotificationsEmptyStatePreview = (props) => (
  <NotificationsEmptyState {...props} />
);

export const UnauthorizedEmptyStatePreview = (props) => (
  <UnauthorizedEmptyState {...props} />
);
