/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  moduleMetadata,
  type Meta,
  type StoryObj,
  type ArgTypes,
} from '@storybook/angular';
import {
  AiLabelComponent,
  AiLabelActionButtonComponent,
} from '@carbon/angular/ai-label';
import { IconButtonComponent } from '@carbon/angular/icon-button';
import { LinkComponent } from '@carbon/angular/link';
import View16 from '@carbon/icons/es/view/16.js';
import FolderOpen16 from '@carbon/icons/es/folder--open/16.js';
import Folders16 from '@carbon/icons/es/folders/16.js';
import { iconToSvg } from '../../../../.storybook/helpers/icon-to-svg';

// ─── WC-parity stories (one-for-one with @carbon/web-components AI Label) ────

/**
 * Builds the `options` and `labels` of a select control from a
 * `{ label: value }` map, which is the shape the WC stories use.
 */
const selectOptions = (map: Record<string, string>) => ({
  options: Object.values(map),
  labels: Object.fromEntries(
    Object.entries(map).map(([label, value]) => [value, label])
  ),
});

const tooltipAlignments = {
  top: 'top',
  'top-start': 'top-start',
  'top-end': 'top-end',
  bottom: 'bottom',
  'bottom-start': 'bottom-start',
  'bottom-end': 'bottom-end',
  left: 'left',
  'left-start': 'left-start',
  'left-end': 'left-end',
  right: 'right',
  'right-start': 'right-start',
  'right-end': 'right-end',
};

const sizes = {
  'Mini size (mini)': 'mini',
  '2XS size (2xs)': '2xs',
  'XS size (xs)': 'xs',
  'Small size (sm)': 'sm',
  'Medium size (md)': 'md',
  'Large size (lg)': 'lg',
  'XL size (xl)': 'xl',
};

const inlineSizes = {
  'Small size (sm)': 'sm',
  'Medium size (md)': 'md',
  'Large size (lg)': 'lg',
};

// Inline equivalents of the WC `ai-label-story.scss` helper classes.
const containerStyle =
  'display: flex; align-items: flex-start; margin-block-end: 3rem;';
const labelStyle = 'margin-inline-start: 1.5rem;';
const paragraphStyle =
  'font-size: 0.875rem; line-height: 1.28572; letter-spacing: 0.16px;';
const secondaryStyle = `${paragraphStyle} color: var(--cds-text-secondary);`;
const boldStyle = `${paragraphStyle} font-weight: 600;`;
const secondaryBoldStyle = `${secondaryStyle} font-weight: 600;`;
const headingStyle =
  'font-size: 2.625rem; font-weight: 300; margin-block-end: 1rem;';
const dividerStyle =
  'border: 0; background: var(--cds-border-subtle); block-size: 1px; margin-block: 1.5rem;';

const content = `
  <div slot="body-text">
    <p style="${secondaryStyle}">AI Explained</p>
    <h2 style="${headingStyle}">84%</h2>
    <p style="${secondaryBoldStyle}">Confidence score</p>
    <p style="${secondaryStyle}">
      Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
    </p>
    <hr style="${dividerStyle}" />
    <p style="${secondaryStyle}">Model type</p>
    <p style="${boldStyle}">Foundation model</p>
    <a href="#">normal link</a>
    <cds-ng-link href="#">cds link</cds-ng-link>
  </div>
`;

const actions = `
  <cds-ng-icon-button kind="ghost" slot="actions" size="lg">
    ${iconToSvg(View16, { slot: 'icon' })}
    <span slot="tooltip-content"> View </span>
  </cds-ng-icon-button>
  <cds-ng-icon-button kind="ghost" slot="actions" size="lg">
    ${iconToSvg(FolderOpen16, { slot: 'icon' })}
    <span slot="tooltip-content"> Open folder</span>
  </cds-ng-icon-button>
  <cds-ng-icon-button kind="ghost" slot="actions" size="lg">
    ${iconToSvg(Folders16, { slot: 'icon' })}
    <span slot="tooltip-content"> Folders </span>
  </cds-ng-icon-button>
  <cds-ng-ai-label-action-button>View details</cds-ng-ai-label-action-button>
`;

const defaultArgs = {
  aiText: 'AI',
  aiTextLabel: '',
  alignment: 'bottom-start',
  autoalign: true,
  kind: 'default',
  defaultOpen: false,
  revertActive: false,
  buttonLabel: 'Show information',
  revertLabel: 'Revert to AI input',
  size: 'md',
};

