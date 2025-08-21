/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import View16 from '@carbon/icons/lib/view/16.js';
import FolderOpen16 from '@carbon/icons/lib/folder--open/16.js';
import Folders16 from '@carbon/icons/lib/folders/16.js';
import ArrowRight16 from '@carbon/icons/lib/arrow--right/16.js';
import Launch16 from '@carbon/icons/lib/launch/16.js';
import './index';
import '../ai-label';
import '../icon-button';
import '../link';
import storyDocs from './tile.mdx';
import styles from './tile-story.scss?lit';
import '../../../.storybook/templates/with-layer';

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

const defaultControls = {
  args: {
    disabled: false,
  },
  argTypes: {
    disabled: {
      control: 'boolean',
    },
  },
};

export const Default = {
  render: () => html`
    <cds-tile>
      Default tile
      <br />
      <br />
      <cds-link href="https://carbondesignsystem.com">Link</cds-link>
    </cds-tile>
  `,
};

export const DefaultWithLayer = {
  render: () => html`
    <sb-template-layers>
      <cds-tile>
        Default layer
        <br />
        <br />
        <cds-link href="https://carbondesignsystem.com">Link</cds-link>
      </cds-tile>
    </sb-template-layers>
  `,
};

export const clickable = {
  ...defaultControls,
  render: ({ disabled }) => html`
    <cds-clickable-tile
      ?disabled="${disabled}"
      href="https://www.carbondesignsystem.com/">
      Clickable tile
    </cds-clickable-tile>
  `,
};

export const clickableWithCustomIcon = {
  ...defaultControls,
  render: ({ disabled }) => html`
    <cds-clickable-tile ?disabled=${disabled} href="https://www.carbondesignsystem.com/">
      Clickable tile
      ${Launch16({ slot: 'icon' })}
      </cds-clickable-tile>
      </cds-clickable-tile>
    </sb-template-layers>
    </cds-clickable-tile>
    </sb-template-layers>
  `,
};

export const ClickableWithLayer = {
  render: () => html`
    <sb-template-layers>
      <cds-clickable-tile href="https://www.carbondesignsystem.com/">
        Clickable tile
      </cds-clickable-tile>
    </sb-template-layers>
  `,
};

export const expandable = {
  render: ({ expanded, disableChange, onBeforeChange, onChange }) => {
    const handleBeforeChanged = (event: CustomEvent) => {
      onBeforeChange(event);
      if (disableChange) {
        event.preventDefault();
      }
    };
    return html`
      <div style="width: 400px">
        <cds-expandable-tile
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
      </div>
    `;
  },
};

export const ExpandableWithInteractive = {
  render: ({ expanded, disableChange, onBeforeChange, onChange }) => {
    const handleBeforeChanged = (event: CustomEvent) => {
      onBeforeChange(event);
      if (disableChange) {
        event.preventDefault();
      }
    };
    return html`
      <div style="width: 400px">
        <cds-expandable-tile
          with-interactive
          ?expanded="${expanded}"
          @cds-expandable-tile-beingchanged=${handleBeforeChanged}
          @cds-expandable-tile-changed=${onChange}>
          <cds-tile-above-the-fold-content
            slot="above-the-fold-content"
            style="height: 200px; width: 200px">
            Above the fold content here
            <div style="padding-top:1rem;">
              <cds-button>Example</cds-button>
            </div>
          </cds-tile-above-the-fold-content>
          <cds-tile-below-the-fold-content style="height: 200px; width: 200px">
            Below the fold content here
            <cds-text-input></cds-text-input>
          </cds-tile-below-the-fold-content>
        </cds-expandable-tile>
      </div>
    `;
  },
};

