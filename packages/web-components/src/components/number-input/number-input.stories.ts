/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { iconLoader } from '../../globals/internal/icon-loader';
import View16 from '@carbon/icons/es/view/16.js';
import FolderOpen16 from '@carbon/icons/es/folder--open/16.js';
import Folders16 from '@carbon/icons/es/folders/16.js';
import { INPUT_SIZE } from '../text-input/text-input';
import './number-input';
import './number-input-skeleton';
import '../form/form-item';
import '../ai-label';
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

const args = {
  allowEmpty: false,
  decrementButtonDescription: 'decrease number input',
  incrementButtonDescription: 'increase number input',
  disabled: false,
  helperText: 'Optional helper text',
  hideLabel: false,
  hideSteppers: false,
  invalid: false,
  invalidText: 'Number is not valid',
  label: 'number-input label',
  readOnly: false,
  value: 50,
  warn: false,
  warnText: 'Warning text',
  min: 0,
  max: 100,
  step: 1,
  size: INPUT_SIZE.MEDIUM,
  type: 'number',
  locale: 'en-US',
  inputMode: 'decimal',
  stepStartValue: 0,
  disableWheel: false,
};

const argTypes = {
  allowEmpty: {
    control: 'boolean',
    description: '<code>true</code> to allow empty string.',
  },
  decrementButtonDescription: {
    control: 'text',
    description:
      'Decrement button assistive description (decrement-button-assistive-text)',
  },
  incrementButtonDescription: {
    control: 'text',
    description:
      'Increment button assistive description (increment-button-assistive-text)',
  },
  disabled: {
    control: 'boolean',
    description: 'Specify if the control should be disabled, or not.',
  },
  helperText: {
    control: 'text',
    description:
      'Provide text that is used alongside the control label for additional help.',
  },
  hideLabel: {
    control: 'boolean',
    description:
      'Specify whether you want the underlying label to be visually hidden.',
  },
  hideSteppers: {
    control: 'boolean',
    description: 'Specify whether you want the steppers to be hidden.',
  },
  invalid: {
    control: 'boolean',
    description: 'Specify if the currently value is invalid.',
  },
  invalidText: {
    control: 'text',
    description: 'Message which is displayed if the value is invalid.',
  },
  label: {
    control: 'text',
    description:
      'Generic <code>label</code> that will be used as the textual representation of what this field is for.',
  },
  readOnly: {
    control: 'boolean',
    description: 'Specify if the component should be read-only.',
  },
  value: {
    control: 'number',
    description: 'Specify the value of the input.',
  },
  warn: {
    control: 'boolean',
    description: 'Specify whether the control is currently in warning state.',
  },
  warnText: {
    control: 'text',
    description:
      'Provide the text that is displayed when the control is in warning state.',
  },
  min: {
    control: 'number',
    description: 'The minimum value.',
  },
  max: {
    control: 'number',
    description: 'The maximum value.',
  },
  step: {
    control: 'number',
    description:
      'Specify how much the values should increase/decrease upon clicking on up/down button.',
  },
  size: {
    control: 'select',
    description: 'Specify the size of the Number Input.',
    options: sizes,
  },
  onInput: {
    action: 'input',
  },
  type: {
    control: 'select',
    description: 'Specify if the input should be of type text or number.',
    options: ['number', 'text'],
  },
  locale: {
    control: 'text',
    description:
      'Specify a BCP47 language code for parsing and formatting (use with type="text").',
  },
  inputMode: {
    control: 'select',
    description:
      'Instruct the browser which keyboard to display on mobile devices.',
    options: [
      'none',
      'text',
      'tel',
      'url',
      'email',
      'numeric',
      'decimal',
      'search',
    ],
  },
  stepStartValue: {
    control: 'number',
    description:
      'Provide the value stepping should begin at when the input is empty.',
  },
  disableWheel: {
    control: 'boolean',
    description:
      'Specify if the wheel functionality for the input should be disabled.',
  },
};