const controls: ArgTypes = {
  aiText: {
    control: 'text',
    description: 'Specify the correct translation of the AI text',
  },
  aiTextLabel: {
    control: 'text',
    description:
      'Specify additional text to be rendered next to the AI label in the inline variant.',
    if: { arg: 'kind', eq: 'inline' },
    table: {
      category: 'Inline variant',
    },
  },
  alignment: {
    control: 'select',
    description: 'Specify how the popover should align with the button.',
    ...selectOptions(tooltipAlignments),
  },
  autoalign: {
    control: 'boolean',
    description:
      'Will auto-align the popover. This prop is currently experimental and is subject to future changes.',
  },
  buttonLabel: {
    control: 'text',
    description:
      'Specify the text that will be provided to the `aria-label` of the `AI Label` button',
  },
  kind: {
    control: 'select',
    description:
      'Specify the type of AI Label, from the following list of types: `default`, `hollow`, or `inline`.',
    options: ['default', 'inline'],
  },
  defaultOpen: {
    control: 'boolean',
    description:
      'Specify if the toggletip should be open by default.\n\n(For the change to this control to be visible, refresh the page.)',
  },
  size: {
    control: 'select',
    description:
      'Specify the size of the button, from the following list of sizes: `mini`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`.',
    ...selectOptions(sizes),
    if: { arg: 'revertActive', neq: true },
  },
  revertActive: {
    control: 'boolean',
    description: 'Specify whether the revert button should be visible.',
  },
  revertLabel: {
    control: 'text',
    description:
      'Specify the text that should be shown when the revert button is hovered',
    if: { arg: 'revertActive', eq: true },
  },
};

const inlineControls: ArgTypes = {
  ...controls,
  size: {
    control: 'select',
    description:
      'Specify the size of the button, from the following list of sizes: `sm`, `md`, `lg`',
    ...selectOptions(inlineSizes),
    if: { arg: 'revertActive', neq: true },
  },
};

// The Inline stories exclude `kind` from the controls, and Storybook for
// Angular drops args that have no argType, so `kind` cannot be bound from
// `args` there. `kind` is written into the template instead.
const renderAILabel = (
  args: Record<string, unknown>,
  {
    withDefaultOpen = false,
    kind,
  }: { withDefaultOpen?: boolean; kind?: string } = {}
) => ({
  props: args,
  template: `
    <div style="${containerStyle}">
      <cds-ng-ai-label
        style="${labelStyle}"
        ${withDefaultOpen ? '[defaultOpen]="defaultOpen"' : ''}
        [aiText]="aiText"
        [aiTextLabel]="aiTextLabel"
        [alignment]="alignment"
        [autoalign]="autoalign"
        [buttonLabel]="buttonLabel"
        ${kind ? `kind="${kind}"` : '[kind]="kind"'}
        [size]="size"
        [revertActive]="revertActive"
        [revertLabel]="revertLabel">
        ${content} ${actions}
      </cds-ng-ai-label>
    </div>
  `,
});

const meta: Meta = {
  title: 'Components/AI Label',
  decorators: [
    moduleMetadata({
      imports: [
        AiLabelComponent,
        AiLabelActionButtonComponent,
        IconButtonComponent,
        LinkComponent,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj;

// WC: Default
export const Default: Story = {
  args: defaultArgs,
  argTypes: controls,
  render: (args) => renderAILabel(args, { withDefaultOpen: true }),
};

// WC: Inline
export const Inline: Story = {
  args: {
    ...defaultArgs,
    // `kind` prop is hidden from the controls table, but its value is still used for conditional `aiTextLabel`,
    // hence the arg value is set even though the prop can’t be updated from controls.
    kind: 'inline',
  },
  parameters: {
    controls: {
      exclude: ['defaultOpen', 'kind'],
    },
  },
  argTypes: inlineControls,
  render: (args) => renderAILabel(args, { kind: 'inline' }),
};

// WC: InlineWithContent
export const InlineWithContent: Story = {
  args: {
    ...defaultArgs,
    // `kind` prop is hidden from the controls table, but its value is still used for conditional `aiTextLabel`,
    // hence the arg value is set even though the prop can’t be updated from controls.
    kind: 'inline',
    aiTextLabel: 'Text goes here',
  },
  parameters: {
    controls: {
      exclude: ['defaultOpen', 'kind'],
    },
  },
  argTypes: inlineControls,
  render: (args) => renderAILabel(args, { kind: 'inline' }),
};
