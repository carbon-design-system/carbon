/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { toString } from '@carbon/icon-helpers';

type IconDescriptor = Parameters<typeof toString>[0];

/**
 * Renders an imported Carbon icon, e.g.
 * `import Add16 from '@carbon/icons/es/add/16.js'`, as an SVG string for
 * Angular story templates. Angular counterpart of `iconLoader` in
 * `@carbon/web-components`. Extra `attrs` such as `{ slot: 'icon' }` are added
 * to the `<svg>` element.
 */
export const iconToSvg = (
  icon: IconDescriptor,
  attrs: Record<string, string> = {}
): string => toString({ ...icon, attrs: { ...icon.attrs, ...attrs } });
