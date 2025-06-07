/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { TAG_SIZE } from './tag';
import View16 from '@carbon/icons/lib/view/16.js';
import FolderOpen16 from '@carbon/icons/lib/folder--open/16.js';
import Folders16 from '@carbon/icons/lib/folders/16.js';
import Asleep16 from '@carbon/icons/lib/asleep/16.js';
import './index';
import '../popover';
import '../ai-label';
import '../button';
import '../icon-button';

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
    ${View16({ slot: 'icon' })}
    <span slot="tooltip-content"> View </span>
  </cds-icon-button>
  <cds-icon-button kind="ghost" slot="actions" size="lg">
    ${FolderOpen16({ slot: 'icon' })}
    <span slot="tooltip-content"> Open folder</span>
  </cds-icon-button>
  <cds-icon-button kind="ghost" slot="actions" size="lg">
    ${Folders16({ slot: 'icon' })}
    <span slot="tooltip-content"> Folders </span>
  </cds-icon-button>
  <cds-ai-label-action-button>View details</cds-ai-label-action-button>
`;

const sizes = {
  [`sm`]: TAG_SIZE.SMALL,
  [`md`]: TAG_SIZE.MEDIUM,
  [`lg`]: TAG_SIZE.LARGE,
};

const types = [
  'red',
  'magenta',
  'purple',
  'blue',
  'cyan',
  'teal',
  'green',
  'gray',
  'cool-gray',
  'warm-gray',
  'high-contrast',
  'outline',
];

const defaultArgs = {
  disabled: false,
  size: TAG_SIZE.MEDIUM,
};

const controls = {
  disabled: {
    control: 'boolean',
    description: 'Specify if the Tag is disabled',
  },
  size: {
    control: 'select',
    description:
      'Specify the size of the Tag. Currently supports either `sm`, `md` (default) or `lg` sizes.',
    options: sizes,
  },
};

export const Dismissible = {
  argTypes: {
    ...controls,
    text: {
      control: 'text',
      description: 'Provide text to be rendered inside of a the tag.',
    },
  },
  args: {
    ...defaultArgs,
  },
  render: ({ disabled, size, text }) => {
    const tags = [
      {
        type: 'red',
        text: 'Tag content with a long text description',
        tagTitle: 'Provide a custom title to the tag',
      },
      {
        type: 'magenta',
        text: 'Tag content 1',
      },
      {
        type: 'purple',
        text: 'Tag content 2',
      },
      {
        type: 'blue',
        text: 'Tag content 3',
      },
      {
        type: 'cyan',
        text: 'Tag content 4',
      },
      {
        type: 'teal',
        text: 'Tag content 5',
      },
      {
        type: 'green',
        text: 'Tag content 6',
      },
      {
        type: 'gray',
        text: 'Tag content 7',
      },
      {
        type: 'cool-gray',
        text: 'Tag content 8',
      },
      {
        type: 'warm-gray',
        text: 'Tag content 9',
      },
      {
        type: 'high-contrast',
        text: 'Tag content 10',
      },
      {
        type: 'outline',
        text: 'Tag content 11',
      },
    ];

    const resetTags = () => {
      const dismissibleTags = document.querySelectorAll('cds-dismissible-tag');
      const tags = [...dismissibleTags];
      tags.map((tag) => tag?.setAttribute('open', 'true'));
    };

    return html` <div style="margin-bottom: 3rem">
        <cds-button @click="${resetTags}">Reset</cds-button>
      </div>
      ${tags.map(
        (tag) =>
          html`<cds-dismissible-tag
            ?disabled="${disabled}"
            text="${text || tag.text}"
            tag-title="${tag.tagTitle}"
            type="${tag.type}"
            size="${size}"
            >${Asleep16({ slot: 'icon' })}</cds-dismissible-tag
          >`
      )}`;
  },
};

export const Skeleton = {
  argTypes: {
    size: {
      control: 'select',
      description:
        'Specify the size of the Tag. Currently supports either `sm`, `md` (default) or `lg` sizes.',
      options: sizes,
    },
  },
  args: {
    size: TAG_SIZE.MEDIUM,
  },
  render: ({ size }) =>
    html`<cds-tag-skeleton size="${size}">Tag content</cds-tag-skeleton>`,
};

export const Selectable = {
  argTypes: {
    ...controls,
    text: {
      control: 'text',
      description: 'Provide text to be rendered inside of a the tag.',
    },
  },
  args: {
    ...defaultArgs,
  },
  render: ({ disabled, size, text }) => {
    const tags = [
      {
        id: 1,
        text: 'Tag content with a long text description',
        selected: false,
      },
      {
        id: 2,
        text: 'Tag content 1',
        selected: true,
      },
      {
        id: 3,
        text: 'Tag content 2',
        selected: false,
      },
      {
        id: 4,
        text: 'Tag content 3',
        selected: false,
      },
    ];

    return html` <div aria-label="Selectable tags" role="group">
      ${tags.map(
        (tag) =>
          html`<cds-selectable-tag
            ?disabled="${disabled}"
            ?selected="${tag.selected}"
            id="${tag.id}"
            text="${text || tag.text}"
            size="${size}"
            >${Asleep16({ slot: 'icon' })}
          </cds-selectable-tag>`
      )}
    </div>`;
  },
};

export const Operational = {
  argTypes: {
    ...controls,
    text: {
      control: 'text',
      description: 'Provide text to be rendered inside of a the tag.',
    },
  },
  args: {
    ...defaultArgs,
  },
  render: ({ disabled, size, text }) => {
    const togglePopover = (e) => {
      if (e instanceof PointerEvent) {
        const popoverElement = (e.target as HTMLElement)?.parentElement
          ?.parentElement;
        popoverElement?.toggleAttribute('open');
      }
      if (e instanceof KeyboardEvent) {
        if (e.key === ' ' || e.key === 'Enter') {
          const popoverElement = (e.target as HTMLElement)?.parentElement
            ?.parentElement;
          popoverElement?.toggleAttribute('open');
        }
      }
    };

    const tags = [
      {
        type: 'red',
        text: 'Tag content with a long text description',
      },
      {
        type: 'magenta',
        text: 'Tag content',
      },
      {
        type: 'purple',
        text: 'Tag content',
      },
      {
        type: 'blue',
        text: 'Tag content',
      },
      {
        type: 'cyan',
        text: 'Tag content',
      },
      {
        type: 'teal',
        text: 'Tag content',
      },
      {
        type: 'green',
        text: 'Tag content',
      },
      {
        type: 'gray',
        text: 'Tag content',
      },
      {
        type: 'cool-gray',
        text: 'Tag content',
      },
      {
        type: 'warm-gray',
        text: 'Tag content',
      },
    ];

    return html`
      <div
        aria-label="Operational tags"
        role="group"
        style="margin-bottom:1rem">
        ${tags.map(
          (tag) =>
            html`<cds-operational-tag
              ?disabled="${disabled}"
              type=${tag.type}
              text="${text || tag.text}"
              size="${size}"
              >${Asleep16({ slot: 'icon' })}
            </cds-operational-tag>`
        )}
      </div>
      <h4>Interactive examples</h4>
      <div
        id="operational-tag"
        style="display:flex; justify-content:flex-start; margin-top:1rem"
        aria-label="Operational tags with Popover"
        role="group">
        <cds-popover highContrast>
          <div class="playground-trigger">
            <cds-operational-tag
              @click="${togglePopover}"
              @keydown="${togglePopover}"
              ?disabled="${disabled}"
              text="${text || `Tag content`}">
              ${Asleep16({ slot: 'icon' })}
            </cds-operational-tag>
          </div>
          <cds-popover-content class="popover-content">
            <div style="line-height: 0; padding: 1rem">
              <p style="font-size: 14px">Tag 1 name</p>
              <p style="font-size: 14px">Tag 2 name</p>
              <p style="font-size: 14px">Tag 3 name</p>
              <p style="font-size: 14px">Tag 4 name</p>
              <p style="font-size: 14px">Tag 5 name</p>
            </div>
          </cds-popover-content>
        </cds-popover>

        <cds-popover>
          <div class="playground-trigger">
            <cds-operational-tag
              @click="${togglePopover}"
              @keydown="${togglePopover}"
              ?disabled="${disabled}"
              text="${text || `Tag content`}">
              ${Asleep16({ slot: 'icon' })}
            </cds-operational-tag>
          </div>
          <cds-popover-content>
            <div style="display:flex; flex-direction: column; padding:1rem">
              <cds-tag type="blue">Tag 1 name</cds-tag>
              <cds-tag type="blue">Tag 2 name</cds-tag>
              <cds-tag type="blue">Tag 3 name</cds-tag>
              <cds-tag type="blue">Tag 4 name</cds-tag>
              <cds-tag type="blue">Tag 5 name</cds-tag>
            </div>
          </cds-popover-content>
        </cds-popover>
      </div>
    `;
  },
};

export const ReadOnly = {
  argTypes: {
    ...controls,
    title: {
      control: 'text',
      description: 'Text to show on clear filters',
    },
    filter: {
      control: 'boolean',
      description: 'Determine if `Tag` is a filter/chip',
    },
  },
  args: {
    ...defaultArgs,
    filter: false,
    title: 'Clear filters',
  },
  render: ({ filter, title, size, disabled }) =>
    html` <cds-tag
        type="red"
        ?filter="${filter}"
        title="${title}"
        size="${size}"
        ?disabled="${disabled}">
        Tag content with a long text description
      </cds-tag>
      ${types
        .slice(1)
        .map(
          (e) =>
            html`<cds-tag
              type="${e}"
              ?filter="${filter}"
              title="${title}"
              size="${size}"
              ?disabled="${disabled}"
              >Tag content</cds-tag
            >`
        )}`,
};

export const WithAILabel = {
  render: () =>
    html`<cds-tag type="red"
        >Tag
        <cds-ai-label alignment="bottom-left">
          ${content}${actions}</cds-ai-label
        >
      </cds-tag>

      <cds-tag filter type="purple">
        Tag
        <cds-ai-label alignment="bottom-left">
          ${content}${actions}</cds-ai-label
        >
      </cds-tag>

      <cds-tag type="blue">
        ${Asleep16({ slot: 'icon' })} Tag
        <cds-ai-label alignment="bottom-left">
          ${content}${actions}</cds-ai-label
        >
      </cds-tag>
      <cds-tag filter type="green">
        ${Asleep16({ slot: 'icon' })} Tag
        <cds-ai-label alignment="bottom-left">
          ${content}${actions}</cds-ai-label
        >
      </cds-tag>`,
};

const meta = {
  title: 'Components/Tag',
};

export default meta;
