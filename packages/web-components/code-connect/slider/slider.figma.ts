// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=3673-40574&m=dev
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/slider/slider.ts
// component=cds-slider

/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';
import {
  renderBooleanAttribute,
  renderStringAttribute,
} from '../template-helpers';

const instance = figma.selectedInstance;

function createTemplate() {
  const isSkeleton = instance.getEnum('State', {
    Skeleton: true,
  });

  if (isSkeleton) {
    return {
      id: 'cds-slider-skeleton',
      imports: [
        "import '@carbon/web-components/es/components/slider/slider-skeleton.js'",
        "import '@carbon/web-components/es/components/slider/slider.js'",
      ],
      example: figma.code`<cds-slider-skeleton><cds-slider></cds-slider></cds-slider-skeleton>`,
      metadata: { nestable: true },
    };
  }

  const sliderBase = instance.findInstance('_Slider base');
  const labelLayer =
    sliderBase.type !== 'ERROR' ? sliderBase.findText('Label') : null;
  const labelText =
    labelLayer && labelLayer.type !== 'ERROR'
      ? labelLayer.textContent
      : undefined;

  const textInput = instance.findInstance('Text input - Default');
  const value =
    textInput.type !== 'ERROR' ? textInput.getString('Input text') : undefined;

  const disabled = instance.getEnum('State', {
    Disabled: true,
  });
  const readonly = instance.getEnum('State', {
    'Read-only': true,
  });
  const invalid = instance.getEnum('State', {
    Error: true,
  });
  const invalidText = invalid ? instance.getString('Error text') : undefined;
  const warn = instance.getEnum('State', {
    Warning: true,
  });
  const warnText = warn ? instance.getString('Warning text') : undefined;

  return {
    id: 'cds-slider',
    imports: ["import '@carbon/web-components/es/components/slider/index.js'"],
    example: figma.code`<cds-slider${renderStringAttribute(
      'label-text',
      labelText
    )}${renderStringAttribute('value', value)}${renderBooleanAttribute(
      'disabled',
      disabled
    )}${renderBooleanAttribute('readonly', readonly)}${renderBooleanAttribute(
      'invalid',
      invalid
    )}${renderStringAttribute(
      'invalid-text',
      invalidText
    )}${renderBooleanAttribute('warn', warn)}${renderStringAttribute(
      'warn-text',
      warnText
    )}>
  <cds-slider-input aria-label="Slider value" type="number"></cds-slider-input>
</cds-slider>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
