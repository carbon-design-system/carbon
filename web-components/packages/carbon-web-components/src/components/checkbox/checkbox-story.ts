/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import { ifDefined } from 'lit/directives/if-defined.js';
import { prefix } from '../../globals/settings';
import textNullable from '../../../.storybook/knob-text-nullable';
import './index';
import storyDocs from './checkbox-story.mdx';

const checkboxLabel = 'Checkbox label';

export const Default = () => {
  return html`
    <fieldset class="${prefix}--fieldset">
      <legend class="${prefix}--label">Group label</legend>
      <cds-checkbox label-text="${checkboxLabel}"></cds-checkbox>
      <cds-checkbox label-text="${checkboxLabel}"></cds-checkbox>
    </fieldset>
  `;
};

Default.storyName = 'Default';

export const Skeleton = () => {
  return html`
    <fieldset class="${prefix}--fieldset">
      <cds-checkbox-skeleton
        label-text="${checkboxLabel}"></cds-checkbox-skeleton>
    </fieldset>
  `;
};

export const Playground = (args) => {
  const {
    checked,
    disabled,
    hideLabel,
    indeterminate,
    labelText = checkboxLabel,
    readonly,
    title,
    onChange,
  } = args?.[`${prefix}-checkbox`] ?? {};
  return html`
    <fieldset class="${prefix}--fieldset">
      <legend class="${prefix}--label">Group label</legend>
      <cds-checkbox
        ?checked="${checked}"
        ?disabled="${disabled}"
        ?hide-label="${hideLabel}"
        ?indeterminate="${indeterminate}"
        label-text="${ifDefined(labelText)}"
        ?readonly="${readonly}"
        title="${ifDefined(title)}"
        @cds-checkbox-changed="${onChange}"></cds-checkbox>
      <cds-checkbox
        ?checked="${checked}"
        ?disabled="${disabled}"
        ?hide-label="${hideLabel}"
        ?indeterminate="${indeterminate}"
        label-text="${ifDefined(labelText)}"
        ?readonly="${readonly}"
        title="${ifDefined(title)}"
        @cds-checkbox-changed="${onChange}"></cds-checkbox>
    </fieldset>
  `;
};

Playground.parameters = {
  knobs: {
    [`${prefix}-checkbox`]: () => ({
      checked: boolean('Checked (checked)', false),
      disabled: boolean('Disabled (disabled)', false),
      hideLabel: boolean('Hide label (hide-label)', false),
      indeterminate: boolean('Indeterminate (indeterminate)', false),
      readonly: boolean('Read only (readonly)', false),
      title: textNullable('Title (title)', ''),
      onChange: action(`${prefix}-checkbox-changed`),
    }),
  },
};

export default {
  title: 'Components/Checkbox',
  parameters: {
    ...storyDocs.parameters,
  },
};
