/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './index';
import styles from './truncated-text-story.scss?lit';
import '../layer/index';

const storyPrefix = 'truncated-text-stories__';
const defaultArgs = {
  align: 'top',
  autoalign: false,
  collapseLabel: 'View less',
  expandLabel: 'View more',
  id: 'example-id',
  lines: 3,
  type: 'tooltip',
  value:
    'Buttons are used to initialize an action, either in the background or foreground of an experience. There are several kinds of buttons. Primary buttons should be used for the principle call to action on the page. Secondary buttons should be used for secondary actions on each page. Danger buttons should be used for a negative action (such as Delete) on the page. Modify the behavior of the button by changing its event properties. Small buttons may be used when there is not enough space for a regular sized button. This issue is most found in tables. Small button should have three words or less. When words are not enough, icons can be used in buttons to better communicate what the button does. Icons are always paired with text.',
  // storybook specific
  element: 'p',
};

const argTypes = {
  align: {
    control: {
      type: 'select',
    },
    options: [
      'top',
      'bottom',
      'left',
      'right',
      'left-bottom',
      'left-top',
      'right-bottom',
      'right-top',
    ],
  },
  autoalign: {
    control: {
      type: 'boolean',
    },
  },
  lines: {
    control: {
      type: 'number',
    },
  },
  value: {
    control: {
      type: 'text',
    },
  },
  type: {
    control: { type: 'select' },
    options: ['tooltip', 'expand'],
  },
  expandLabel: {
    table: {
      disable: true,
    },
    control: {
      type: 'text',
    },
  },
  collapseLabel: {
    table: {
      disable: true,
    },
    control: {
      type: 'text',
    },
  },
  element: {
    description:
      'This is a story-only control to show the Truncated Text in different HTML elements, which just sets the parent element of the Truncated Text.',
    control: {
      type: 'select',
      labels: {
        p: 'Paragraph',
        layers: 'type layers',
        h1: 'Heading 1',
        h2: 'Heading 2',
        h3: 'Heading 3',
        h4: 'Heading 4',
        h5: 'Heading 5',
        h6: 'Heading 6',
      },
    },
    options: ['p', 'layers', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  },
};

const renderTemplate = (args) => {
  const {
    align,
    autoalign,
    collapseLabel,
    expandLabel,
    id,
    lines,
    type,
    value,
  } = args;
  return html`
    <div class="${storyPrefix}viewport">
      ${args.element === 'p'
        ? html`<p>
            <cds-truncated-text
              value=${value}
              id=${id}
              align=${align}
              ?autoalign=${autoalign}
              lines=${lines}
              expand-label=${expandLabel}
              collapse-label=${collapseLabel}
              .type=${type}></cds-truncated-text>
          </p>`
        : ''}
      ${args.element === 'layers'
        ? html`
            <p>
              <cds-truncated-text
                value=${value}
                id=${id}
                align=${align}
                ?autoalign=${autoalign}
                lines=${lines}
                expand-label=${expandLabel}
                collapse-label=${collapseLabel}
                .type=${type}></cds-truncated-text>
            </p>
            <cds-layer>
              <div
                style="background: var(--cds-layer); color: var(--cds-text-primary, #161616);">
                <p>
                  <cds-truncated-text
                    value=${value}
                    id=${id}
                    align=${align}
                    ?autoalign=${autoalign}
                    lines=${lines}
                    expand-label=${expandLabel}
                    collapse-label=${collapseLabel}
                    .type=${type}></cds-truncated-text>
                </p>
              </div>
              <cds-layer>
                <div
                  style="background: var(--cds-layer); color: var(--cds-text-primary, #161616);">
                  <p>
                    <cds-truncated-text
                      value=${value}
                      id=${id}
                      align=${align}
                      ?autoalign=${autoalign}
                      lines=${lines}
                      expand-label=${expandLabel}
                      collapse-label=${collapseLabel}
                      .type=${type}></cds-truncated-text>
                  </p>
                </div>
              </cds-layer>
            </cds-layer>
          `
        : ''}
      ${args.element === 'h1'
        ? html`<h1>
            <cds-truncated-text
              value=${value}
              id=${id}
              align=${align}
              ?autoalign=${autoalign}
              lines=${lines}
              expand-label=${expandLabel}
              collapse-label=${collapseLabel}
              .type=${type}></cds-truncated-text>
          </h1>`
        : ''}
      ${args.element === 'h2'
        ? html`<h2>
            <cds-truncated-text
              value=${value}
              id=${id}
              align=${align}
              ?autoalign=${autoalign}
              lines=${lines}
              expand-label=${expandLabel}
              collapse-label=${collapseLabel}
              .type=${type}></cds-truncated-text>
          </h2>`
        : ''}
      ${args.element === 'h3'
        ? html`<h3>
            <cds-truncated-text
              value=${value}
              id=${id}
              align=${align}
              ?autoalign=${autoalign}
              lines=${lines}
              expand-label=${expandLabel}
              collapse-label=${collapseLabel}
              .type=${type}></cds-truncated-text>
          </h3>`
        : ''}
      ${args.element === 'h4'
        ? html`<h4>
            <cds-truncated-text
              value=${value}
              id=${id}
              align=${align}
              ?autoalign=${autoalign}
              lines=${lines}
              expand-label=${expandLabel}
              collapse-label=${collapseLabel}
              .type=${type}></cds-truncated-text>
          </h4>`
        : ''}
      ${args.element === 'h5'
        ? html`<h5>
            <cds-truncated-text
              value=${value}
              id=${id}
              align=${align}
              ?autoalign=${autoalign}
              lines=${lines}
              expand-label=${expandLabel}
              collapse-label=${collapseLabel}
              .type=${type}></cds-truncated-text>
          </h5>`
        : ''}
      ${args.element === 'h6'
        ? html`<h6>
            <cds-truncated-text
              value=${value}
              id=${id}
              align=${align}
              ?autoalign=${autoalign}
              lines=${lines}
              expand-label=${expandLabel}
              collapse-label=${collapseLabel}
              .type=${type}></cds-truncated-text>
          </h6>`
        : ''}
    </div>
  `;
};

export const Default = {
  args: {
    ...defaultArgs,
  },
  argTypes,
  name: 'Default type Tooltip',
  render: renderTemplate,
  parameters: {
    docs: {
      source: {
        code: `
<cds-truncated-text
  value="${defaultArgs.value}"
  lines="${defaultArgs.lines}"
  ?autoalign=${defaultArgs.autoalign}
  align=${defaultArgs.align}
></cds-truncated-text>
        `,
      },
    },
  },
};

export const typeExpand = {
  args: {
    ...defaultArgs,
    type: 'expand',
  },
  argTypes,
  render: renderTemplate,
  parameters: {
    docs: {
      source: {
        code: `
<cds-truncated-text
  value="${defaultArgs.value}"
  lines="${defaultArgs.lines}"
  type="expand"
  expand-label="${defaultArgs.expandLabel}"
  collapse-label="${defaultArgs.collapseLabel}"
></cds-truncated-text>
        `,
      },
    },
  },
};

const meta = {
  title: 'Utilities/TruncatedText',
  component: 'cds-truncated-text',
  decorators: [
    (story) =>
      html`<div class="${storyPrefix}story-container">
        <style>
          ${styles}</style
        >${story()}
      </div>`,
  ],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
