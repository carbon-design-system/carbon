/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import styles from './story-radius-controls.scss?lit';

// Slider positions, named after the `$border-radius-*` variables that declare
// them. Keep in sync with `$radius-steps` in `story-radius-controls.scss`; the
// arg holds the index into this list.
const stepNames = ['0', '02', '04', '08', '16', '24', 'max'];

const stepLabels = stepNames
  .map((step) => (step === '0' ? '0' : `$border-radius-${step}`))
  .join(', ');

const argType = (description: string) => ({
  description: `${description} Steps: ${stepLabels}.`,
  control: { type: 'range', min: 0, max: stepNames.length - 1, step: 1 },
  table: { category: 'border-radius' },
});

// Args are keyed by the custom property they set, so they double as the names
// to list in `controls.include`.
export const radiusArgTypes = {
  '--cds-border-radius': argType(
    'Base radius for all four corners. The per-corner properties take priority.'
  ),
  '--cds-border-radius-ss': argType('Start-start corner.'),
  '--cds-border-radius-se': argType('Start-end corner.'),
  '--cds-border-radius-es': argType('End-start corner.'),
  '--cds-border-radius-ee': argType('End-end corner.'),
};

export const radiusNames = Object.keys(radiusArgTypes);

export const radiusArgs = { '--cds-border-radius': stepNames.length - 1 };

// `--cds-border-radius-ss` is declared by `.button-story-radius-ss--04`, and so
// on for each property and step.
const radiusClasses = (args) =>
  radiusNames
    .filter((name) => args?.[name] != null)
    .map(
      (name) =>
        `button-story-${name.replace('--cds-border-', '')}--${
          stepNames[args[name]]
        }`
    )
    .join(' ');

// The classes declare the custom properties, which inherit through the shadow
// boundary into the button.
export const withRadiusVars = (story, { args }) => html`
  <div class="${radiusClasses(args)}">${story()}</div>
  <style>
    ${styles}
  </style>
`;
