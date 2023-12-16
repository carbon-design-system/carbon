/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { boolean } from '@storybook/addon-knobs';
import View16 from '@carbon/icons/lib/view/16';
import FolderOpen16 from '@carbon/icons/lib/folder--open/16';
import Folders16 from '@carbon/icons/lib/folders/16';
import Asleep16 from '@carbon/icons/lib/asleep/16';
import textNullable from '../../../.storybook/knob-text-nullable';
import { prefix } from '../../globals/settings';
import './index';
import '../icon-button/index';
import styles from './slug-story.scss';

const items = [
  {
    value: 'option-0',
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
  },
  {
    value: 'option-1',
    text: 'Option 1',
  },
  {
    value: 'option-2',
    text: 'Option 2',
  },
  {
    value: 'option-3',
    text: 'Option 3 - a disabled item',
    disabled: true,
  },
  {
    value: 'option-4',
    text: 'Option 4',
  },
  {
    value: 'option-5',
    text: 'Option 5',
  },
];

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
  <cds-slug-action-button>View Literature</cds-slug-action-button>
`;

export default {
  title: 'Experimental/Slug/Examples',
};

export const _Checkbox = (args) => {
  const { disabled, invalid, invalidText, warn, warnText } =
    args?.['cds-checkbox'] ?? {};

  return html`
    <style>
      ${styles}
    </style>
    <div style="width: 400px">
      <cds-checkbox-group
        legend-text="Group label"
        ?disabled="${disabled}"
        ?invalid="${invalid}"
        invalid-text="${invalidText}"
        ?warn="${warn}"
        warn-text="${warnText}">
        <cds-slug alignment="bottom-left"> ${content}${actions}</cds-slug>
        <cds-checkbox>Checkbox label</cds-checkbox>
        <cds-checkbox>Checkbox label</cds-checkbox>
        <cds-checkbox>Checkbox label</cds-checkbox>
      </cds-checkbox-group>

      <cds-checkbox-group
        legend-text="Group label"
        ?disabled="${disabled}"
        ?invalid="${invalid}"
        invalid-text="${invalidText}"
        ?warn="${warn}"
        warn-text="${warnText}">
        <cds-checkbox>
          Checkbox label
          <cds-slug alignment="bottom-left"> ${content}${actions}</cds-slug>
        </cds-checkbox>
        <cds-checkbox>
          Checkbox label
          <cds-slug alignment="bottom-left"> ${content}${actions}</cds-slug>
        </cds-checkbox>
        <cds-checkbox>Checkbox label</cds-checkbox>
      </cds-checkbox-group>

      <cds-checkbox-group
        legend-text="Group label"
        ?disabled="${disabled}"
        ?invalid="${invalid}"
        invalid-text="${invalidText}"
        ?warn="${warn}"
        warn-text="${warnText}">
        <cds-checkbox>
          Checkbox label
          <cds-slug alignment="bottom-left" kind="inline">
            ${content}${actions}
          </cds-slug>
        </cds-checkbox>
        <cds-checkbox>
          Checkbox label
          <cds-slug alignment="bottom-left" kind="inline">
            ${content}${actions}
          </cds-slug>
        </cds-checkbox>
        <cds-checkbox>Checkbox label</cds-checkbox>
      </cds-checkbox-group>
    </div>
  `;
};

_Checkbox.parameters = {
  knobs: {
    [`${prefix}-checkbox`]: () => ({
      disabled: boolean('Disabled (disabled)', false),
      invalid: boolean('Invalid (invalid)', false),
      invalidText: textNullable(
        'Invalid text (invalid-text)',
        'Error message goes here'
      ),
      warn: boolean('Warn (warn)', false),
      warnText: textNullable(
        'Warn text (warn-text)',
        'Warning message that is really long can wrap to more lines but should not be excessively long.'
      ),
    }),
  },
};

export const _Combobox = () => {
  return html` <style>
      ${styles}
    </style>
    <div style="width: 400px">
      <cds-combo-box
        helper-text="This is some helper text"
        title-text="Combo box title"
        label="Filter...">
        <cds-slug alignment="bottom-left"> ${content}${actions}</cds-slug>

        <cds-combo-box-item value="all">Option 1</cds-combo-box-item>
        <cds-combo-box-item value="cloudFoundry">Option 2</cds-combo-box-item>
        <cds-combo-box-item value="staging">Option 3</cds-combo-box-item>
        <cds-combo-box-item value="dea">Option 4</cds-combo-box-item>
        <cds-combo-box-item value="router">Option 5</cds-combo-box-item>
        <cds-combo-box-item value="support">Option 6</cds-combo-box-item>
        <cds-combo-box-item value="services">Option 7</cds-combo-box-item>
        <cds-combo-box-item value="products">Option 8</cds-combo-box-item>
      </cds-combo-box>
    </div>`;
};

export const _DatePicker = () => {
  return html` <style>
      ${styles}
    </style>
    <div style="width: 400px">
      <cds-date-picker>
        <cds-date-picker-input
          kind="single"
          label-text="Date Picker label"
          placeholder="mm/dd/yyyy">
          <cds-slug alignment="bottom-left"> ${content}${actions}</cds-slug>
        </cds-date-picker-input>
      </cds-date-picker>
    </div>`;
};

export const _Dropdown = () => {
  return html` <style>
      ${styles}
    </style>
    <div style="width: 400px">
      <cds-dropdown
        helper-text="This is some helper text"
        title-text="Dropdown label"
        label="Dropdown menu options">
        <cds-slug alignment="bottom-left"> ${content}${actions}</cds-slug>
        ${items.map(
          (elem) => html`
            <cds-dropdown-item ?disabled=${elem.disabled} value="${elem.value}"
              >${elem.text}</cds-dropdown-item
            >
          `
        )}
      </cds-dropdown>
    </div>`;
};

export const _Multiselect = () => {
  return html` <style>
      ${styles}
    </style>
    <div style="width: 400px">
      <cds-multi-select
        title-text="Multiselect title"
        label="Multiselect label"
        helper-text="This is helper text">
        <cds-slug alignment="bottom-left"> ${content}${actions}</cds-slug>
        <cds-multi-select-item value="example">
          An example option that is really long to show what should be done to
          handle long text</cds-multi-select-item
        >
        <cds-multi-select-item value="all">Option 1</cds-multi-select-item>
        <cds-multi-select-item value="cloudFoundry"
          >Option 2</cds-multi-select-item
        >
        <cds-multi-select-item disabled value="staging"
          >Option 3 - a disabled item</cds-multi-select-item
        >
        <cds-multi-select-item value="dea">Option 4</cds-multi-select-item>
        <cds-multi-select-item value="router">Option 5</cds-multi-select-item>
      </cds-multi-select>
    </div>`;
};

export const _FilterableMultiselect = () => {
  return html` <style>
      ${styles}
    </style>
    <div style="width: 400px">
      <cds-multi-select
        filterable="true"
        title-text="FilterableMultiselect title"
        helper-text="This is helper text">
        <cds-slug alignment="bottom-left"> ${content}${actions}</cds-slug>
        <cds-multi-select-item value="example"
          >An example option that is really long to show what should be done to
          handle long text</cds-multi-select-item
        >
        <cds-multi-select-item value="all">Option 1</cds-multi-select-item>
        <cds-multi-select-item value="cloudFoundry"
          >Option 2</cds-multi-select-item
        >
        <cds-multi-select-item disabled value="staging"
          >Option 3 - a disabled item</cds-multi-select-item
        >
        <cds-multi-select-item value="dea">Option 4</cds-multi-select-item>
        <cds-multi-select-item value="router">Option 5</cds-multi-select-item>
      </cds-multi-select>
    </div>`;
};

export const _NumberItem = () => {
  return html`<style>
      ${styles}
    </style>
    <div style="width: 400px">
      <cds-number-input
        value="50"
        min="0"
        max="100"
        step="1"
        label="Number input">
        <cds-slug alignment="bottom-left"> ${content}${actions} </cds-slug>
      </cds-number-input>
    </div> `;
};

export const _RadioButton = (args) => {
  const { disabled, invalid, invalidText, warn, warnText } =
    args?.['cds-radio-button'] ?? {};

  return html`
    <style>
      ${styles}
    </style>
    <cds-radio-button-group
      legend-text="Group label"
      name="radio-group"
      value="radio-1"
      orientation="vertical"
      ?disabled="${disabled}"
      ?invalid="${invalid}"
      invalid-text="${invalidText}"
      ?warn="${warn}"
      warn-text="${warnText}">
      <cds-slug alignment="bottom-left"> ${content}${actions} </cds-slug>
      <cds-radio-button
        label-text="Radio button label"
        value="radio-1"></cds-radio-button>
      <cds-radio-button
        label-text="Radio button label"
        value="radio-2"></cds-radio-button>
      <cds-radio-button
        label-text="Radio button label"
        value="radio-3"></cds-radio-button>
    </cds-radio-button-group>

    <cds-radio-button-group
      legend-text="Group label"
      name="radio-group-2"
      value="radio-4"
      orientation="vertical"
      ?disabled="${disabled}"
      ?invalid="${invalid}"
      invalid-text="${invalidText}"
      ?warn="${warn}"
      warn-text="${warnText}">
      <cds-radio-button label-text="Radio button label" value="radio-4">
        <cds-slug alignment="bottom-left"> ${content}${actions} </cds-slug>
      </cds-radio-button>
      <cds-radio-button label-text="Radio button label" value="radio-5">
        <cds-slug alignment="bottom-left"> ${content}${actions} </cds-slug>
      </cds-radio-button>
      <cds-radio-button
        label-text="Radio button label"
        value="radio-6"></cds-radio-button>
    </cds-radio-button-group>

    <cds-radio-button-group
      legend-text="Group label"
      name="radio-group-3"
      value="radio-7"
      orientation="vertical"
      ?disabled="${disabled}"
      ?invalid="${invalid}"
      invalid-text="${invalidText}"
      ?warn="${warn}"
      warn-text="${warnText}">
      <cds-radio-button label-text="Radio button label" value="radio-7">
        <cds-slug alignment="bottom-left" kind="inline">
          ${content}${actions}
        </cds-slug>
      </cds-radio-button>
      <cds-radio-button label-text="Radio button label" value="radio-8">
        <cds-slug alignment="bottom-left" kind="inline">
          ${content}${actions}
        </cds-slug>
      </cds-radio-button>
      <cds-radio-button
        label-text="Radio button label"
        value="radio-9"></cds-radio-button>
    </cds-radio-button-group>
  `;
};

_RadioButton.parameters = {
  knobs: {
    [`${prefix}-radio-button`]: () => ({
      disabled: boolean('Disabled (disabled)', false),
      invalid: boolean('Invalid (invalid)', false),
      invalidText: textNullable(
        'Invalid text (invalid-text)',
        'Error message goes here'
      ),
      warn: boolean('Warn (warn)', false),
      warnText: textNullable(
        'Warn text (warn-text)',
        'Warning message that is really long can wrap to more lines but should not be excessively long.'
      ),
    }),
  },
};

export const _Select = () => {
  return html`<style>
      ${styles}
    </style>
    <div style="width: 400px">
      <cds-select
        helper-text="Optional helper text"
        label-text="Select"
        placeholder="Optional placeholder text">
        <cds-slug alignment="bottom-left"> ${content}${actions}</cds-slug>
        <cds-select-item-group label="Category 1">
          <cds-select-item value="all">Option 1</cds-select-item>
          <cds-select-item value="cloudFoundry">Option 2</cds-select-item>
        </cds-select-item-group>
        <cds-select-item-group label="Category 2">
          <cds-select-item value="staging">Option 3</cds-select-item>
          <cds-select-item value="dea">Option 4</cds-select-item>
          <cds-select-item value="router">Option 5</cds-select-item>
        </cds-select-item-group>
      </cds-select>
    </div> `;
};

const tagTypes = [
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

export const _Tag = () => {
  return html`
    <style>
      ${styles}
    </style>
    <div class="slug-tag-container">
      ${tagTypes.map(
        (e) => html`<cds-tag type="${e}"
          >Tag
          <cds-slug alignment="bottom-left"> ${content}${actions}</cds-slug>
        </cds-tag>`
      )}
    </div>

    <div class="slug-tag-container">
      ${tagTypes.map(
        (e) =>
          html`<cds-tag filter type="${e}">
            Tag
            <cds-slug alignment="bottom-left"> ${content}${actions}</cds-slug>
          </cds-tag>`
      )}
    </div>

    <div class="slug-tag-container">
      ${tagTypes.map(
        (e) =>
          html`<cds-tag type="${e}">
            ${Asleep16({ slot: 'icon' })} Tag
            <cds-slug alignment="bottom-left"> ${content}${actions}</cds-slug>
          </cds-tag>`
      )}
    </div>

    <div class="slug-tag-container">
      ${tagTypes.map(
        (e) =>
          html`<cds-tag filter type="${e}">
            ${Asleep16({ slot: 'icon' })} Tag
            <cds-slug alignment="bottom-left"> ${content}${actions}</cds-slug>
          </cds-tag>`
      )}
    </div>
  `;
};

export const _TextInput = () => {
  return html`<style>
      ${styles}
    </style>
    <div style="width: 400px">
      <cds-text-input label="Text input label" placeholder="Placeholder text">
        <cds-slug alignment="bottom-left"> ${content}${actions}</cds-slug>
      </cds-text-input>
    </div> `;
};

export const _TextArea = () => {
  return html`<style>
      ${styles}
    </style>
    <div style="width: 400px">
      <cds-textarea label="Text input label" placeholder="Placeholder text">
        <cds-slug alignment="bottom-left"> ${content}${actions}</cds-slug>
      </cds-textarea>
    </div> `;
};

export const _Tile = (args) => {
  const { hasRoundedCorners } = args?.['cds-tile'] ?? {};
  return html`<style>
      ${styles}
    </style>
    <div class="slug-tile-container">
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
        <cds-slug alignment="bottom-left"> ${content}${actions}</cds-slug>
      </cds-tile>

      <cds-clickable-tile
        href="https://example.com"
        slug
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
        <cds-slug alignment="bottom-left"> ${content}${actions}</cds-slug>
      </cds-selectable-tile>

      <cds-expandable-tile
        with-interactive
        ?has-rounded-corners="${hasRoundedCorners}">
        <cds-tile-above-the-fold-content slot="above-the-fold-content">
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
        </cds-tile-above-the-fold-content>
        <cds-tile-below-the-fold-content>
          <h6>Expanded Section</h6>
          <p>
            Lorem ipsum dolor sit amet consectetur. Posuere duis fermentum sit
            at consectetur turpis mauris.
          </p>
        </cds-tile-below-the-fold-content>
        <cds-slug alignment="bottom-left"> ${content}${actions}</cds-slug>
      </cds-expandable-tile>
    </div> `;
};

_Tile.parameters = {
  knobs: {
    [`${prefix}-tile`]: () => ({
      hasRoundedCorners: boolean(
        'hasRoundedCorners (has-rounded-corners)',
        false
      ),
    }),
  },
};
