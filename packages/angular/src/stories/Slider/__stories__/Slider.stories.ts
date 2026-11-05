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
  SliderComponent,
  SliderInputComponent,
  SliderSkeletonComponent,
} from '@carbon/angular/slider';
import { FormItemComponent } from '@carbon/angular/form';
import { LayerComponent } from '@carbon/angular/layer';

// ─── WC-parity stories (one-for-one with @carbon/web-components Slider) ──────

const sharedArgs = {
  ariaLabelInput: 'Slider value',
  disabled: false,
  hideLabel: false,
  hideTextInput: false,
  inputType: 'number',
  invalid: false,
  invalidText: 'Enter a value within the allowed range',
  labelText: 'Storage allocation',
  max: 100,
  maxLabel: ' GB',
  min: 0,
  minLabel: ' GB',
  name: 'storage-allocation',
  readOnly: false,
  step: 1,
  stepMultiplier: 10,
  value: 50,
  warn: false,
  warnText: 'Storage allocation is approaching the recommended limit',
};

const twoHandleArgs = {
  ...sharedArgs,
  ariaLabelInput: 'Minimum storage allocation',
  labelText: 'Storage allocation range',
  name: 'minimum-storage-allocation',
  unstable_ariaLabelInputUpper: 'Maximum storage allocation',
  unstable_nameUpper: 'maximum-storage-allocation',
  unstable_valueUpper: 90,
  value: 10,
};

