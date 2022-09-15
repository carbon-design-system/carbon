/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Filter16 from '@carbon/icons-vue/es/filter/16';
import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import { Default as baseDefault, definition as baseDefinition, icon as baseIcon } from './tooltip-story';

export { default } from './tooltip-story';

export const Default = args => ({
  template: `
    <bx-tooltip :open="open">
      <bx-tooltip-body :direction="direction">
        <p>
          This is some tooltip text. This box shows the maximum amount of text that should appear inside. If more room is needed
          please use a modal instead.
        </p>
        <bx-tooltip-footer>
          <span><!-- TODO: Figure out how to style link in the story --></span><bx-btn kind="primary">Create</bx-btn>
        </bx-tooltip-footer>
      </bx-tooltip-body>
    </bx-tooltip>
  `,
  ...createVueBindingsFromProps(args?.['bx-tooltip']),
});

Object.assign(Default, baseDefault);

export const definition = args => ({
  template: `
    <bx-tooltip-definition :alignment="alignment" :body-text="bodyText" :direction="direction">
      Definition Tooltip
    </bx-tooltip-definition>
  `,
  ...createVueBindingsFromProps(args?.['bx-tooltip-definition']),
});

Object.assign(definition, baseDefinition);

export const icon = args => ({
  template: `
    <bx-tooltip-icon :alignment="alignment" :body-text="bodyText" :direction="direction">
      <filter-16></filter-16>
    </bx-tooltip-icon>
  `,
  components: {
    'filter-16': Filter16,
  },
  ...createVueBindingsFromProps(args?.['bx-tooltip-icon']),
});

Object.assign(icon, baseIcon);
