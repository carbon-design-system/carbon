/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import * as knobs from '@storybook/addon-knobs';
import textNullable from '../../../.storybook/knob-text-nullable';
import './textarea';
import './textarea-skeleton';
import '../form/form-item';
import '../layer';
import createProps from './stories/helpers';
import storyDocs from './textarea-story.mdx';
import { prefix } from '../../globals/settings';

export const Default = () => {
  return html`
    <cds-form-item>
      <cds-textarea label="Textarea label" helper-text="Optional helper text">
      </cds-textarea>
    </cds-form-item>
  `;
};

Default.storyName = 'Default';

export const skeleton = () =>
  html` <cds-textarea-skeleton></cds-textarea-skeleton> `;

skeleton.parameters = {
  percy: {
    skip: true,
  },
};

export const WithLayer = () => {
  return html`
    <cds-layer>
      <cds-textarea label="First layer" helper-text="Optional helper text">
      </cds-textarea>
      <cds-layer>
        <cds-textarea label="Second layer" helper-text="Optional helper text">
        </cds-textarea>
        <cds-layer>
          <cds-textarea label="Third layer" helper-text="Optional helper text">
          </cds-textarea>
        </cds-layer>
      </cds-layer>
    </cds-layer>
  `;
};

WithLayer.storyName = 'With Layer';

export const Playground = (args) => {
  const {
    cols,
    disabled,
    enableCounter,
    helperText,
    hideLabel,
    invalid,
    invalidText,
    label,
    maxCount,
    onInput,
    placeholder,
    readonly,
    rows,
    value,
    warn,
    warnText,
  } = args?.[`${prefix}-textarea`] ?? {};
  return html`
    <cds-form-item>
      <cds-textarea
        ?enable-counter="${enableCounter}"
        helper-text="${ifDefined(helperText)}"
        ?hide-label="${hideLabel}"
        ?invalid="${invalid}"
        invalid-text="${ifDefined(invalidText)}"
        label="${ifDefined(label)}"
        ?readonly="${readonly}"
        value="${ifDefined(value)}"
        ?warn="${warn}"
        warn-text="${ifDefined(warnText)}"
        ?disabled="${disabled}"
        max-count="${ifDefined(maxCount)}"
        placeholder="${ifDefined(placeholder)}"
        @input="${onInput}"
        rows="${ifDefined(rows)}"
        cols="${ifDefined(cols)}">
        ${value}
      </cds-textarea>
    </cds-form-item>
  `;
};

Playground.storyName = 'Playground';

Playground.parameters = {
  knobs: {
    [`${prefix}-textarea`]: () => createProps({ ...knobs, textNullable }),
  },
};

export default {
  title: 'Components/Text Area',
  parameters: {
    ...storyDocs.parameters,
  },
};