export const Default = {
  args,
  argTypes,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => {
    const {
      allowEmpty,
      decrementButtonDescription,
      incrementButtonDescription,
      disabled,
      helperText,
      hideLabel,
      hideSteppers,
      invalid,
      invalidText,
      label,
      readOnly,
      warn,
      warnText,
      value,
      min,
      max,
      size,
      step,
      type,
      locale,
      inputMode,
      stepStartValue,
      disableWheel,
      onInput,
    } = args ?? {};
    return html`
      <cds-form-item>
        <cds-number-input
          ?allow-empty="${allowEmpty}"
          decrement-button-assistive-text="${ifDefined(
            decrementButtonDescription
          )}"
          increment-button-assistive-text="${ifDefined(
            incrementButtonDescription
          )}"
          helper-text="${ifDefined(helperText)}"
          ?hide-steppers="${hideSteppers}"
          ?hide-label="${hideLabel}"
          ?invalid="${invalid}"
          invalid-text="${ifDefined(invalidText)}"
          label="${ifDefined(label)}"
          ?readonly="${readOnly}"
          value="${ifDefined(value)}"
          ?warn="${warn}"
          warn-text="${ifDefined(warnText)}"
          ?disabled="${disabled}"
          min="${ifDefined(min)}"
          max="${ifDefined(max)}"
          size="${ifDefined(size)}"
          step="${ifDefined(step)}"
          type="${ifDefined(type)}"
          locale="${ifDefined(locale)}"
          input-mode="${ifDefined(inputMode)}"
          step-start-value="${ifDefined(stepStartValue)}"
          ?disable-wheel="${disableWheel}"
          @input="${onInput}">
        </cds-number-input>
      </cds-form-item>
    `;
  },
};

