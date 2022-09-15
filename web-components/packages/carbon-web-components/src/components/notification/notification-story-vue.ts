/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import { inline as baseInline, toast as baseToast } from './notification-story';

export { default } from './notification-story';

export const inline = args => ({
  template: `
    <bx-inline-notification
      style="min-width: 30rem; margin-bottom: .5rem"
      :kind="kind"
      :title="title"
      :subtitle="subtitle"
      :hide-close-button="hideCloseButton"
      :low-contrast="lowContrast"
      :close-button-label="closeButtonLabel"
      :icon-label="iconLabel"
      :open="open"
      :timeout="timeout"
      @bx-notification-beingclosed="handleBeforeClose"
      @bx-notification-closed="handleClose"
    >
    </bx-inline-notification>
  `,
  ...createVueBindingsFromProps(
    (({ disableClose, onBeforeClose, onClose, ...rest }) => ({
      ...rest,
      handleBeforeClose: (event: CustomEvent) => {
        onBeforeClose(event);
        if (disableClose) {
          event.preventDefault();
        }
      },
      handleClose: onClose,
    }))(args?.['bx-inline-notification'])
  ),
});

Object.assign(inline, baseInline);

export const toast = args => ({
  template: `
    <bx-toast-notification
      style="min-width: 30rem; margin-bottom: .5rem"
      :kind="kind"
      :title="title"
      :subtitle="subtitle"
      :caption="caption"
      :hide-close-button="hideCloseButton"
      :low-contrast="lowContrast"
      :close-button-label="closeButtonLabel"
      :icon-label="iconLabel"
      :open="open"
      :timeout="timeout"
      @bx-notification-beingclosed="handleBeforeClose"
      @bx-notification-closed="handleClose"
    >
    </bx-toast-notification>
  `,
  ...createVueBindingsFromProps(
    (({ disableClose, onBeforeClose, onClose, ...rest }) => ({
      ...rest,
      handleBeforeClose: (event: CustomEvent) => {
        onBeforeClose(event);
        if (disableClose) {
          event.preventDefault();
        }
      },
      handleClose: onClose,
    }))(args?.['bx-toast-notification'])
  ),
});

Object.assign(toast, baseToast);
