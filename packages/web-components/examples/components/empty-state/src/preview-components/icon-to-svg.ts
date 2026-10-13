/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getAttributes, formatAttributes } from '@carbon/icon-helpers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function elementToSVG(el: any): string {
  if (typeof el === 'string') return el;
  const { elem = 'svg', attrs = {}, content = [] } = el;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const children = (content as any[]).map(elementToSVG).join('');
  return `<${elem} ${formatAttributes(attrs)}>${children}</${elem}>`;
}

/**
 * Converts a Carbon icon/pictogram descriptor to an SVG string.
 * Accepts optional attribute overrides (e.g. fill, width, height).
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function iconToSVG(descriptor: any, overrides: Record<string, string> = {}): string {
  const icon = descriptor?.default ?? descriptor;
  const attrs = getAttributes({ ...icon.attrs, ...overrides });
  const attrString = formatAttributes(attrs);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const children = (icon.content ?? []).map((child: any) => elementToSVG(child)).join('');
  return `<svg ${attrString}>${children}</svg>`;
}