export const Skeleton = {
  parameters: {
    percy: {
      skip: true,
    },
  },
  args: {
    hideLabel: false,
    size: INPUT_SIZE.MEDIUM,
  },
  argTypes: {
    hideLabel: {
      control: 'boolean',
      description:
        'Specify whether you want the underlying label to be visually hidden',
    },
    size: {
      control: 'select',
      options: [INPUT_SIZE.SMALL, INPUT_SIZE.MEDIUM, INPUT_SIZE.LARGE],
      description: 'Specify the size of the Number Input skeleton.',
      table: {
        defaultValue: { summary: '"md"' },
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => {
    const { hideLabel, size } = args ?? {};

    return html`
      <cds-number-input-skeleton
        ?hide-label="${hideLabel}"
        size="${ifDefined(size)}">
      </cds-number-input-skeleton>
    `;
  },
};

export const WithAILabel = {
  render: () => html`
    <div style="width: 400px">
      <cds-number-input
        value="50"
        min="0"
        max="100"
        step="1"
        label="Number input"
        helper-text="Optional helper text.">
        <cds-ai-label alignment="bottom-left">
          ${content}${actions}
        </cds-ai-label>
      </cds-number-input>
    </div>
  `,
};

export const WithTypeOfText = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (_args: any, { globals: { locale } }: any) => {
    return html`
      <cds-form-item>
        <cds-number-input
          type="text"
          input-mode="decimal"
          allow-empty
          default-value="50"
          min="0"
          max="100000000"
          step="1"
          locale="${locale}"
          label="NumberInput label"
          invalid-text="Number is not valid. Must be between 0 and 100000000"
          helper-text="Optional helper text. Uses ${locale} formatting.">
        </cds-number-input>
      </cds-form-item>
    `;
  },
};

export const WithTypeOfTextControlled = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (_args: any, { globals: { locale } }: any) => {
    return html`
      <cds-form-item>
        <cds-number-input
          id="controlled-number-input"
          type="text"
          input-mode="decimal"
          allow-empty
          min="0"
          max="100000000"
          step="1"
          locale="${locale}"
          label="NumberInput label"
          helper-text="Optional helper text. Uses ${locale} formatting.">
        </cds-number-input>
      </cds-form-item>
      <button
        @click="${() => {
          const input = document.querySelector(
            '#controlled-number-input'
          ) as HTMLElement & { value: string };
          if (input) {
            input.value = '50';
          }
        }}">
        set to 50
      </button>
    `;
  },
};

export const WithTypeOfCustomValidation = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (_args: any, { globals: { locale } }: any) => {
    // Custom user-passed validator
    const validateNumberSeparators = (
      input: string,
      locale: string
    ): boolean => {
      if (input === '') {
        return true;
      }

      // Get separators for the locale
      const getSeparators = (locale: string) => {
        const numberWithGroupAndDecimal = 1234567.89;
        const formatted = new Intl.NumberFormat(locale).format(
          numberWithGroupAndDecimal
        );

        const digitPattern =
          '[\\u0030-\\u0039\\u0660-\\u0669\\u0966-\\u096F\\u09E6-\\u09EF\\uFF10-\\uFF19一二三四五六七八九〇零]';
        const nonDigitPattern =
          '[^\\u0030-\\u0039\\u0660-\\u0669\\u0966-\\u096F\\u09E6-\\u09EF\\uFF10-\\uFF19一二三四五六七八九〇零]+';

        const regex = new RegExp(
          `(${nonDigitPattern})${digitPattern}{3}(${nonDigitPattern})${digitPattern}{2}$`
        );
        const match = formatted.match(regex);

        if (match) {
          return { groupSeparator: match[1], decimalSeparator: match[2] };
        }
        return { groupSeparator: null, decimalSeparator: null };
      };

      // Normalize input
      const normalizeInput = (value: string) =>
        value
          .replace(/[\u061C\u200E\u200F\u202A-\u202E\u2066-\u2069]/g, '')
          .replace(/[\u2212\u2012\u2013\u2014\uFE63\uFF0D]/g, '-');

      input = normalizeInput(input);
      const { groupSeparator, decimalSeparator } = getSeparators(locale);

      if (!decimalSeparator) {
        return !isNaN(Number(input));
      }

      const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const digit =
        '[\\u0030-\\u0039\\u0660-\\u0669\\u0966-\\u096F\\u09E6-\\u09EF\\uFF10-\\uFF19一二三四五六七八九〇零]';

      let group = '';
      if (groupSeparator) {
        if (groupSeparator?.trim() === '') {
          group = '[\\u00A0\\u202F\\s]';
        } else if (groupSeparator === ',' || groupSeparator === '٬') {
          group = '[,٬]';
        } else {
          group = esc(groupSeparator);
        }
      }

      let decimal = esc(decimalSeparator);
      if (decimalSeparator === '.' || decimalSeparator === '٫') {
        decimal = '[.٫]';
      }

      const sign = '[\\-\\u2212]?';
      const scientific = `([eE][+-]?${digit}+)?`;

      const usesGrouping =
        group &&
        (groupSeparator?.trim() === ''
          ? /[\u00A0\u202F\s]/.test(input)
          : groupSeparator === ',' || groupSeparator === '٬'
            ? /[,٬]/.test(input)
            : groupSeparator
              ? input.includes(groupSeparator)
              : false);

      const scientificMatch = input?.match(/^([^eE]+)([eE][+-]?.*)?$/);
      const baseNumber = scientificMatch ? scientificMatch[1] : input;

      let integerPart: string;
      if (decimalSeparator === '.' || decimalSeparator === '٫') {
        integerPart = baseNumber?.split(/[.,]/)[0];
      } else {
        integerPart = baseNumber?.split(decimalSeparator)[0];
      }

      const integerRegex = usesGrouping
        ? new RegExp(
            `^${sign}(${digit}{1,3}|${digit}{1,3}(${group}${digit}{3})+)$`
          )
        : new RegExp(`^${sign}${digit}+$`);

      if (!integerRegex.test(integerPart)) {
        return false;
      }

      const fullRegex = new RegExp(
        `^${sign}${digit}+` +
          (usesGrouping ? `(${group}${digit}{3})*` : '') +
          `(${decimal}${digit}+)?${scientific}$`
      );

      return fullRegex.test(input);
    };

    return html`
      <cds-form-item>
        <cds-number-input
          id="custom-validation-number-input"
          type="text"
          input-mode="decimal"
          allow-empty
          min="0"
          invalid-text="Number is not valid. Must be between -100000000 and 100000000"
          max="100000000"
          step="1"
          locale="${locale}"
          label="NumberInput label"
          helper-text="Optional helper text. Uses ${locale} formatting."
          .validate="${validateNumberSeparators}">
        </cds-number-input>
      </cds-form-item>
      <button
        @click="${() => {
          const input = document.querySelector(
            '#custom-validation-number-input'
          ) as HTMLElement & { value: string };
          if (input) {
            input.value = '1000';
          }
        }}">
        set to 1000
      </button>
    `;
  },
};