const sharedArgTypes: ArgTypes = {
  ariaLabelInput: {
    control: 'text',
    description:
      'The <code>ariaLabel</code> for the <code>&lt;input&gt;</code>.',
  },
  disabled: {
    control: 'boolean',
    description: '<code>true</code> to disable this slider.',
  },
  formatLabel: {
    control: false,
    description:
      'The callback to format the label associated with the minimum/maximum value and the value tooltip when hideTextInput is true.',
  },
  hideLabel: {
    control: 'boolean',
    description: 'Hide the visible slider label.',
  },
  hideTextInput: {
    control: 'boolean',
    description: '<code>true</code> to hide the number input box.',
  },
  inputType: {
    control: 'text',
    description: 'The type attribute of the <code>&lt;input&gt;</code>.',
  },
  invalid: {
    control: 'boolean',
    description: 'Specify whether the Slider is currently invalid.',
  },
  invalidText: {
    control: 'text',
    description:
      'Provide the text that is displayed when the Slider is in an invalid state.',
  },
  labelText: {
    control: 'text',
    description: 'Provide the text for the slider label.',
  },
  max: {
    control: 'number',
    description: 'The maximum value.',
  },
  maxLabel: {
    control: 'text',
    description: 'The label associated with the maximum value.',
  },
  min: {
    control: 'number',
    description: 'The minimum value.',
  },
  minLabel: {
    control: 'text',
    description: 'The label associated with the minimum value.',
  },
  name: {
    control: 'text',
    description: 'The name attribute of the <code>&lt;input&gt;</code>.',
  },
  readOnly: {
    control: 'boolean',
    description: 'Whether the slider should be read-only.',
  },
  step: {
    control: 'number',
    description:
      'A value determining how much the value should increase/decrease by moving the thumb by mouse. If a value other than 1 is provided and the input is <em>not</em> hidden, the new step requirement should be added to a visible label. Values outside the <code>step</code> increment will be considered invalid.',
  },
  stepMultiplier: {
    control: 'number',
    description:
      'A value determining how much the value should increase/decrease by Shift+arrow keys, which will be <code>(max - min) / stepMultiplier</code>.',
  },
  unstable_ariaLabelInputUpper: {
    control: 'text',
    description:
      'The <code>ariaLabel</code> for the upper bound <code>&lt;input&gt;</code> and handle when there are two handles.',
  },
  unstable_nameUpper: {
    control: 'text',
    description:
      'The name attribute of the upper bound <code>&lt;input&gt;</code> when there are two handles.',
  },
  unstable_valueUpper: {
    control: 'number',
    description: 'The upper bound when there are two handles.',
  },
  value: {
    control: 'number',
    description:
      'The value of the slider. When there are two handles, value is the lower bound.',
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
};

const singleHandleParameters = {
  controls: {
    include: Object.keys(sharedArgs),
  },
};

const twoHandleParameters = {
  controls: {
    include: Object.keys(twoHandleArgs),
  },
};

const hiddenInputArgTypes: ArgTypes = {
  ...sharedArgTypes,
  hideTextInput: {
    ...sharedArgTypes.hideTextInput,
    table: {
      readonly: true,
    },
  },
};

const skeletonArgTypes: ArgTypes = {
  twoHandles: {
    control: 'boolean',
    description: 'Turn the skeleton into a range slider.',
  },
};

const skeletonParameters = {
  controls: {
    include: ['twoHandles'],
  },
};

const defaultFormatLabel = (value: number, label?: string) =>
  `${value}${label ?? ''}`;

const customFormatLabel = (value: number) => {
  if (value < 25) {
    return 'Low';
  } else if (value > 75) {
    return 'High';
  }
  return 'Medium';
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const meta: Meta<any> = {
  title: 'Components/Slider',
  decorators: [
    moduleMetadata({
      imports: [
        SliderComponent,
        SliderInputComponent,
        SliderSkeletonComponent,
        FormItemComponent,
        LayerComponent,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

// WC: Default
export const Default: Story = {
  args: { ...sharedArgs },
  argTypes: { ...sharedArgTypes },
  parameters: singleHandleParameters,
  render: (args) => ({
    props: {
      ...args,
      formatLabel: defaultFormatLabel,
    },
    template: `
      <cds-ng-form-item>
        <cds-ng-slider
          [disabled]="disabled"
          [hideLabel]="hideLabel"
          [hideTextInput]="hideTextInput"
          [invalid]="invalid"
          [invalidText]="invalidText"
          [labelText]="labelText"
          [max]="max"
          [maxLabel]="maxLabel"
          [min]="min"
          [minLabel]="minLabel"
          [readonly]="readOnly"
          [step]="step"
          [stepMultiplier]="stepMultiplier"
          [value]="value"
          [warn]="warn"
          [warnText]="warnText"
          [formatLabel]="formatLabel">
          <cds-ng-slider-input
            [attr.aria-label]="ariaLabelInput"
            [attr.name]="name"
            [type]="inputType">
          </cds-ng-slider-input>
        </cds-ng-slider>
      </cds-ng-form-item>
    `,
  }),
};

// WC: SliderWithHiddenInputs
export const SliderWithHiddenInputs: Story = {
  args: {
    ...sharedArgs,
    hideTextInput: true,
  },
  argTypes: hiddenInputArgTypes,
  parameters: singleHandleParameters,
  render: (args) => ({
    props: {
      ...args,
      formatLabel: defaultFormatLabel,
    },
    template: `
      <cds-ng-form-item>
        <cds-ng-slider
          [disabled]="disabled"
          [hideLabel]="hideLabel"
          [hideTextInput]="hideTextInput"
          [invalid]="invalid"
          [invalidText]="invalidText"
          [labelText]="labelText"
          [max]="max"
          [maxLabel]="maxLabel"
          [min]="min"
          [minLabel]="minLabel"
          [readonly]="readOnly"
          [step]="step"
          [stepMultiplier]="stepMultiplier"
          [value]="value"
          [warn]="warn"
          [warnText]="warnText"
          [formatLabel]="formatLabel">
          <cds-ng-slider-input
            [attr.aria-label]="ariaLabelInput"
            [attr.name]="name"
            [type]="inputType">
          </cds-ng-slider-input>
        </cds-ng-slider>
      </cds-ng-form-item>
    `,
  }),
};

// WC: SliderWithCustomValueLabel
export const SliderWithCustomValueLabel: Story = {
  args: {
    ...sharedArgs,
    hideTextInput: true,
    labelText: 'Storage usage',
    stepMultiplier: 50,
  },
  argTypes: {
    ...hiddenInputArgTypes,
  },
  parameters: singleHandleParameters,
  render: (args) => ({
    props: {
      ...args,
      formatLabel: customFormatLabel,
    },
    template: `
      <cds-ng-form-item>
        <cds-ng-slider
          [disabled]="disabled"
          [hideLabel]="hideLabel"
          [hideTextInput]="hideTextInput"
          [invalid]="invalid"
          [invalidText]="invalidText"
          [labelText]="labelText"
          [max]="max"
          [maxLabel]="maxLabel"
          [min]="min"
          [minLabel]="minLabel"
          [readonly]="readOnly"
          [step]="step"
          [stepMultiplier]="stepMultiplier"
          [value]="value"
          [warn]="warn"
          [warnText]="warnText"
          [formatLabel]="formatLabel">
          <cds-ng-slider-input
            [attr.aria-label]="ariaLabelInput"
            [attr.name]="name"
            [type]="inputType">
          </cds-ng-slider-input>
        </cds-ng-slider>
      </cds-ng-form-item>
    `,
  }),
};

// WC: ControlledSlider
export const ControlledSlider: Story = {
  args: {
    ...sharedArgs,
    value: 87,
  },
  argTypes: { ...sharedArgTypes },
  parameters: singleHandleParameters,
  render: (args) => ({
    props: {
      ...args,
      formatLabel: defaultFormatLabel,
      randomize: (slider: HTMLElement & { value?: number }) => {
        const min = Number(args.min) || 0;
        const max = Number(args.max) || 100;
        const step = Number(args.step) || 1;
        const range = max - min;
        const nextValue =
          range <= 0 || step <= 0
            ? min
            : Math.min(
                max,
                min + Math.round((Math.random() * range) / step) * step
              );
        slider.value = nextValue;
        const container = slider.closest('.controlled-slider');
        const output = container?.querySelector('.slider-current-value');
        if (output) {
          output.textContent = `Current value: ${nextValue}`;
        }
      },
      onSliderChange: (event: CustomEvent<{ value?: number }>) => {
        const val =
          event.detail?.value ?? (event.target as HTMLInputElement)?.value;
        const target = event.target as HTMLElement;
        const container = target?.closest('.controlled-slider');
        const output = container?.querySelector('.slider-current-value');
        if (output && val !== undefined) {
          output.textContent = `Current value: ${val}`;
        }
      },
    },
    template: `
      <div class="controlled-slider">
        <button type="button" (click)="randomize(slider)">Randomize value</button>
        <cds-ng-form-item>
          <cds-ng-slider
            #slider
            [disabled]="disabled"
            [hideLabel]="hideLabel"
            [hideTextInput]="hideTextInput"
            [invalid]="invalid"
            [invalidText]="invalidText"
            [labelText]="labelText"
            [max]="max"
            [maxLabel]="maxLabel"
            [min]="min"
            [minLabel]="minLabel"
            [readonly]="readOnly"
            [step]="step"
            [stepMultiplier]="stepMultiplier"
            [value]="value"
            [warn]="warn"
            [warnText]="warnText"
            [formatLabel]="formatLabel"
            (sliderChanged)="onSliderChange($event)">
            <cds-ng-slider-input
              [attr.aria-label]="ariaLabelInput"
              [attr.name]="name"
              [type]="inputType">
            </cds-ng-slider-input>
          </cds-ng-slider>
        </cds-ng-form-item>
        <p class="slider-current-value">Current value: {{ value }}</p>
      </div>
    `,
  }),
};

// WC: WithLayer
export const WithLayer: Story = {
  parameters: {
    ...singleHandleParameters,
    layout: 'fullscreen',
  },
  args: { ...sharedArgs },
  argTypes: { ...sharedArgTypes },
  render: (args) => ({
    props: {
      ...args,
      formatLabel: defaultFormatLabel,
    },
    template: `
      <div class="cds--with-layer__background">
        <div class="cds--with-layer__label">$background</div>
        <div class="cds--with-layer__content">
          <cds-ng-form-item>
            <cds-ng-slider
              [disabled]="disabled"
              [hideLabel]="hideLabel"
              [hideTextInput]="hideTextInput"
              [invalid]="invalid"
              [invalidText]="invalidText"
              [labelText]="labelText"
              [max]="max"
              [maxLabel]="maxLabel"
              [min]="min"
              [minLabel]="minLabel"
              [readonly]="readOnly"
              [step]="step"
              [stepMultiplier]="stepMultiplier"
              [value]="value"
              [warn]="warn"
              [warnText]="warnText"
              [formatLabel]="formatLabel">
              <cds-ng-slider-input
                [attr.aria-label]="ariaLabelInput"
                [attr.name]="name"
                [type]="inputType">
              </cds-ng-slider-input>
            </cds-ng-slider>
          </cds-ng-form-item>
          <cds-ng-layer [withBackground]="true">
            <div class="cds--with-layer__layer">
              <div class="cds--with-layer__label">$layer-01</div>
              <div class="cds--with-layer__content">
                <cds-ng-form-item>
                  <cds-ng-slider
                    [disabled]="disabled"
                    [hideLabel]="hideLabel"
                    [hideTextInput]="hideTextInput"
                    [invalid]="invalid"
                    [invalidText]="invalidText"
                    [labelText]="labelText"
                    [max]="max"
                    [maxLabel]="maxLabel"
                    [min]="min"
                    [minLabel]="minLabel"
                    [readonly]="readOnly"
                    [step]="step"
                    [stepMultiplier]="stepMultiplier"
                    [value]="value"
                    [warn]="warn"
                    [warnText]="warnText"
                    [formatLabel]="formatLabel">
                    <cds-ng-slider-input
                      [attr.aria-label]="ariaLabelInput"
                      [attr.name]="name"
                      [type]="inputType">
                    </cds-ng-slider-input>
                  </cds-ng-slider>
                </cds-ng-form-item>
                <cds-ng-layer [withBackground]="true">
                  <div class="cds--with-layer__layer">
                    <div class="cds--with-layer__label">$layer-02</div>
                    <div class="cds--with-layer__content">
                      <cds-ng-form-item>
                        <cds-ng-slider
                          [disabled]="disabled"
                          [hideLabel]="hideLabel"
                          [hideTextInput]="hideTextInput"
                          [invalid]="invalid"
                          [invalidText]="invalidText"
                          [labelText]="labelText"
                          [max]="max"
                          [maxLabel]="maxLabel"
                          [min]="min"
                          [minLabel]="minLabel"
                          [readonly]="readOnly"
                          [step]="step"
                          [stepMultiplier]="stepMultiplier"
                          [value]="value"
                          [warn]="warn"
                          [warnText]="warnText"
                          [formatLabel]="formatLabel">
                          <cds-ng-slider-input
                            [attr.aria-label]="ariaLabelInput"
                            [attr.name]="name"
                            [type]="inputType">
                          </cds-ng-slider-input>
                        </cds-ng-slider>
                      </cds-ng-form-item>
                    </div>
                  </div>
                </cds-ng-layer>
              </div>
            </div>
          </cds-ng-layer>
        </div>
      </div>
    `,
  }),
};

// WC: ControlledSliderWithLayer
export const ControlledSliderWithLayer: Story = {
  parameters: {
    ...singleHandleParameters,
    layout: 'fullscreen',
  },
  args: {
    ...sharedArgs,
    value: 87,
  },
  argTypes: { ...sharedArgTypes },
  render: (args) => ({
    props: {
      ...args,
      formatLabel: defaultFormatLabel,
      randomize: (slider: HTMLElement & { value?: number }) => {
        const min = Number(args.min) || 0;
        const max = Number(args.max) || 100;
        const step = Number(args.step) || 1;
        const range = max - min;
        const nextValue =
          range <= 0 || step <= 0
            ? min
            : Math.min(
                max,
                min + Math.round((Math.random() * range) / step) * step
              );
        slider.value = nextValue;
        const container = slider.closest('.controlled-slider');
        const output = container?.querySelector('.slider-current-value');
        if (output) {
          output.textContent = `Current value: ${nextValue}`;
        }
      },
      onSliderChange: (event: CustomEvent<{ value?: number }>) => {
        const val =
          event.detail?.value ?? (event.target as HTMLInputElement)?.value;
        const target = event.target as HTMLElement;
        const container = target?.closest('.controlled-slider');
        const output = container?.querySelector('.slider-current-value');
        if (output && val !== undefined) {
          output.textContent = `Current value: ${val}`;
        }
      },
    },
    template: `
      <div class="cds--with-layer__background">
        <div class="cds--with-layer__label">$background</div>
        <div class="cds--with-layer__content">
          <div class="controlled-slider">
            <button type="button" (click)="randomize(slider1)">Randomize value</button>
            <cds-ng-form-item>
              <cds-ng-slider
                #slider1
                [disabled]="disabled"
                [hideLabel]="hideLabel"
                [hideTextInput]="hideTextInput"
                [invalid]="invalid"
                [invalidText]="invalidText"
                [labelText]="labelText"
                [max]="max"
                [maxLabel]="maxLabel"
                [min]="min"
                [minLabel]="minLabel"
                [readonly]="readOnly"
                [step]="step"
                [stepMultiplier]="stepMultiplier"
                [value]="value"
                [warn]="warn"
                [warnText]="warnText"
                [formatLabel]="formatLabel"
                (sliderChanged)="onSliderChange($event)">
                <cds-ng-slider-input
                  [attr.aria-label]="ariaLabelInput"
                  [attr.name]="name"
                  [type]="inputType">
                </cds-ng-slider-input>
              </cds-ng-slider>
            </cds-ng-form-item>
            <p class="slider-current-value">Current value: {{ value }}</p>
          </div>
          <cds-ng-layer [withBackground]="true">
            <div class="cds--with-layer__layer">
              <div class="cds--with-layer__label">$layer-01</div>
              <div class="cds--with-layer__content">
                <div class="controlled-slider">
                  <button type="button" (click)="randomize(slider2)">Randomize value</button>
                  <cds-ng-form-item>
                    <cds-ng-slider
                      #slider2
                      [disabled]="disabled"
                      [hideLabel]="hideLabel"
                      [hideTextInput]="hideTextInput"
                      [invalid]="invalid"
                      [invalidText]="invalidText"
                      [labelText]="labelText"
                      [max]="max"
                      [maxLabel]="maxLabel"
                      [min]="min"
                      [minLabel]="minLabel"
                      [readonly]="readOnly"
                      [step]="step"
                      [stepMultiplier]="stepMultiplier"
                      [value]="value"
                      [warn]="warn"
                      [warnText]="warnText"
                      [formatLabel]="formatLabel"
                      (sliderChanged)="onSliderChange($event)">
                      <cds-ng-slider-input
                        [attr.aria-label]="ariaLabelInput"
                        [attr.name]="name"
                        [type]="inputType">
                      </cds-ng-slider-input>
                    </cds-ng-slider>
                  </cds-ng-form-item>
                  <p class="slider-current-value">Current value: {{ value }}</p>
                </div>
                <cds-ng-layer [withBackground]="true">
                  <div class="cds--with-layer__layer">
                    <div class="cds--with-layer__label">$layer-02</div>
                    <div class="cds--with-layer__content">
                      <div class="controlled-slider">
                        <button type="button" (click)="randomize(slider3)">Randomize value</button>
                        <cds-ng-form-item>
                          <cds-ng-slider
                            #slider3
                            [disabled]="disabled"
                            [hideLabel]="hideLabel"
                            [hideTextInput]="hideTextInput"
                            [invalid]="invalid"
                            [invalidText]="invalidText"
                            [labelText]="labelText"
                            [max]="max"
                            [maxLabel]="maxLabel"
                            [min]="min"
                            [minLabel]="minLabel"
                            [readonly]="readOnly"
                            [step]="step"
                            [stepMultiplier]="stepMultiplier"
                            [value]="value"
                            [warn]="warn"
                            [warnText]="warnText"
                            [formatLabel]="formatLabel"
                            (sliderChanged)="onSliderChange($event)">
                            <cds-ng-slider-input
                              [attr.aria-label]="ariaLabelInput"
                              [attr.name]="name"
                              [type]="inputType">
                            </cds-ng-slider-input>
                          </cds-ng-slider>
                        </cds-ng-form-item>
                        <p class="slider-current-value">Current value: {{ value }}</p>
                      </div>
                    </div>
                  </div>
                </cds-ng-layer>
              </div>
            </div>
          </cds-ng-layer>
        </div>
      </div>
    `,
  }),
};

// WC: TwoHandleSlider
export const TwoHandleSlider: Story = {
  args: { ...twoHandleArgs },
  argTypes: { ...sharedArgTypes },
  parameters: twoHandleParameters,
  render: (args) => ({
    props: {
      ...args,
      formatLabel: defaultFormatLabel,
    },
    template: `
      <cds-ng-form-item>
        <cds-ng-slider
          [disabled]="disabled"
          [hideLabel]="hideLabel"
          [hideTextInput]="hideTextInput"
          [invalid]="invalid"
          [invalidText]="invalidText"
          [labelText]="labelText"
          [max]="max"
          [maxLabel]="maxLabel"
          [min]="min"
          [minLabel]="minLabel"
          [readonly]="readOnly"
          [step]="step"
          [stepMultiplier]="stepMultiplier"
          [value]="value"
          [unstable_valueUpper]="unstable_valueUpper"
          [warn]="warn"
          [warnText]="warnText"
          [formatLabel]="formatLabel">
          <cds-ng-slider-input
            [attr.aria-label]="ariaLabelInput"
            [attr.name]="name"
            [type]="inputType"
            slot="lower-input">
          </cds-ng-slider-input>
          <cds-ng-slider-input
            [attr.aria-label]="unstable_ariaLabelInputUpper"
            [attr.name]="unstable_nameUpper"
            [type]="inputType">
          </cds-ng-slider-input>
        </cds-ng-slider>
      </cds-ng-form-item>
    `,
  }),
};

// WC: TwoHandleSliderWithHiddenInputs
export const TwoHandleSliderWithHiddenInputs: Story = {
  args: {
    ...twoHandleArgs,
    hideTextInput: true,
  },
  argTypes: {
    ...hiddenInputArgTypes,
  },
  parameters: twoHandleParameters,
  render: (args) => ({
    props: {
      ...args,
      formatLabel: defaultFormatLabel,
    },
    template: `
      <cds-ng-form-item>
        <cds-ng-slider
          [disabled]="disabled"
          [hideLabel]="hideLabel"
          [hideTextInput]="hideTextInput"
          [invalid]="invalid"
          [invalidText]="invalidText"
          [labelText]="labelText"
          [max]="max"
          [maxLabel]="maxLabel"
          [min]="min"
          [minLabel]="minLabel"
          [readonly]="readOnly"
          [step]="step"
          [stepMultiplier]="stepMultiplier"
          [value]="value"
          [unstable_valueUpper]="unstable_valueUpper"
          [warn]="warn"
          [warnText]="warnText"
          [formatLabel]="formatLabel">
          <cds-ng-slider-input
            [attr.aria-label]="ariaLabelInput"
            [attr.name]="name"
            [type]="inputType"
            slot="lower-input">
          </cds-ng-slider-input>
          <cds-ng-slider-input
            [attr.aria-label]="unstable_ariaLabelInputUpper"
            [attr.name]="unstable_nameUpper"
            [type]="inputType">
          </cds-ng-slider-input>
        </cds-ng-slider>
      </cds-ng-form-item>
    `,
  }),
};

// WC: Skeleton
export const Skeleton: Story = {
  args: {
    twoHandles: false,
  },
  argTypes: skeletonArgTypes,
  parameters: skeletonParameters,
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-form-item>
        <cds-ng-slider-skeleton [twoHandles]="twoHandles"></cds-ng-slider-skeleton>
      </cds-ng-form-item>
    `,
  }),
};

// WC: TwoHandleSkeleton
export const TwoHandleSkeleton: Story = {
  args: {
    twoHandles: true,
  },
  argTypes: {
    twoHandles: {
      ...skeletonArgTypes.twoHandles,
      table: {
        readonly: true,
      },
    },
  },
  parameters: skeletonParameters,
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-form-item>
        <cds-ng-slider-skeleton [twoHandles]="twoHandles"></cds-ng-slider-skeleton>
      </cds-ng-form-item>
    `,
  }),
};
