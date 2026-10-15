/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import View16 from '@carbon/icons/es/view/16.js';
import FolderOpen16 from '@carbon/icons/es/folder--open/16.js';
import Folders16 from '@carbon/icons/es/folders/16.js';
import ArrowRight16 from '@carbon/icons/es/arrow--right/16.js';
import Launch16 from '@carbon/icons/es/launch/16.js';
import './index';
import '../ai-label';
import '../icon-button';
import '../link';
import { iconLoader } from '../../globals/internal/icon-loader';
import storyDocs from './tile.mdx';
import styles from './tile-story.scss?lit';
import { withLayers } from '../../../.storybook/decorators/with-layers';
import { action } from 'storybook/actions';
import { TILE_COLOR_SCHEME } from './defs';

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

const colorSchemeOptions = {
  Regular: TILE_COLOR_SCHEME.REGULAR,
  Light: TILE_COLOR_SCHEME.LIGHT,
};

const tileArgs = {
  colorScheme: TILE_COLOR_SCHEME.REGULAR,
};

const tileArgTypes = {
  colorScheme: {
    control: 'select',
    options: colorSchemeOptions,
  },
};

const tileControls = Object.keys(tileArgTypes);

const clickableArgs = {
  colorScheme: TILE_COLOR_SCHEME.REGULAR,
  disabled: false,
  href: 'https://www.carbondesignsystem.com/',
  linkRole: 'button',
  rel: '',
  target: '_self',
  onClick: action('onClick'),
};

const clickableArgTypes = {
  colorScheme: {
    control: 'select',
    options: colorSchemeOptions,
  },
  disabled: {
    control: 'boolean',
  },
  href: {
    control: 'text',
  },
  linkRole: {
    control: 'text',
  },
  rel: {
    control: 'text',
  },
  target: {
    control: 'select',
    options: ['_self', '_blank', '_parent', '_top'],
  },
  onClick: {
    action: 'onClick',
  },
};

const clickableControls = Object.keys(clickableArgTypes);

const selectableArgs = {
  checkmarkLabel: 'Selected',
  colorScheme: TILE_COLOR_SCHEME.REGULAR,
  disabled: false,
  selected: false,
  onChange: action('onChange'),
};

const selectableArgTypes = {
  checkmarkLabel: {
    control: 'text',
  },
  colorScheme: {
    control: 'select',
    options: colorSchemeOptions,
  },
  disabled: {
    control: 'boolean',
  },
  selected: {
    control: 'boolean',
  },
  onChange: {
    action: 'onChange',
  },
};

const selectableControls = Object.keys(selectableArgTypes);

const radioArgs = {
  checkmarkLabel: 'Selected',
  colorScheme: TILE_COLOR_SCHEME.REGULAR,
  disabled: false,
  name: 'options',
  selectedValue: 'option-2',
  onChange: action('onChange'),
};

const radioArgTypes = {
  checkmarkLabel: {
    control: 'text',
  },
  colorScheme: {
    control: 'select',
    options: colorSchemeOptions,
  },
  disabled: {
    control: 'boolean',
  },
  name: {
    control: 'text',
  },
  selectedValue: {
    control: 'select',
    options: ['option-1', 'option-2', 'option-3'],
  },
  onChange: {
    action: 'onChange',
  },
};

const radioControls = Object.keys(radioArgTypes);

const expandableArgs = {
  colorScheme: TILE_COLOR_SCHEME.REGULAR,
  disableChange: false,
  expanded: false,
  onBeforeChange: action('onBeforeChange'),
  onChange: action('onChange'),
};

const expandableArgTypes = {
  colorScheme: {
    control: 'select',
    options: colorSchemeOptions,
  },
  disableChange: {
    control: 'boolean',
    description: 'Prevent user-initiated changes to the expanded state.',
  },
  expanded: {
    control: 'boolean',
  },
  onBeforeChange: {
    action: 'onBeforeChange',
  },
  onChange: {
    action: 'onChange',
  },
};

const expandableControls = Object.keys(expandableArgTypes);

const withControls = (include: string[]) => ({
  controls: {
    include,
  },
});

export const Default = {
  args: tileArgs,
  argTypes: tileArgTypes,
  parameters: withControls(tileControls),
  render: ({ colorScheme }) => html`
    <cds-tile color-scheme="${colorScheme}">
      Default tile
      <br />
      <br />
      <cds-link href="https://carbondesignsystem.com">Link</cds-link>
    </cds-tile>
  `,
};