// Hidden Test-Only Story for an issue where invalid with AI-Label had incorrect styling. #20117
export const InvalidWithAILabel = {
  tags: ['!dev', '!autodocs'], // hide story

  render: () => html`
    <div style="width: 400px">
      <cds-number-input
        value="50"
        min="0"
        max="100"
        step="1"
        label="Number input"
        invalid
        invalid-text="invalid">
        <cds-ai-label alignment="bottom-left">
          ${content}${actions}
        </cds-ai-label>
      </cds-number-input>
    </div>
  `,
};

// Hidden Test-Only Story for an issue where warn with AI-Label had incorrect styling. #20117
export const WarnWithAILabel = {
  tags: ['!dev', '!autodocs'], // hide story

  render: () => html`
    <div style="width: 400px">
      <cds-number-input
        value="50"
        min="0"
        max="100"
        step="1"
        label="Number input"
        warn
        warn-text="warning">
        <cds-ai-label alignment="bottom-left">
          ${content}${actions}
        </cds-ai-label>
      </cds-number-input>
    </div>
  `,
};

// Hidden Test-Only Story for an issue where disabled with AI-Label had incorrect styling. #20117
export const DisabledWithAILabel = {
  tags: ['!dev', '!autodocs'], // hide story

  render: () => html`
    <div style="width: 400px">
      <cds-number-input
        value="50"
        min="0"
        max="100"
        step="1"
        label="Number input"
        helper-text="Optional helper text."
        disabled>
        <cds-ai-label alignment="bottom-left">
          ${content}${actions}
        </cds-ai-label>
      </cds-number-input>
    </div>
  `,
};

