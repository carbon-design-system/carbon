/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement } from 'lit/decorators.js';

import { ErrorEmptyState } from '../components/error-empty-state';
import { NoDataEmptyState } from '../components/no-data-empty-state';
import { NoTagsEmptyState } from '../components/no-tags-empty-state';
import { NotFoundEmptyState } from '../components/not-found-empty-state';
import { NotificationsEmptyState } from '../components/notifications-empty-state';
import { UnauthorizedEmptyState } from '../components/unauthorized-empty-state';

/**
 * Preview components for the preset illustration empty states. Each one
 * extends its preset, so every attribute of the preset (heading, subtitle,
 * `illustration-theme` and the `with-*` variant flags) is available as is.
 */

/** @element error-empty-state-preview */
@customElement('error-empty-state-preview')
export class ErrorEmptyStatePreview extends ErrorEmptyState {}

/** @element no-data-empty-state-preview */
@customElement('no-data-empty-state-preview')
export class NoDataEmptyStatePreview extends NoDataEmptyState {}

/** @element no-tags-empty-state-preview */
@customElement('no-tags-empty-state-preview')
export class NoTagsEmptyStatePreview extends NoTagsEmptyState {}

/** @element not-found-empty-state-preview */
@customElement('not-found-empty-state-preview')
export class NotFoundEmptyStatePreview extends NotFoundEmptyState {}

/** @element notifications-empty-state-preview */
@customElement('notifications-empty-state-preview')
export class NotificationsEmptyStatePreview extends NotificationsEmptyState {}

/** @element unauthorized-empty-state-preview */
@customElement('unauthorized-empty-state-preview')
export class UnauthorizedEmptyStatePreview extends UnauthorizedEmptyState {}
