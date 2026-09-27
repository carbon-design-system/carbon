/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

// single
figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3673-40574&m=dev',
  {
    props: {
      slider: figma.nestedProps('_Slider base', {
        labelText: figma.textContent('Label'),
      }),
      invalidText: figma.string('Error text'),
      warnText: figma.string('Warning text'),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      invalid: figma.enum('State', {
        Error: true,
      }),
      readOnly: figma.enum('State', {
        'Read-only': true,
      }),
      warn: figma.enum('State', {
        Warning: true,
      }),
      textInput: figma.nestedProps('Text input - Default', {
        value: figma.string('Input text'),
      }),
    },
    example: (props) =>
      html`<cds-slider
        label-text=${props.slider.labelText}
        value=${props.textInput.value}
        disabled=${props.disabled}
        invalid=${props.invalid}
        invalid-text=${props.invalidText}
        readonly=${props.readOnly}
        warn=${props.warn}
        warn-text=${props.warnText}>
        <cds-slider-input
          aria-label="Slider value"
          type="number"></cds-slider-input>
      </cds-slider>`,
    imports: ["import '@carbon/web-components/es/components/slider/index.js'"],
  }
);

// two handle
figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=41061-1531&m=dev',
  {
    props: {
      max: figma.string('Max range text'),
      min: figma.string('Min range text'),
      invalidText: figma.string('Error text'),
      warnText: figma.string('Warning text'),
      labelText: figma.string('Label text'),
      hideTextInput: figma.boolean('Inputs', {
        false: true,
        true: false,
      }),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      invalid: figma.enum('State', {
        'Hover + Error': true,
        'Active + Error': true,
        'Focused + Error': true,
      }),
      readOnly: figma.enum('State', {
        'Read-only': true,
      }),
      warn: figma.enum('State', {
        'Hover + Warning': true,
        'Active + Warning': true,
        'Focused + Warning': true,
      }),
    },
    example: (props) =>
      html`<cds-slider
        label-text=${props.labelText}
        max=${props.max}
        min=${props.min}
        hide-text-input=${props.hideTextInput}
        disabled=${props.disabled}
        invalid=${props.invalid}
        invalid-text=${props.invalidText}
        readonly=${props.readOnly}
        warn=${props.warn}
        warn-text=${props.warnText}>
        <cds-slider-input
          aria-label="Lower bound"
          slot="lower-input"></cds-slider-input>
        <cds-slider-input aria-label="Upper bound"></cds-slider-input>
      </cds-slider>`,
    imports: ["import '@carbon/web-components/es/components/slider/index.js'"],
  }
);

// single skeleton
figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3673-40574&m=dev',
  {
    variant: { State: 'Skeleton' },
    example: () => html`<cds-slider-skeleton></cds-slider-skeleton>`,
    imports: ["import '@carbon/web-components/es/components/slider/index.js'"],
  }
);

// two handle skeleton
figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=41061-1531&m=dev',
  {
    variant: { State: 'Skeleton' },
    example: () => html`<cds-slider-skeleton twohandles></cds-slider-skeleton>`,
    imports: ["import '@carbon/web-components/es/components/slider/index.js'"],
  }
);
