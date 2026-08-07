/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';

// Slider positions; the arg holds the index into this list.
export const radiusSteps = [
  '0px',
  '2px',
  '4px',
  '8px',
  '16px',
  '24px',
  '999999px',
];

const argType = (description: string) => ({
  description: `${description} Steps: ${radiusSteps.join(', ')}.`,
  control: { type: 'range', min: 0, max: radiusSteps.length - 1, step: 1 },
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

export const radiusArgs = { '--cds-border-radius': radiusSteps.length - 1 };

const radiusStyle = (args) =>
  radiusNames
    .filter((name) => args?.[name] != null)
    .map((name) => `${name}: ${radiusSteps[args[name]]};`)
    .join(' ');

// Sets the custom properties on a wrapper. They inherit through the shadow
// boundary into the button.
export const withRadiusVars = (story, { args }) =>
  html`<div style="${radiusStyle(args)}">${story()}</div>`;

// Shows the custom properties that are set in the docs code snippet.
export const radiusSource = {
  transform: (code: string, { args }) => {
    const style = radiusStyle(args);

    if (!style) {
      return code;
    }

    const story = code
      .trimEnd()
      .split('\n')
      .map((line) => `  ${line}`)
      .join('\n');

    return `<!-- set this in your scss with the border-tokens -->\n<div style="${style}">\n${story}\n</div>`;
  },
};
