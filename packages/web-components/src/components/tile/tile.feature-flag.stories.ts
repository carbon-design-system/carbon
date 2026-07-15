/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import View16 from '@carbon/icons/es/view/16.js';
import FolderOpen16 from '@carbon/icons/es/folder--open/16.js';
import Folders16 from '@carbon/icons/es/folders/16.js';
import '../feature-flags/index';
import './index';
import '../ai-label';
import '../icon-button';
import '../link';
import { iconLoader } from '../../globals/internal/icon-loader';
import styles from './tile-story.scss?lit';
import { withLayers } from '../../../.storybook/decorators/with-layers';
import '../../../.storybook/templates/with-feature-flags';
import storyDocs from './tile.featureflag.mdx';

const previewClassname = 'preview-tile';
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

export const Clickable = {
  ...defaultControls,
  render: ({ disabled }) => html`
    <div class=${previewClassname}>
      <feature-flags enable-v12-tile-default-icons>
        <cds-clickable-tile
          enable-tile-contrast
          ?disabled="${disabled}"
          href="https://www.carbondesignsystem.com/">
          Clickable Tile
        </cds-clickable-tile>
      </feature-flags>
    </div>
  `,
};

export const ClickableWithLayer = {
  decorators: [withLayers],
  parameters: {
    layout: 'fullscreen',
  },
  render: () => html`
    <div class=${previewClassname}>
      <feature-flags enable-v12-tile-default-icons>
        <cds-clickable-tile
          enable-tile-contrast
          href="https://www.carbondesignsystem.com/">
          Clickable Tile
        </cds-clickable-tile>
      </feature-flags>
    </div>
  `,
};

export const Expandable = {
  render: ({ expanded, disableChange, onBeforeChange, onChange }) => {
    const handleBeforeChanged = (event: CustomEvent) => {
      onBeforeChange(event);
      if (disableChange) {
        event.preventDefault();
      }
    };
    return html`
      <div style="width: 400px" class=${previewClassname}>
        <cds-expandable-tile
          enable-tile-contrast
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
      <div style="width: 400px" class=${previewClassname}>
        <cds-expandable-tile
          with-interactive
          enable-tile-contrast
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
  decorators: [withLayers],
  parameters: {
    layout: 'fullscreen',
  },
  render: ({ expanded, disableChange, onBeforeChange, onChange }) => {
    const handleBeforeChanged = (event: CustomEvent) => {
      onBeforeChange(event);
      if (disableChange) {
        event.preventDefault();
      }
    };
    return html`
      <div class=${previewClassname}>
        <cds-expandable-tile
          style="width:400px"
          enable-tile-contrast
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
      </div>
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
    <div class=${previewClassname}>
      <cds-tile-group>
        <cds-selectable-tile
          checkmark-label="${ifDefined(checkmarkLabel)}"
          enable-tile-contrast
          name="${ifDefined(name)}"
          ?selected="${selected}"
          value="${ifDefined(value)}"
          @input="${onInput}"
          ?disabled=${disabled}>
          Option 1
        </cds-selectable-tile>
        <cds-selectable-tile
          checkmark-label="${ifDefined(checkmarkLabel)}"
          enable-tile-contrast
          name="${ifDefined(name)}"
          ?selected="${selected}"
          value="${ifDefined(value)}"
          @input="${onInput}"
          ?disabled=${disabled}>
          Option 2
        </cds-selectable-tile>
        <cds-selectable-tile
          checkmark-label="${ifDefined(checkmarkLabel)}"
          enable-tile-contrast
          name="${ifDefined(name)}"
          ?selected="${selected}"
          value="${ifDefined(value)}"
          @input="${onInput}"
          ?disabled=${disabled}>
          Option 3
        </cds-selectable-tile>
      </cds-tile-group>
    </div>
  `,
};

export const Radio = {
  ...defaultControls,
  render: ({ checkmarkLabel, disabled, name, value }) => html`
    <div class=${previewClassname}>
      <feature-flags enable-v12-tile-radio-icons>
        <cds-tile-group>
          <legend slot="legend">Radio tile group</legend>
          <cds-radio-tile
            enable-tile-contrast
            checkmark-label="${ifDefined(checkmarkLabel)}"
            name="${ifDefined(name)}"
            value="${ifDefined(value)}"
            ?disabled=${disabled}>
            Option 1
          </cds-radio-tile>
          <cds-radio-tile
            enable-tile-contrast
            checkmark-label="${ifDefined(checkmarkLabel)}"
            name="${ifDefined(name)}"
            value="${ifDefined(value)}"
            ?disabled=${disabled}
            selected>
            Option 2
          </cds-radio-tile>
          <cds-radio-tile
            enable-tile-contrast
            checkmark-label="${ifDefined(checkmarkLabel)}"
            name="${ifDefined(name)}"
            value="${ifDefined(value)}"
            ?disabled=${disabled}>
            Option 3
          </cds-radio-tile>
        </cds-tile-group>
      </feature-flags>
    </div>
  `,
};

export const RadioWithLayer = {
  decorators: [withLayers],
  parameters: {
    layout: 'fullscreen',
  },
  render: () => html`
    <div class=${previewClassname}>
      <feature-flags enable-v12-tile-radio-icons="true">
        <cds-tile-group>
          <legend slot="legend">Radio tile group</legend>
          <cds-radio-tile enable-tile-contrast name="options">
            Option 1
          </cds-radio-tile>
          <cds-radio-tile enable-tile-contrast name="options" selected>
            Option 2
          </cds-radio-tile>
        </cds-tile-group>
      </feature-flags>
    </div>
  `,
};

export const Selectable = {
  ...defaultControls,
  render: ({ disabled }) => html`
    <div class=${previewClassname}>
      <cds-selectable-tile enable-tile-contrast ?disabled="${disabled}">
        Selectable
      </cds-selectable-tile>
    </div>
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
      <div class=${previewClassname}>
        <feature-flags enable-v12-tile-radio-icons="true">
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
          </div>
        </feature-flags>
      </div> `;
  },
};
const meta = {
  title: 'Components/Tile/Feature Flag',
  tags: ['!autodocs'],
  parameters: {
    docs: {
      page: storyDocs,
    },
  },
  decorators: [
    (story) => html`
      <sb-template-feature-flags> ${story()} </sb-template-feature-flags>
    `,
  ],
};

export default meta;
