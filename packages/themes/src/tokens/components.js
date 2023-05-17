/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { TokenGroup } from './TokenGroup';

export const button = TokenGroup.create({
  name: 'Button',
  properties: [],
  tokens: [
    'button-separator',
    'button-primary',
    'button-secondary',
    'button-tertiary',
    'button-danger-primary',
    'button-danger-secondary',
    'button-danger-active',
    'button-primary-active',
    'button-secondary-active',
    'button-tertiary-active',
    'button-danger-hover',
    'button-primary-hover',
    'button-secondary-hover',
    'button-tertiary-hover',
    'button-disabled',
  ],
});

export const notification = TokenGroup.create({
  name: 'Notification',
  properties: [],
  tokens: [
    'notification-background-error',
    'notification-background-success',
    'notification-background-info',
    'notification-background-warning',
    'notification-action-hover',
    'notification-action-tertiary-inverse',
    'notification-action-tertiary-inverse-active',
    'notification-action-tertiary-inverse-hover',
    'notification-action-tertiary-inverse-text',
    'notification-action-tertiary-inverse-text-on-color-disabled',
  ],
});

export const tag = TokenGroup.create({
  name: 'Tag',
  properties: [],
  tokens: [
    'tag-background-red',
    'tag-color-red',
    'tag-hover-red',
    'tag-background-magenta',
    'tag-color-magenta',
    'tag-hover-magenta',
    'tag-background-purple',
    'tag-color-purple',
    'tag-hover-purple',
    'tag-background-blue',
    'tag-color-blue',
    'tag-hover-blue',
    'tag-background-cyan',
    'tag-color-cyan',
    'tag-hover-cyan',
    'tag-background-teal',
    'tag-color-teal',
    'tag-hover-teal',
    'tag-background-green',
    'tag-color-green',
    'tag-hover-green',
    'tag-background-gray',
    'tag-color-gray',
    'tag-hover-gray',
    'tag-background-cool-gray',
    'tag-color-cool-gray',
    'tag-hover-cool-gray',
    'tag-background-warm-gray',
    'tag-color-warm-gray',
    'tag-hover-warm-gray',
  ],
});
