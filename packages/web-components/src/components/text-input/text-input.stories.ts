/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { prefix } from '../../globals/settings';
import { iconLoader } from '../../globals/internal/icon-loader';
import View16 from '@carbon/icons/es/view/16.js';
import FolderOpen16 from '@carbon/icons/es/folder--open/16.js';
import Folders16 from '@carbon/icons/es/folders/16.js';
import './index';
import '../form/form-item';
import '../ai-label';
import '../icon-button';
import { INPUT_SIZE } from './text-input';

const content = html`
  <div slot="body-text">
    <p class="secondary">AI Explained</p>
    <h2 class="ai-label-heading">84%</h2>
    <p class="secondary bold">Confidence score</p>
    <p class="secondary">
      Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
    </p>
    <hr />
    <p class="secondary">Model type</p>
    <p class="bold">Foundation model</p>
  </div>
`;

const actions = html`
  <cds-icon-button kind="ghost" slot="actions" size="lg">
    ${iconLoader(View16, { slot: 'icon' })}
    <span slot="tooltip-content"> View </span>
  </cds-icon-button>
  <cds-icon-button kind="ghost" slot="actions" size="lg">
    ${iconLoader(FolderOpen16, { slot: 'icon' })}
    <span slot="tooltip-content"> Open folder</span>
  </cds-icon-button>
  <cds-icon-button kind="ghost" slot="actions" size="lg">
    ${iconLoader(Folders16, { slot: 'icon' })}
    <span slot="tooltip-content"> Folders </span>
  </cds-icon-button>
  <cds-ai-label-action-button>View details</cds-ai-label-action-button>
`;

const sizes = {
  [`Small size (${INPUT_SIZE.SMALL})`]: INPUT_SIZE.SMALL,
  [`Medium size (${INPUT_SIZE.MEDIUM})`]: INPUT_SIZE.MEDIUM,
  [`Large size (${INPUT_SIZE.LARGE})`]: INPUT_SIZE.LARGE,
};

type TextInputStoryArgs = {
  disabled: boolean;
  enableCounter: boolean;
  helperText: string;
  hideLabel: boolean;
  inline: boolean;
  invalid: boolean;
  invalidText: string;
  labelText: string;
  maxCount: number;
  placeholder: string;
  defaultWidth: number;
  showPasswordVisibilityToggle: boolean;
  size: INPUT_SIZE;
  readonly: boolean;
  type: string;
  warn: boolean;
  warnText: string;
  value: string;
  onInput: (e: Event) => void;
};

const sharedArgs: TextInputStoryArgs = {
  disabled: false,
  enableCounter: false,
  helperText: 'Helper text',
  hideLabel: false,
  inline: false,
  invalid: false,
  invalidText: 'Error message goes here',
  labelText: 'Label text',
  maxCount: 100,
  placeholder: 'Placeholder text',
  defaultWidth: 300,
  showPasswordVisibilityToggle: false,
  size: INPUT_SIZE.MEDIUM,
  readonly: false,
  type: 'text',
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
  value: '',
  onInput: () => {},
};

const sharedArgTypes = {
  disabled: {
    control: 'boolean',
    description: 'Disabled (disabled)',
  },
  enableCounter: {
    control: 'boolean',
    description: 'Enable counter (enable-counter)',
  },
  helperText: {
    control: 'text',
    description: 'Helper text (helper-text)',
  },
  hideLabel: {
    control: 'boolean',
    description: 'Hide label (hide-label)',
  },
  inline: {
    control: 'boolean',
    description: 'Inline (inline)',
  },
  invalid: {
    control: 'boolean',
    description: 'Invalid (invalid)',
  },
  invalidText: {
    control: 'text',
    description: 'Invalid text (invalid-text)',
  },
  labelText: {
    control: 'text',
    description: 'Label text (label)',
  },
  maxCount: {
    control: 'number',
    description: 'Max count (max-count)',
  },
  placeholder: {
    control: 'text',
    description: 'Placeholder (placeholder)',
  },
  defaultWidth: {
    control: { type: 'range', min: 300, max: 800, step: 1 },
    description: 'Default width',
  },
  showPasswordVisibilityToggle: {
    control: 'boolean',
    description:
      'Show password visibility toggle (show-password-visibility-toggle)',
  },
  size: {
    control: 'select',
    description: 'Size (size)',
    options: sizes,
  },
  readonly: {
    control: 'boolean',
    description: 'Read only (readonly)',
  },
  type: {
    control: 'text',
    description: 'Type (type)',
  },
  warn: {
    control: 'boolean',
    description: 'Warn (warn)',
  },
  warnText: {
    control: 'text',
    description: 'Warn text (warn-text)',
  },
  value: {
    control: 'text',
    description: 'Value of input (value)',
  },
  onInput: {
    action: `${prefix}-select-selected`,
    table: {
      disable: true,
    },
  },
};