// Hidden Test-Only Story for type="text" test scenarios
export const TypeTextTestScenarios = {
  tags: ['!dev', '!autodocs'], // hide story

  render: () => {
    return html`
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <h3>Type="text" Test Scenarios</h3>

        <!-- Basic type="text" -->
        <cds-form-item>
          <cds-number-input
            type="text"
            input-mode="decimal"
            value="50"
            min="0"
            max="10000000"
            step="1"
            label="Basic type=text"
            invalid-text="Value must be between 0 and 10000000"
            helper-text="Basic text input with value 50">
          </cds-number-input>
        </cds-form-item>

        <!-- Read-only -->
        <cds-form-item>
          <cds-number-input
            type="text"
            input-mode="decimal"
            value="50"
            min="0"
            max="10000000"
            step="1"
            readonly
            label="Read-only"
            helper-text="Read-only input, steppers disabled">
          </cds-number-input>
        </cds-form-item>

        <!-- Disabled -->
        <cds-form-item>
          <cds-number-input
            type="text"
            input-mode="decimal"
            value="50"
            min="0"
            max="100"
            step="1"
            disabled
            label="Disabled"
            helper-text="Disabled input">
          </cds-number-input>
        </cds-form-item>

        <!-- Invalid (value < min) -->
        <cds-form-item>
          <cds-number-input
            type="text"
            input-mode="decimal"
            value="5"
            min="10"
            max="10000000"
            step="1"
            invalid-text="Value must be at least 10"
            label="Invalid (value < min)"
            helper-text="Value 5 is below minimum 10">
          </cds-number-input>
        </cds-form-item>

        <!-- Allow empty -->
        <cds-form-item>
          <cds-number-input
            id="allow-empty-input"
            type="text"
            input-mode="decimal"
            allow-empty
            min="0"
            max="10000000"
            value="50"
            step="1"
            label="Allow empty"
            helper-text="Can be cleared completely">
          </cds-number-input>
          <button
            @click="${() => {
              const input = document.querySelector(
                '#allow-empty-input'
              ) as HTMLElement & { value: string };
              if (input) input.value = '';
            }}">
            Clear
          </button>
        </cds-form-item>

        <!-- Decimal precision -->
        <cds-form-item>
          <cds-number-input
            type="text"
            input-mode="decimal"
            value="15.01"
            min="0"
            max="10000000"
            step="1"
            label="Decimal precision"
            helper-text="Tests floating-point precision (15.01)">
          </cds-number-input>
        </cds-form-item>

        <!-- Large numbers with thousand separators -->
        <cds-form-item>
          <cds-number-input
            type="text"
            input-mode="decimal"
            value="1000"
            min="-10000000"
            max="10000000"
            step="1000"
            label="Large numbers"
            helper-text="Thousand separators (1,000)">
          </cds-number-input>
        </cds-form-item>

        <!-- German locale -->
        <cds-form-item>
          <cds-number-input
            type="text"
            allow-empty
            locale="de-DE"
            label="NumberInput label"
            value="123456"
            min="0"
            step="1"
            helper-text="German formatting (123.456)"
            max="10000000"></cds-number-input>
        </cds-form-item>

        <!-- Percentage formatting -->
        <cds-form-item>
          <cds-number-input
            type="text"
            input-mode="decimal"
            value="0.15"
            min="0"
            max="1"
            invalid-text="Value must be between 0 and 100%"
            step="0.05"
            label="Percentage format"
            helper-text="formatOptions: {style: 'percent'} (15%)"
            .formatOptions="${{ style: 'percent' as const }}">
          </cds-number-input>
        </cds-form-item>

        <!-- currency format -->
        <cds-form-item>
          <cds-number-input
            type="text"
            label="Currency format test"
            min="0"
            step="1"
            max="10000"
            value="1234.56"
            helper-text="formatOptions: {style: 'currency', currency: 'USD'} - Should display as $1,234.56"
            .formatOptions="${{
              style: 'currency' as const,
              currency: 'USD' as const,
            }}">
          </cds-number-input>
        </cds-form-item>

        <!-- At maximum value -->
        <cds-form-item>
          <cds-number-input
            type="text"
            input-mode="decimal"
            value="10"
            min="0"
            max="10"
            step="5"
            label="At maximum"
            invalid-text="Value must be between 0 and 10"
            helper-text="Increment button disabled at max">
          </cds-number-input>
        </cds-form-item>

        <!-- At minimum value -->
        <cds-form-item>
          <cds-number-input
            type="text"
            input-mode="decimal"
            value="0"
            min="0"
            max="10"
            step="5"
            label="At minimum"
            invalid-text="Value must be between 0 and 10"
            helper-text="Decrement button disabled at min">
          </cds-number-input>
        </cds-form-item>

        <!-- Helper text -->
        <cds-form-item>
          <cds-number-input
            type="text"
            input-mode="decimal"
            value="50"
            min="0"
            max="10000000"
            step="1"
            label="With helper text"
            invalid-text="Value must be between 0 and 10000000"
            helper-text="This is helper text for the input">
          </cds-number-input>
        </cds-form-item>

        <!-- With AI Label -->
        <cds-form-item>
          <cds-number-input
            type="text"
            input-mode="decimal"
            value="50"
            min="0"
            max="10000000"
            step="1"
            label="With AI Label"
            invalid-text="Value must be between 0 and 10000000"
            helper-text="Has AI decorator">
            <cds-ai-label alignment="bottom-left">
              ${content}${actions}
            </cds-ai-label>
          </cds-number-input>
        </cds-form-item>
      </div>
    `;
  },
};

export default {
  title: 'Components/Number Input',
};
