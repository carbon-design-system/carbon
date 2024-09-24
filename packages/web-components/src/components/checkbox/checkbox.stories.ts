/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { prefix } from '../../globals/settings';
import './index';

const checkboxLabel = 'Checkbox label';

const defaultArgs = {
  disabled: false,
  helperText: 'Helper text goes here',
  invalid: false,
  invalidText: 'Invalid message goes here',
  legendText: 'Group label',
  readonly: false,
  warn: false,
  warnText: 'Warn message goes here',
};

const controls = {
  disabled: {
    control: 'boolean',
    description: 'Specify whether the checkbox should be disabled.',
  },
  helperText: {
    control: 'textNullable',
    description: 'Provide text for the form group for additional help.',
  },
  invalid: {
    control: 'boolean',
    description: 'Specify whether the form group is currently invalid.',
  },
  invalidText: {
    control: 'textNullable',
    description:
      'Provide the text that is displayed when the form group is in an invalid state.',
  },
  legendText: {
    control: 'textNullable',
    description: 'Provide the text to be rendered inside of the fieldset.',
  },
  readonly: {
    control: 'boolean',
    description: 'Specify whether the checkbox group is read-only.',
  },
  warn: {
    control: 'boolean',
    description:
      'Specify whether the form group is currently in warning state.',
  },
  warnText: {
    control: 'textNullable',
    description:
      'Provide the text that is displayed when the form group is in warning state.',
  },
};

export const Default = {
  render: () => html`
    <cds-checkbox-group legend-text="Group label">
      <cds-checkbox>${checkboxLabel}</cds-checkbox>
      <cds-checkbox>${checkboxLabel}</cds-checkbox>
    </cds-checkbox-group>
  `,
};

export const Skeleton = {
  render: () => html`
    <fieldset class="${prefix}--fieldset">
      <cds-checkbox-skeleton>${checkboxLabel}</cds-checkbox-skeleton>
    </fieldset>
  `,
};

export const Single = {
  render: () => html`
    <cds-checkbox helper-text="Helper text goes here"
      >${checkboxLabel}</cds-checkbox
    >
    <br /><br />
    <cds-checkbox invalid invalid-text="Invalid test goes here"
      >${checkboxLabel}</cds-checkbox
    >
    <br /><br />
    <cds-checkbox warn warn-text="Warning test goes here"
      >${checkboxLabel}</cds-checkbox
    >
    <br /><br />
    <cds-checkbox readonly>${checkboxLabel}</cds-checkbox>
  `,
};

export const Playground = {
  args: defaultArgs,
  argTypes: controls,
  render: ({
    disabled,
    readonly,
    onChange,
    helperText,
    invalid,
    invalidText,
    legendText,
    warn,
    warnText,
  }) =>
    html`
      <cds-checkbox-group
        helper-text="${helperText}"
        ?disabled="${disabled}"
        ?invalid="${invalid}"
        invalid-text="${invalidText}"
        legend-text="${legendText}"
        ?readonly="${readonly}"
        ?warn="${warn}"
        warn-text="${warnText}">
        <cds-checkbox checked @cds-checkbox-changed="${onChange}"
          >Checkbox label</cds-checkbox
        >
        <cds-checkbox @cds-checkbox-changed="${onChange}"
          >Checkbox label</cds-checkbox
        >
        <cds-checkbox disabled @cds-checkbox-changed="${onChange}"
          >Checkbox label</cds-checkbox
        >
      </cds-checkbox-group>
    `,
};

const meta = {
  title: 'Components/Checkbox',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};

export default meta;
