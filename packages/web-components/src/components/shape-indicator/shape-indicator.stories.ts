/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { html } from 'lit';
import './index';
import { POPOVER_ALIGNMENT } from '../popover/defs';

const kinds = [
  'failed',
  'critical',
  'high',
  'medium',
  'low',
  'cautious',
  'undefined',
  'stable',
  'informative',
  'incomplete',
  'draft',
];

const alignments = {
  top: POPOVER_ALIGNMENT.TOP,
  'top-start': POPOVER_ALIGNMENT.TOP_START,
  'top-end': POPOVER_ALIGNMENT.TOP_END,
  bottom: POPOVER_ALIGNMENT.BOTTOM,
  'bottom-start': POPOVER_ALIGNMENT.BOTTOM_START,
  'bottom-end': POPOVER_ALIGNMENT.BOTTOM_END,
  left: POPOVER_ALIGNMENT.LEFT,
  'left-start': POPOVER_ALIGNMENT.LEFT_START,
  'left-end': POPOVER_ALIGNMENT.LEFT_END,
  right: POPOVER_ALIGNMENT.RIGHT,
  'right-start': POPOVER_ALIGNMENT.RIGHT_START,
  'right-end': POPOVER_ALIGNMENT.RIGHT_END,
};

const defaultArgs = {
  align: POPOVER_ALIGNMENT.RIGHT,
  shapeDescription: 'Shape',
  autoAlign: false,
  compact: false,
  textSize: 12,
};

const controls = {
  align: {
    control: 'select',
    description:
      'Specify how the tooltip should align with the shape in compact mode',
    options: alignments,
  },
  autoAlign: {
    control: 'boolean',
    description: 'Will auto-align the tooltip in compact mode',
  },
  compact: {
    control: 'boolean',
    description:
      'When true, displays only the shape with the label in a tooltip',
  },
  shapeDescription: {
    control: 'text',
    description:
      'Additional Description for the shape, used for screen readers in compact mode',
  },
  textSize: {
    control: 'select',
    description:
      'Specify the "text-size" of the Shape Indicator. Currently supports either 12 (default) or 14 sizes.',
    options: [12, 14],
  },
  label: {
    control: 'text',
    description: 'Label next to the shape.',
  },
  kind: {
    control: 'select',
    description: 'Specify the kind of the Shape Indicator.',
    options: kinds,
  },
};

export const Default = {
  argTypes: controls,
  args: defaultArgs,
  render: ({
    align,
    shapeDescription,
    autoAlign,
    compact,
    label,
    textSize,
  }) => html`
    <div style="display: inline-flex; flex-flow: column; row-gap: .5rem;">
      <cds-shape-indicator
        kind="failed"
        label=${label || 'Failed'}
        text-size=${textSize}
        align=${align}
        shape-description=${shapeDescription}
        ?autoalign=${autoAlign}
        ?compact=${compact}></cds-shape-indicator>
      <cds-shape-indicator
        kind="critical"
        label=${label || 'Critical'}
        text-size=${textSize}
        align=${align}
        shape-description=${shapeDescription}
        ?autoalign=${autoAlign}
        ?compact=${compact}></cds-shape-indicator>
      <cds-shape-indicator
        kind="high"
        label=${label || 'High'}
        text-size=${textSize}
        align=${align}
        shape-description=${shapeDescription}
        ?autoalign=${autoAlign}
        ?compact=${compact}></cds-shape-indicator>
      <cds-shape-indicator
        kind="medium"
        label=${label || 'Medium'}
        text-size=${textSize}
        align=${align}
        shape-description=${shapeDescription}
        ?autoalign=${autoAlign}
        ?compact=${compact}></cds-shape-indicator>
      <cds-shape-indicator
        kind="low"
        label=${label || 'Low'}
        text-size=${textSize}
        align=${align}
        shape-description=${shapeDescription}
        ?autoalign=${autoAlign}
        ?compact=${compact}></cds-shape-indicator>
      <cds-shape-indicator
        kind="cautious"
        label=${label || 'Cautious'}
        text-size=${textSize}
        align=${align}
        shape-description=${shapeDescription}
        ?autoalign=${autoAlign}
        ?compact=${compact}></cds-shape-indicator>
      <cds-shape-indicator
        kind="undefined"
        label=${label || 'Undefined'}
        text-size=${textSize}
        align=${align}
        shape-description=${shapeDescription}
        ?autoalign=${autoAlign}
        ?compact=${compact}></cds-shape-indicator>
      <cds-shape-indicator
        kind="stable"
        label=${label || 'Stable'}
        text-size=${textSize}
        align=${align}
        shape-description=${shapeDescription}
        ?autoalign=${autoAlign}
        ?compact=${compact}></cds-shape-indicator>
      <cds-shape-indicator
        kind="informative"
        label=${label || 'Informative'}
        text-size=${textSize}
        align=${align}
        shape-description=${shapeDescription}
        ?autoalign=${autoAlign}
        ?compact=${compact}></cds-shape-indicator>
      <cds-shape-indicator
        kind="incomplete"
        label=${label || 'Incomplete'}
        text-size=${textSize}
        align=${align}
        shape-description=${shapeDescription}
        ?autoalign=${autoAlign}
        ?compact=${compact}></cds-shape-indicator>
      <cds-shape-indicator
        kind="draft"
        label=${label || 'Draft'}
        text-size=${textSize}
        align=${align}
        shape-description=${shapeDescription}
        ?autoalign=${autoAlign}
        ?compact=${compact}></cds-shape-indicator>
    </div>
  `,
};

const meta = {
  title: 'Preview/Status Indicators/Shape Indicator',
};

export default meta;
