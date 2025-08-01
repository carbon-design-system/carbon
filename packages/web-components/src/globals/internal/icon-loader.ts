/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { createIconTemplate } from './icon-loader-utils';

/**
 * Icon utility function that returns pure SVG content without any wrapper element.
 * This preserves all existing CSS selectors and provides a unified way to render icons.
 *
 * For Carbon icons, import directly in your component:
 * import ChevronRight16 from '@carbon/icons/es/chevron--right/16.js';
 *
 * Usage:
 *   Icon import: ${cdsIcon(ChevronRight16)}
 *   With attributes: ${cdsIcon(ChevronRight16, { class: 'my-class', slot: 'icon' })}
 *   SVG string: ${cdsIcon(null, {}, '<svg>...</svg>')}
 *
 * @param icon - Icon descriptor from import, Lit template, or null for custom SVG
 * @param attributes - Additional attributes to apply to the SVG
 * @param customSvg - Custom SVG string (used when icon is null)
 * @returns Lit template with pure SVG content
 */
export function cdsIcon(icon: any, attributes: any = {}, customSvg?: string) {
  // SVG string
  if (customSvg) {
    return unsafeSVG(customSvg);
  }

  // Imported icon
  if (icon) {
    // If it's an imported icon descriptor such as ChevronRight16, convert to SVG
    if (icon.default || (icon.attrs && icon.content)) {
      const iconTemplate = createIconTemplate(icon);
      return iconTemplate(attributes);
    }
    // If it's a Lit template or other content
    return icon;
  }

  // No icon provided
  return null;
}

export default cdsIcon;