export const ExpandableWithLayer = {
  render: ({ expanded, disableChange, onBeforeChange, onChange }) => {
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
          ?expanded="${expanded}"
          @cds-expandable-tile-beingchanged=${handleBeforeChanged}
          @cds-expandable-tile-changed=${onChange}>
          <cds-tile-above-the-fold-content
            slot="above-the-fold-content"
            style="height: 100px">
            Above the fold content here
          </cds-tile-above-the-fold-content>
          <cds-tile-below-the-fold-content style="height: 200px">
            Below the fold content here
          </cds-tile-below-the-fold-content>
        </cds-expandable-tile>
      </sb-template-layers>
    `;
  },
};

export const MultiSelect = {
  ...defaultControls,
  render: ({
    checkmarkLabel,
    disabled,
    name,
    selected,
    value,
    onInput,
  }) => html`
    <style>
      ${styles}
    </style>
    <cds-tile-group>
      <cds-selectable-tile
        checkmark-label="${ifDefined(checkmarkLabel)}"
        name="${ifDefined(name)}"
        ?selected="${selected}"
        value="${ifDefined(value)}"
        @input="${onInput}"
        ?disabled=${disabled}>
        Option 1
      </cds-selectable-tile>
      <cds-selectable-tile
        checkmark-label="${ifDefined(checkmarkLabel)}"
        name="${ifDefined(name)}"
        ?selected="${selected}"
        value="${ifDefined(value)}"
        @input="${onInput}"
        ?disabled=${disabled}>
        Option 2
      </cds-selectable-tile>
      <cds-selectable-tile
        checkmark-label="${ifDefined(checkmarkLabel)}"
        name="${ifDefined(name)}"
        ?selected="${selected}"
        value="${ifDefined(value)}"
        @input="${onInput}"
        ?disabled=${disabled}>
        Option 3
      </cds-selectable-tile>
    </cds-tile-group>
  `,
};

export const Radio = {
  ...defaultControls,
  render: ({ checkmarkLabel, disabled, name, value }) => html`
    <cds-tile-group>
      <legend slot="legend">Radio tile group</legend>
      <cds-radio-tile
        checkmark-label="${ifDefined(checkmarkLabel)}"
        name="${ifDefined(name)}"
        value="${ifDefined(value)}"
        ?disabled=${disabled}>
        Option 1
      </cds-radio-tile>
      <cds-radio-tile
        checkmark-label="${ifDefined(checkmarkLabel)}"
        name="${ifDefined(name)}"
        value="${ifDefined(value)}"
        ?disabled=${disabled}
        selected>
        Option 2
      </cds-radio-tile>
      <cds-radio-tile
        checkmark-label="${ifDefined(checkmarkLabel)}"
        name="${ifDefined(name)}"
        value="${ifDefined(value)}"
        ?disabled=${disabled}>
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
        <cds-radio-tile name="options"> Option 1 </cds-radio-tile>
        <cds-radio-tile name="options" selected> Option 2 </cds-radio-tile>
      </cds-tile-group>
    </sb-template-layers>
  `,
};

export const Selectable = {
  ...defaultControls,
  render: (args) => html`
    <cds-selectable-tile ?disabled=${args.disabled}>
      Selectable
    </cds-selectable-tile>
  `,
};

export const WithAILabel = {
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
          <cds-ai-label alignment="bottom-left" slot="decorator">
            ${content}${actions}</cds-ai-label
          >
        </cds-tile>

        <cds-clickable-tile
          href="https://example.com"
          ai-label
          ?has-rounded-corners="${hasRoundedCorners}">
          ${ArrowRight16({ slot: 'icon' })}
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
      </div>
      <div class="ai-label-selectable-tile-container">
        <cds-tile-group>
          <legend slot="legend">Selectable tile group</legend>
          <div>
            <cds-selectable-tile ?has-rounded-corners="${hasRoundedCorners}">
              <span>Option 1</span>
              <cds-ai-label alignment="bottom-left">
                ${content}${actions}</cds-ai-label
              >
            </cds-selectable-tile>

            <cds-selectable-tile ?has-rounded-corners="${hasRoundedCorners}">
              <span>Option 2</span>
              <cds-ai-label alignment="bottom-left">
                ${content}${actions}</cds-ai-label
              >
            </cds-selectable-tile>

            <cds-selectable-tile ?has-rounded-corners="${hasRoundedCorners}">
              <span>Option 3</span>
              <cds-ai-label alignment="bottom-left">
                ${content}${actions}</cds-ai-label
              >
            </cds-selectable-tile>
          </div>
        </cds-tile-group>
      </div>
      <div class="ai-label-selectable-tile-container">
        <cds-tile-group>
          <legend slot="legend">Radio tile group</legend>
          <div>
            <cds-radio-tile
              name="options"
              ?has-rounded-corners="${hasRoundedCorners}">
              <span>Option 1</span>
              <cds-ai-label alignment="bottom-left">
                ${content}${actions}</cds-ai-label
              >
            </cds-radio-tile>

            <cds-radio-tile
              name="options"
              selected
              ?has-rounded-corners="${hasRoundedCorners}">
              <span>Option 2</span>
              <cds-ai-label alignment="bottom-left">
                ${content}${actions}</cds-ai-label
              >
            </cds-radio-tile>

            <cds-radio-tile
              name="options"
              ?has-rounded-corners="${hasRoundedCorners}">
              <span>Option 3</span>
              <cds-ai-label alignment="bottom-left">
                ${content}${actions}</cds-ai-label
              >
            </cds-radio-tile>
          </div>
        </cds-tile-group>
      </div> `;
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
