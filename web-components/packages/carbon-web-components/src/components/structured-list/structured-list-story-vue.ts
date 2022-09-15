/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import { Default as baseDefault } from './structured-list-story';

export { default } from './structured-list-story';

export const Default = args => ({
  template: `
    <bx-structured-list :selection-name="selectionName">
      <bx-structured-list-head>
        <bx-structured-list-header-row>
          <bx-structured-list-header-cell>ColumnA</bx-structured-list-header-cell>
          <bx-structured-list-header-cell>ColumnB</bx-structured-list-header-cell>
          <bx-structured-list-header-cell>ColumnC</bx-structured-list-header-cell>
        </bx-structured-list-header-row>
      </bx-structured-list-head>
      <bx-structured-list-body>
        <bx-structured-list-row :selection-value="selectionValues[0]">
          <bx-structured-list-cell>Row 1</bx-structured-list-cell>
          <bx-structured-list-cell>Row 1</bx-structured-list-cell>
          <bx-structured-list-cell
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.</bx-structured-list-cell
          >
        </bx-structured-list-row>
        <bx-structured-list-row :selection-value="selectionValues[1]">
          <bx-structured-list-cell>Row 2</bx-structured-list-cell>
          <bx-structured-list-cell>Row 2</bx-structured-list-cell>
          <bx-structured-list-cell
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.</bx-structured-list-cell
          >
        </bx-structured-list-row>
        <bx-structured-list-row :selection-value="selectionValues[2]">
          <bx-structured-list-cell>Row 3</bx-structured-list-cell>
          <bx-structured-list-cell>Row 3</bx-structured-list-cell>
          <bx-structured-list-cell
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.</bx-structured-list-cell
          >
        </bx-structured-list-row>
      </bx-structured-list-body>
    </bx-structured-list>
  `,
  ...createVueBindingsFromProps(
    (({ hasSelection, ...rest }) => ({
      ...rest,
      hasSelection,
      selectionName: !hasSelection ? undefined : 'structured-list-selection',
      selectionValues: !hasSelection
        ? []
        : ['structured-list-selection-0', 'structured-list-selection-1', 'structured-list-selection-2'],
    }))(args?.['bx-structured-list'])
  ),
});

Object.assign(Default, baseDefault);
