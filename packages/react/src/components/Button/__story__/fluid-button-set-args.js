/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const btn = (label, kind, key) => {
  return {
    label,
    kind,
    key,
  };
};

const primary = btn('Primary', 'primary', 1);
const danger = btn('Danger', 'danger', 2);
const secondary = btn('Secondary', 'secondary', 3);
const secondary2 = btn('Secondary 2', 'secondary 2', 4);
const tertiary = btn('Tertiary', 'tertiary', 5);
const dangerGhost = btn('Danger-ghost', 'danger--ghost', 6);
const ghost = btn('Ghost', 'ghost', 7);

const fluidButtonSets = [
  { label: 'None', mapping: [] },
  { label: 'One button', mapping: [primary] },
  { label: 'A danger button', mapping: [danger] },
  { label: 'A ghost button', mapping: [ghost] },
  { label: 'Two buttons', mapping: [secondary, primary] },
  { label: 'Two buttons with one ghost', mapping: [ghost, primary] },
  { label: 'Three buttons', mapping: [secondary, secondary2, primary] },
  {
    label: 'Three buttons with one ghost',
    mapping: [ghost, secondary, primary],
  },
  {
    label: 'Three buttons with one danger',
    mapping: [ghost, secondary, danger],
  },
  {
    label: 'Four buttons',
    mapping: [tertiary, secondary, secondary2, primary],
  },
  {
    label: 'Four buttons with one ghost',
    mapping: [ghost, secondary, secondary2, primary],
  },
  {
    label: 'Four buttons with danger ghost',
    mapping: [dangerGhost, secondary, secondary2, danger],
  },
];

export const fluidButtonOptions = fluidButtonSets.map((_, i) => i);

export const fluidButtonLabels = fluidButtonSets.reduce((acc, val, i) => {
  acc[i] = val.label;
  return acc;
}, {});

export const fluidButtonMapping = fluidButtonSets.reduce((acc, val, i) => {
  acc[i] = val.mapping;
  return acc;
}, {});