export const DefaultWithLayer = {
  args: tileArgs,
  argTypes: tileArgTypes,
  decorators: [withLayers],
  parameters: {
    layout: 'fullscreen',
    ...withControls(tileControls),
  },
  render: ({ colorScheme }) => html`
    <cds-tile color-scheme="${colorScheme}">
      Default layer
      <br />
      <br />
      <cds-link href="https://carbondesignsystem.com">Link</cds-link>
    </cds-tile>
  `,
};

export const clickable = {
  args: clickableArgs,
  argTypes: clickableArgTypes,
  parameters: withControls(clickableControls),
  render: ({
    colorScheme,
    disabled,
    href,
    linkRole,
    rel,
    target,
    onClick,
  }) => html`
    <cds-clickable-tile
      color-scheme="${colorScheme}"
      ?disabled="${disabled}"
      href="${href}"
      link-role="${linkRole}"
      rel="${rel}"
      target="${target}"
      @click="${onClick}">
      Clickable tile
    </cds-clickable-tile>
  `,
};

export const clickableWithCustomIcon = {
  args: clickableArgs,
  argTypes: clickableArgTypes,
  parameters: withControls(clickableControls),
  render: ({
    colorScheme,
    disabled,
    href,
    linkRole,
    rel,
    target,
    onClick,
  }) => html`
    <cds-clickable-tile
      color-scheme="${colorScheme}"
      ?disabled=${disabled}
      href="${href}"
      link-role="${linkRole}"
      rel="${rel}"
      target="${target}"
      @click="${onClick}">
      Clickable tile ${iconLoader(Launch16, { slot: 'icon' })}
    </cds-clickable-tile>
  `,
};

export const ClickableWithLayer = {
  args: clickableArgs,
  argTypes: clickableArgTypes,
  decorators: [withLayers],
  parameters: {
    layout: 'fullscreen',
    ...withControls(clickableControls),
  },
  render: ({
    colorScheme,
    disabled,
    href,
    linkRole,
    rel,
    target,
    onClick,
  }) => html`
    <cds-clickable-tile
      color-scheme="${colorScheme}"
      ?disabled="${disabled}"
      href="${href}"
      link-role="${linkRole}"
      rel="${rel}"
      target="${target}"
      @click="${onClick}">
      Clickable tile
    </cds-clickable-tile>
  `,
};