const renderTextInput = (args: TextInputStoryArgs, children?: unknown) => html`
  <cds-text-input
    ?disabled=${args.disabled}
    ?enable-counter=${args.enableCounter}
    helper-text=${ifDefined(args.helperText)}
    ?hide-label=${args.hideLabel}
    ?inline=${args.inline}
    ?invalid=${args.invalid}
    invalid-text=${ifDefined(args.invalidText)}
    label=${ifDefined(args.labelText)}
    max-count=${ifDefined(args.maxCount)}
    placeholder=${ifDefined(args.placeholder)}
    ?readonly=${args.readonly}
    ?show-password-visibility-toggle=${args.showPasswordVisibilityToggle}
    size=${ifDefined(args.size)}
    type=${ifDefined(args.type)}
    .value=${args.value}
    ?warn=${args.warn}
    warn-text=${ifDefined(args.warnText)}
    @input=${args.onInput}>
    ${children ?? ''}
  </cds-text-input>
`;

export const Default = {
  args: sharedArgs,
  argTypes: sharedArgTypes,
  render: (args: TextInputStoryArgs) => html`
    <div style="width: ${args.defaultWidth}px;">${renderTextInput(args)}</div>
  `,
};

export const ReadOnly = {
  args: {
    ...sharedArgs,
    readonly: true,
    value: "This is read only, you can't type more.",
  },
  argTypes: {
    ...sharedArgTypes,
  },
  parameters: {
    controls: {
      exclude: [
        'readonly',
        'invalid',
        'invalidText',
        'warn',
        'warnText',
        'enableCounter',
        'showPasswordVisibilityToggle',
        'onInput',
        'onChange',
        'disabled',
        'maxCount',
      ],
    },
  },
  render: (args: TextInputStoryArgs) => html`
    <div style="width: ${args.defaultWidth}px;">
      <cds-text-input
        readonly
        label=${ifDefined(args.labelText)}
        helper-text=${ifDefined(args.helperText)}
        size=${ifDefined(args.size)}
        ?hide-label=${args.hideLabel}
        .value=${args.value}>
      </cds-text-input>
    </div>
  `,
};

export const Skeleton = {
  args: { hideLabel: false },
  argTypes: {
    hideLabel: { control: 'boolean', description: 'Hide label (hide-label)' },
  },
  render: ({ hideLabel }) =>
    html`<cds-text-input-skeleton
      ?hide-label=${hideLabel}></cds-text-input-skeleton>`,
};

export const WithAILabel = {
  args: sharedArgs,
  argTypes: sharedArgTypes,
  parameters: {
    controls: {
      exclude: ['showPasswordVisibilityToggle'],
    },
  },
  render: (args: TextInputStoryArgs) => html`
    <div style=${`width: ${args.defaultWidth}px;`}>
      ${renderTextInput(
        args,
        html`<cds-ai-label alignment="bottom-left"
          >${content}${actions}</cds-ai-label
        >`
      )}
    </div>
  `,
};

export const WithLayer = {
  args: sharedArgs,
  argTypes: sharedArgTypes,
  render: (args: TextInputStoryArgs) => html`
    <sb-template-layers>
      <div style=${args.defaultWidth ? `width: ${args.defaultWidth}px;` : ''}>
        ${renderTextInput(args)}
      </div>
    </sb-template-layers>
  `,
};

export default {
  title: 'Components/Text Input',
  actions: { argTypesRegex: '^on.*' },
};
