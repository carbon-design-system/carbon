/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { TILE_COLOR_SCHEME } from './tile';
import View16 from '@carbon/icons/lib/view/16.js';
import FolderOpen16 from '@carbon/icons/lib/folder--open/16.js';
import Folders16 from '@carbon/icons/lib/folders/16.js';
import './index';
import '../ai-label';
import '../icon-button';
import storyDocs from './tile.mdx';
import styles from './tile-story.scss?lit';
import '../../../.storybook/templates/with-layer';

const content = html`
  <div slot="body-text">
    <p class="secondary">AI Explained</p>
    <h1>84%</h1>
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

const colorSchemes = {
  [`Regular`]: null,
  [`Light (${TILE_COLOR_SCHEME.LIGHT})`]: TILE_COLOR_SCHEME.LIGHT,
};

const defaultArgs = {
  checkmarkLabel: '',
  colorScheme: null,
  name: 'selectable-tile',
  value: '',
  onInput: 'input',
};

const colorSchemeControl = {
  colorScheme: {
    control: 'select',
    description: 'Color scheme (color-scheme)',
    options: colorSchemes,
  },
};

const defaultHref = {
  href: 'https://example.com',
};

const hrefControl = {
  href: {
    control: 'text',
    description: 'Href for clickable UI (href)',
  },
};

const radioControls = {
  checkmarkLabel: {
    control: 'text',
    description: 'Label text for the checkmark icon (checkmark-label)',
  },
  ...colorSchemeControl,
  name: {
    control: 'text',
    description: 'Name (name)',
  },
  value: {
    control: 'text',
    description: 'Value (value)',
  },
  onInput: {
    action: `input`,
    table: {
      disable: true,
    },
  },
};

const multiSelectableControls = {
  ...radioControls,
  selected: {
    control: 'boolean',
    description: 'Selected (selected)',
  },
};

const expandableArgs = {
  colorScheme: null,
  expanded: false,
  disableChange: false,
  onBeforeChange: 'cds-expandable-tile-beingchanged',
  onChange: 'cds-expandable-tile-changed',
};

const expandableControls = {
  ...colorSchemeControl,
  expanded: {
    control: 'boolean',
    description: 'Expanded (expanded)',
  },
  disableChange: {
    control: 'boolean',
    description:
      'Disable user-initiated change in expanded state (Call event.preventDefault() in cds-expandable-tile-beingchanged event)',
  },
  onBeforeChange: {
    action: 'cds-expandable-tile-beingchanged',
    table: {
      disable: true,
    },
  },
  onChange: {
    action: 'cds-expandable-tile-changed',
    table: {
      disable: true,
    },
  },
};

export const clickable = {
  args: defaultHref,
  argTypes: hrefControl,
  render: ({ href }) => html`
    <cds-clickable-tile href="${ifDefined(href)}">
      Clickable tile
    </cds-clickable-tile>
  `,
};

export const ClickableWithLayer = {
  args: defaultHref,
  argTypes: hrefControl,
  render: ({ href }) => html`
    <sb-template-layers>
      <cds-clickable-tile href="${ifDefined(href)}">
        Clickable tile
      </cds-clickable-tile>
    </sb-template-layers>
  `,
};

export const Default = {
  argTypes: colorSchemeControl,
  render: ({ colorScheme }) => html`
    <cds-tile color-scheme="${ifDefined(colorScheme)}">
      Default tile
      <a href="https://example.com">Link</a>
    </cds-tile>
  `,
};

export const DefaultWithLayer = {
  argTypes: colorSchemeControl,
  render: ({ colorScheme }) => html`
    <sb-template-layers>
      <cds-tile color-scheme="${ifDefined(colorScheme)}">
        Default layer
        <a href="https://example.com">Link</a>
      </cds-tile>
    </sb-template-layers>
  `,
};

export const expandable = {
  args: expandableArgs,
  argTypes: expandableControls,
  render: ({
    colorScheme,
    expanded,
    disableChange,
    onBeforeChange,
    onChange,
  }) => {
    const handleBeforeChanged = (event: CustomEvent) => {
      onBeforeChange(event);
      if (disableChange) {
        event.preventDefault();
      }
    };
    return html`
      <cds-expandable-tile
        color-scheme="${ifDefined(colorScheme)}"
        ?expanded="${expanded}"
        @cds-expandable-tile-beingchanged=${handleBeforeChanged}
        @cds-expandable-tile-changed=${onChange}>
        <cds-tile-above-the-fold-content
          slot="above-the-fold-content"
          style="height: 200px">
          Above the fold content here
        </cds-tile-above-the-fold-content>
        <cds-tile-below-the-fold-content style="height: 300px">
          Below the fold content here
        </cds-tile-below-the-fold-content>
      </cds-expandable-tile>
    `;
  },
};

export const ExpandableWithInteractive = {
  args: expandableArgs,
  argTypes: expandableControls,
  render: ({
    colorScheme,
    expanded,
    disableChange,
    onBeforeChange,
    onChange,
  }) => {
    const handleBeforeChanged = (event: CustomEvent) => {
      onBeforeChange(event);
      if (disableChange) {
        event.preventDefault();
      }
    };
    return html`
      <cds-expandable-tile
        with-interactive
        color-scheme="${ifDefined(colorScheme)}"
        ?expanded="${expanded}"
        @cds-expandable-tile-beingchanged=${handleBeforeChanged}
        @cds-expandable-tile-changed=${onChange}>
        <cds-tile-above-the-fold-content
          slot="above-the-fold-content"
          style="height: 200px">
          Above the fold content here
          <div style="padding-top:1rem;">
            <cds-button>Example</cds-button>
          </div>
        </cds-tile-above-the-fold-content>
        <cds-tile-below-the-fold-content style="height: 300px">
          Below the fold content here
          <cds-text-input></cds-text-input>
        </cds-tile-below-the-fold-content>
      </cds-expandable-tile>
    `;
  },
};

export const ExpandableWithLayer = {
  render: ({
    colorScheme,
    expanded,
    disableChange,
    onBeforeChange,
    onChange,
  }) => {
    const handleBeforeChanged = (event: CustomEvent) => {
      onBeforeChange(event);
      if (disableChange) {
        event.preventDefault();
      }
    };
    return html`
      <sb-template-layers>
        <cds-expandable-tile
          style="width:400px"
          color-scheme="${ifDefined(colorScheme)}"
          ?expanded="${expanded}"
          @cds-expandable-tile-beingchanged=${handleBeforeChanged}
          @cds-expandable-tile-changed=${onChange}>
          <cds-tile-above-the-fold-content
            slot="above-the-fold-content"
            style="height: 200px">
            Above the fold content here
          </cds-tile-above-the-fold-content>
          <cds-tile-below-the-fold-content style="height: 300px">
            Below the fold content here
          </cds-tile-below-the-fold-content>
        </cds-expandable-tile>
      </sb-template-layers>
    `;
  },
};

export const MultiSelect = {
  args: defaultArgs,
  argTypes: multiSelectableControls,
  render: ({
    checkmarkLabel,
    colorScheme,
    name,
    selected,
    value,
    onInput,
  }) => html`
    <cds-tile-group>
      <cds-selectable-tile
        checkmark-label="${ifDefined(checkmarkLabel)}"
        color-scheme="${ifDefined(colorScheme)}"
        name="${ifDefined(name)}"
        ?selected="${selected}"
        value="${ifDefined(value)}"
        @input="${onInput}">
        Option 1
      </cds-selectable-tile>
      <cds-selectable-tile
        checkmark-label="${ifDefined(checkmarkLabel)}"
        color-scheme="${ifDefined(colorScheme)}"
        name="${ifDefined(name)}"
        ?selected="${selected}"
        value="${ifDefined(value)}"
        @input="${onInput}">
        Option 2
      </cds-selectable-tile>
      <cds-selectable-tile
        checkmark-label="${ifDefined(checkmarkLabel)}"
        color-scheme="${ifDefined(colorScheme)}"
        name="${ifDefined(name)}"
        ?selected="${selected}"
        value="${ifDefined(value)}"
        @input="${onInput}">
        Option 3
      </cds-selectable-tile>
    </cds-tile-group>
  `,
};

export const Radio = {
  args: defaultArgs,
  argTypes: radioControls,
  render: ({ checkmarkLabel, colorScheme, name, value, onInput }) => html`
    <cds-tile-group>
      <legend slot="legend">Radio tile group</legend>
      <cds-radio-tile
        checkmark-label="${ifDefined(checkmarkLabel)}"
        color-scheme="${ifDefined(colorScheme)}"
        name="${ifDefined(name)}"
        value="${ifDefined(value)}"
        @input="${onInput}">
        Option 1
      </cds-radio-tile>
      <cds-radio-tile
        checkmark-label="${ifDefined(checkmarkLabel)}"
        color-scheme="${ifDefined(colorScheme)}"
        name="${ifDefined(name)}"
        value="${ifDefined(value)}"
        @input="${onInput}">
        Option 2
      </cds-radio-tile>
      <cds-radio-tile
        checkmark-label="${ifDefined(checkmarkLabel)}"
        color-scheme="${ifDefined(colorScheme)}"
        name="${ifDefined(name)}"
        value="${ifDefined(value)}"
        @input="${onInput}">
        Option 3
      </cds-radio-tile>
    </cds-tile-group>
  `,
};

export const RadioWithLayer = {
  render: () => html`
    <sb-template-layers>
      <cds-tile-group>
        <legend slot="legend">Radio tile group</legend>
        <cds-radio-tile name="option-1a"> Option 1 </cds-radio-tile>
        <cds-radio-tile name="option-2a"> Option 2 </cds-radio-tile>
      </cds-tile-group>
    </sb-template-layers>
  `,
};

export const Selectable = {
  render: () => html`
    <cds-selectable-tile> Default tile </cds-selectable-tile>
  `,
};

export const WithAILabel = {
  args: {
    hasRoundedCorners: false,
  },
  argTypes: {
    hasRoundedCorners: {
      control: 'boolean',
    },
  },
  render: (args) => {
    const { hasRoundedCorners } = args ?? {};
    return html`<style>
        ${styles}
      </style>
      <div class="ai-label-tile-container">
        <cds-tile ?has-rounded-corners="${hasRoundedCorners}">
          <div class="tile-container">
            <h4>Title</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur. Posuere duis fermentum sit
              at consectetur turpis mauris gravida penatibus.
            </p>
            <div class="ai-data">
              <div class="data-container">
                <p>Data Quality</p>
                <h3>85%</h3>
              </div>
              <div class="data-container">
                <p>Label text</p>
                <h3>16%</h3>
              </div>
            </div>
          </div>
          <cds-ai-label alignment="bottom-left">
            ${content}${actions}</cds-ai-label
          >
        </cds-tile>

        <cds-clickable-tile
          href="https://example.com"
          ai-label
          ?has-rounded-corners="${hasRoundedCorners}">
          <div class="tile-container">
            <h4>Title</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur. Posuere duis fermentum sit
              at consectetur turpis mauris gravida penatibus.
            </p>
            <div class="ai-data">
              <div class="data-container">
                <p>Data Quality</p>
                <h3>85%</h3>
              </div>
              <div class="data-container">
                <p>Label text</p>
                <h3>16%</h3>
              </div>
            </div>
          </div>
        </cds-clickable-tile>

        <cds-selectable-tile ?has-rounded-corners="${hasRoundedCorners}">
          <div class="tile-container">
            <h4>Title</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur. Posuere duis fermentum sit
              at consectetur turpis mauris gravida penatibus.
            </p>
            <div class="ai-data">
              <div class="data-container">
                <p>Data Quality</p>
                <h3>85%</h3>
              </div>
              <div class="data-container">
                <p>Label text</p>
                <h3>16%</h3>
              </div>
            </div>
          </div>
          <cds-ai-label alignment="bottom-left">
            ${content}${actions}</cds-ai-label
          >
        </cds-selectable-tile>

        <cds-expandable-tile
          with-interactive
          ?has-rounded-corners="${hasRoundedCorners}">
          <cds-tile-above-the-fold-content slot="above-the-fold-content">
            <div class="tile-container">
              <h4>Title</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur. Posuere duis fermentum
                sit at consectetur turpis mauris gravida penatibus.
              </p>
              <div class="ai-data">
                <div class="data-container">
                  <p>Data Quality</p>
                  <h3>85%</h3>
                </div>
                <div class="data-container">
                  <p>Label text</p>
                  <h3>16%</h3>
                </div>
              </div>
            </div>
          </cds-tile-above-the-fold-content>
          <cds-tile-below-the-fold-content>
            <h6>Expanded Section</h6>
            <p>
              Lorem ipsum dolor sit amet consectetur. Posuere duis fermentum sit
              at consectetur turpis mauris.
            </p>
          </cds-tile-below-the-fold-content>
          <cds-ai-label alignment="bottom-left">
            ${content}${actions}</cds-ai-label
          >
        </cds-expandable-tile>
      </div>`;
  },
};

const meta = {
  title: 'Components/Tile',
  decorators: [(story) => html` <div>${story()}</div> `],
  parameters: {
    actions: { argTypesRegex: '^on.*' },
    docs: {
      page: storyDocs,
    },
  },
};

export default meta;