export const expandable = {
  args: expandableArgs,
  argTypes: expandableArgTypes,
  parameters: withControls(expandableControls),
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
      <div style="width: 400px">
        <cds-expandable-tile
          color-scheme="${colorScheme}"
          ?expanded="${expanded}"
          @cds-expandable-tile-beingtoggled=${handleBeforeChanged}
          @cds-expandable-tile-toggled=${onChange}>
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
  args: expandableArgs,
  argTypes: expandableArgTypes,
  parameters: withControls(expandableControls),
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
      <div style="width: 400px">
        <cds-expandable-tile
          color-scheme="${colorScheme}"
          with-interactive
          ?expanded="${expanded}"
          @cds-expandable-tile-beingtoggled=${handleBeforeChanged}
          @cds-expandable-tile-toggled=${onChange}>
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
  args: expandableArgs,
  argTypes: expandableArgTypes,
  decorators: [withLayers],
  parameters: {
    layout: 'fullscreen',
    ...withControls(expandableControls),
  },
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
        style="width:400px"
        color-scheme="${colorScheme}"
        ?expanded="${expanded}"
        @cds-expandable-tile-beingtoggled=${handleBeforeChanged}
        @cds-expandable-tile-toggled=${onChange}>
        <cds-tile-above-the-fold-content
          slot="above-the-fold-content"
          style="height: 100px">
          Above the fold content here
        </cds-tile-above-the-fold-content>
        <cds-tile-below-the-fold-content style="height: 200px">
          Below the fold content here
        </cds-tile-below-the-fold-content>
      </cds-expandable-tile>
    `;
  },
};

export const MultiSelect = {
  args: selectableArgs,
  argTypes: selectableArgTypes,
  parameters: withControls(selectableControls),
  render: ({
    checkmarkLabel,
    colorScheme,
    disabled,
    selected,
    onChange,
  }) => html`
    <style>
      ${styles}
    </style>
    <cds-tile-group>
      <cds-selectable-tile
        checkmark-label="${ifDefined(checkmarkLabel)}"
        color-scheme="${colorScheme}"
        ?selected="${selected}"
        value="option-1"
        @cds-selectable-tile-changed="${onChange}"
        ?disabled=${disabled}>
        Option 1
      </cds-selectable-tile>
      <cds-selectable-tile
        checkmark-label="${ifDefined(checkmarkLabel)}"
        color-scheme="${colorScheme}"
        ?selected="${selected}"
        value="option-2"
        @cds-selectable-tile-changed="${onChange}"
        ?disabled=${disabled}>
        Option 2
      </cds-selectable-tile>
      <cds-selectable-tile
        checkmark-label="${ifDefined(checkmarkLabel)}"
        color-scheme="${colorScheme}"
        ?selected="${selected}"
        value="option-3"
        @cds-selectable-tile-changed="${onChange}"
        ?disabled=${disabled}>
        Option 3
      </cds-selectable-tile>
    </cds-tile-group>
  `,
};

export const Radio = {
  args: radioArgs,
  argTypes: radioArgTypes,
  parameters: withControls(radioControls),
  render: ({
    checkmarkLabel,
    colorScheme,
    disabled,
    name,
    selectedValue,
    onChange,
  }) => html`
    <cds-tile-group>
      <legend slot="legend">Radio tile group</legend>
      <cds-radio-tile
        checkmark-label="${ifDefined(checkmarkLabel)}"
        color-scheme="${colorScheme}"
        name="${ifDefined(name)}"
        value="option-1"
        ?disabled=${disabled}
        ?selected="${selectedValue === 'option-1'}"
        @cds-radio-tile-selected="${onChange}">
        Option 1
      </cds-radio-tile>
      <cds-radio-tile
        checkmark-label="${ifDefined(checkmarkLabel)}"
        color-scheme="${colorScheme}"
        name="${ifDefined(name)}"
        value="option-2"
        ?disabled=${disabled}
        ?selected="${selectedValue === 'option-2'}"
        @cds-radio-tile-selected="${onChange}">
        Option 2
      </cds-radio-tile>
      <cds-radio-tile
        checkmark-label="${ifDefined(checkmarkLabel)}"
        color-scheme="${colorScheme}"
        name="${ifDefined(name)}"
        value="option-3"
        ?disabled=${disabled}
        ?selected="${selectedValue === 'option-3'}"
        @cds-radio-tile-selected="${onChange}">
        Option 3
      </cds-radio-tile>
    </cds-tile-group>
  `,
};

export const RadioWithLayer = {
  args: radioArgs,
  argTypes: {
    ...radioArgTypes,
    selectedValue: {
      ...radioArgTypes.selectedValue,
      options: ['option-1', 'option-2'],
    },
  },
  decorators: [withLayers],
  parameters: {
    layout: 'fullscreen',
    ...withControls(radioControls),
  },
  render: ({
    checkmarkLabel,
    colorScheme,
    disabled,
    name,
    selectedValue,
    onChange,
  }) => html`
    <cds-tile-group>
      <legend slot="legend">Radio tile group</legend>
      <cds-radio-tile
        checkmark-label="${ifDefined(checkmarkLabel)}"
        color-scheme="${colorScheme}"
        name="${ifDefined(name)}"
        value="option-1"
        ?disabled=${disabled}
        ?selected="${selectedValue === 'option-1'}"
        @cds-radio-tile-selected="${onChange}">
        Option 1
      </cds-radio-tile>
      <cds-radio-tile
        checkmark-label="${ifDefined(checkmarkLabel)}"
        color-scheme="${colorScheme}"
        name="${ifDefined(name)}"
        value="option-2"
        ?disabled=${disabled}
        ?selected="${selectedValue === 'option-2'}"
        @cds-radio-tile-selected="${onChange}">
        Option 2
      </cds-radio-tile>
    </cds-tile-group>
  `,
};

export const Selectable = {
  args: selectableArgs,
  argTypes: selectableArgTypes,
  parameters: withControls(selectableControls),
  render: ({
    checkmarkLabel,
    colorScheme,
    disabled,
    selected,
    onChange,
  }) => html`
    <cds-selectable-tile
      checkmark-label="${ifDefined(checkmarkLabel)}"
      color-scheme="${colorScheme}"
      ?disabled=${disabled}
      ?selected="${selected}"
      @cds-selectable-tile-changed="${onChange}">
      Selectable
    </cds-selectable-tile>
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
  parameters: withControls(['hasRoundedCorners']),
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
          ${iconLoader(ArrowRight16, { slot: 'icon' })}
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
