/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import { Default as baseDefault, filter as baseFilter } from './tag-story';

export { default } from './tag-story';

export const Default = args => ({
  template: `
    <bx-tag :size="size" :type="type" :title="title" :disabled="disabled">
      This is a tag
    </bx-tag>
  `,
  ...createVueBindingsFromProps(args?.['bx-tag']),
});

Object.assign(Default, baseDefault);

export const filter = args => ({
  template: `
    <bx-filter-tag
      :open="open"
      :size="size"
      :type="type"
      :title="title"
      :disabled="disabled"
      @click="onClick"
      @bx-filter-tag-beingclosed="handleBeforeClose"
      @bx-filter-tag-closed="handleClose"
    >
      This is a tag
    </bx-filter-tag>
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
    }))(args?.['bx-filter-tag'])
  ),
});

Object.assign(filter, baseFilter);
