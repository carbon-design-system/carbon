/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './index';
import { ICON_INDICATOR_KIND } from './defs';
import { POPOVER_ALIGNMENT } from '../popover/defs';

const kinds = [
  'failed',
  'caution-major',
  'caution-minor',
  'undefined',
  'succeeded',
  'normal',
  'in-progress',
  'incomplete',
  'not-started',
  'pending',
  'unknown',
  'informative',
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
  iconDescription: 'Icon',
  autoalign: false,
  compact: false,
  kind: ICON_INDICATOR_KIND.FAILED,
  size: 16,
};

const controls = {
  align: {
    control: 'select',
    description:
      'Specify how the tooltip should align with the icon in compact mode',
    options: alignments,
  },
  autoalign: {
    control: 'boolean',
    description: 'Will auto-align the tooltip in compact mode',
  },
  compact: {
    control: 'boolean',
    description:
      'When true, displays only the icon with the label in a tooltip',
  },
  iconDescription: {
    control: 'text',
    description:
      'Additional Description for the icon, used for screen readers in compact mode.',
  },
  size: {
    control: 'select',
    description:
      'Specify the size of the Icon Indicator. Currently supports either 16 (default) or 20  sizes.',
    options: [16, 20],
  },
  label: {
    control: 'text',
    description: 'Label next to the icon.',
  },
  kind: {
    control: 'select',
    description: 'Specify the kind of the Icon Indicator.',
    options: kinds,
  },
};

export const Default = {
  argTypes: controls,
  args: defaultArgs,
  render: ({ align, iconDescription, autoalign, compact, label, size }) => html`
    <div style="display: inline-flex; flex-flow: column; row-gap: .5rem;">
      <cds-icon-indicator
        kind="failed"
        label=${label || 'Failed'}
        size=${size}
        align=${align}
        icon-description=${iconDescription}
        ?autoalign=${autoalign}
        ?compact=${compact}></cds-icon-indicator>
      <cds-icon-indicator
        kind="caution-major"
        label=${label || 'Caution major'}
        size=${size}
        align=${align}
        icon-description=${iconDescription}
        ?autoalign=${autoalign}
        ?compact=${compact}></cds-icon-indicator>
      <cds-icon-indicator
        kind="caution-minor"
        label=${label || 'Caution minor'}
        size=${size}
        align=${align}
        icon-description=${iconDescription}
        ?autoalign=${autoalign}
        ?compact=${compact}></cds-icon-indicator>
      <cds-icon-indicator
        kind="undefined"
        label=${label || 'Undefined'}
        size=${size}
        align=${align}
        icon-description=${iconDescription}
        ?autoalign=${autoalign}
        ?compact=${compact}></cds-icon-indicator>
      <cds-icon-indicator
        kind="succeeded"
        label=${label || 'Succeeded'}
        size=${size}
        align=${align}
        icon-description=${iconDescription}
        ?autoalign=${autoalign}
        ?compact=${compact}></cds-icon-indicator>
      <cds-icon-indicator
        kind="normal"
        label=${label || 'Normal'}
        size=${size}
        align=${align}
        icon-description=${iconDescription}
        ?autoalign=${autoalign}
        ?compact=${compact}></cds-icon-indicator>
      <cds-icon-indicator
        kind="in-progress"
        label=${label || 'In progress'}
        size=${size}
        align=${align}
        icon-description=${iconDescription}
        ?autoalign=${autoalign}
        ?compact=${compact}></cds-icon-indicator>
      <cds-icon-indicator
        kind="incomplete"
        label=${label || 'Incomplete'}
        size=${size}
        align=${align}
        icon-description=${iconDescription}
        ?autoalign=${autoalign}
        ?compact=${compact}></cds-icon-indicator>
      <cds-icon-indicator
        kind="not-started"
        label=${label || 'Not started'}
        size=${size}
        align=${align}
        icon-description=${iconDescription}
        ?autoalign=${autoalign}
        ?compact=${compact}></cds-icon-indicator>
      <cds-icon-indicator
        kind="pending"
        label=${label || 'Pending'}
        size=${size}
        align=${align}
        icon-description=${iconDescription}
        ?autoalign=${autoalign}
        ?compact=${compact}></cds-icon-indicator>
      <cds-icon-indicator
        kind="unknown"
        label=${label || 'Unknown'}
        size=${size}
        align=${align}
        icon-description=${iconDescription}
        ?autoalign=${autoalign}
        ?compact=${compact}></cds-icon-indicator>
      <cds-icon-indicator
        kind="informative"
        label=${label || 'Informative'}
        size=${size}
        align=${align}
        icon-description=${iconDescription}
        ?autoalign=${autoalign}
        ?compact=${compact}></cds-icon-indicator>
    </div>
  `,
};

const meta = {
  title: 'Preview/Status Indicators/Icon Indicator',
};

export default meta;
