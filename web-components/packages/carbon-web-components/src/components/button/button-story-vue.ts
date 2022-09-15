/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Add16 from '@carbon/icons-vue/es/add/16';
import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import {
  Default as baseDefault,
  icon as baseIcon,
  textAndIcon as baseTextAndIcon,
  skeleton as baseSkeleton,
} from './button-story';

export { default } from './button-story';

export const Default = args => ({
  template: `
    <bx-btn :kind="kind" :disabled="disabled" :size="size" :href="href" :isExpressive="isExpressive"
    @click="onClick">Button</bx-btn>
  `,
  ...createVueBindingsFromProps(args?.['bx-btn']),
});

Object.assign(Default, baseDefault);

export const icon = args => ({
  template: `
    <bx-btn :kind="kind" :disabled="disabled" :size="size" :href="href" :isExpressive="isExpressive" @click="onClick">
      <add-16 slot="icon"></add-16>
    </bx-btn>
  `,
  components: {
    'add-16': Add16,
  },
  ...createVueBindingsFromProps(args?.['bx-btn']),
});

Object.assign(icon, baseIcon);

export const textAndIcon = args => ({
  template: `
    <bx-btn :kind="kind" :disabled="disabled" :size="size" :href="href" :icon-layout="iconLayout"
            :isExpressive="isExpressive" @click="onClick">
      Button <add-16 slot="icon"></add-16>
    </bx-btn>
  `,
  components: {
    'add-16': Add16,
  },
  ...createVueBindingsFromProps(args?.['bx-btn']),
});

Object.assign(textAndIcon, baseTextAndIcon);

export const skeleton = args => ({
  template: `
    <bx-btn-skeleton :disabled="disabled" :small="small" :href="href" :isExpressive="isExpressive"
    @click="onClick"></bx-btn-skeleton>
  `,
  ...createVueBindingsFromProps(args?.['bx-btn-skeleton']),
});

Object.assign(skeleton, baseSkeleton);
