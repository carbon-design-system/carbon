/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const actionsOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const actionsLabels = {
  0: 'None',
  1: 'One button',
  2: 'A danger button',
  3: 'A ghost button',
  4: 'Two buttons',
  5: 'Two buttons with one ghost',
  6: 'Three buttons',
  7: 'Three buttons with one ghost',
  8: 'Three buttons with one danger',
  9: 'Four buttons with one ghost',
  10: 'Four buttons with two danger',
};

export const actionsMapping = (labels, action) => {
  const act = (label, kind, key) => {
    const actionCall = action && action(`Click on '${label}'`);
    return {
      label,
      kind,
      key,
      onClick:
        actionCall &&
        ((evt) => {
          evt && evt.persist();
          actionCall(evt);
        }),
    };
  };
  const primary = act(labels?.primary ?? 'Primary', 'primary', 1);
  const danger = act(labels?.danger ?? 'Danger', 'danger', 2);
  const secondary = act(labels?.secondary ?? 'Secondary', 'secondary', 3);
  const secondary2 = act(labels?.secondary2 ?? 'Secondary', 'secondary', 4);
  const dangerGhost = act(
    labels?.dangerGhost ?? 'Danger-ghost',
    'danger--ghost',
    5
  );
  const ghost = act(labels?.ghost ?? 'Ghost', 'ghost', 6);

  return {
    0: [],
    1: [primary],
    2: [danger],
    3: [ghost],
    4: [primary, secondary],
    5: [primary, ghost],
    6: [primary, secondary, secondary2],
    7: [primary, secondary, ghost],
    8: [danger, secondary, ghost],
    9: [primary, secondary, secondary2, ghost],
    10: [danger, secondary, secondary2, dangerGhost],
  };
};
