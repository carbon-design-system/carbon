/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getAttributes, formatAttributes } from '@carbon/icon-helpers';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';

// Carbon icon element types
export interface CarbonIconElement {
  elem: string;
  attrs: Record<string, string | number>;
  content: (CarbonIconElement | string)[];
}

// Carbon icon descriptor types
export interface CarbonIconDescriptor {
  elem: string;
  attrs: Record<string, string | number>;
  content: CarbonIconElement[];
  name: string;
  size: number;
}

// Carbon icon module types
export interface CarbonIconModule {
  default?: CarbonIconDescriptor;
}

export type CarbonIcon = CarbonIconDescriptor | CarbonIconModule;

// Helper function to get the actual descriptor
function getIconDescriptor(descriptor: CarbonIcon): CarbonIconDescriptor {
  return 'default' in descriptor && descriptor.default
    ? (descriptor.default as CarbonIconDescriptor)
    : (descriptor as CarbonIconDescriptor);
}

/**
 * Convert an imported icon descriptor to an SVG string, e.g.
 * import ChevronRight16 from '@carbon/icons/es/chevron--right/16.js';
 */
export function carbonIconToSVG(
  descriptor: CarbonIcon,
  attributes: Record<string, string | number | undefined> = {}
) {
  const iconDescriptor = getIconDescriptor(descriptor);

  // Ensure attrs exists
  if (!iconDescriptor.attrs) {
    iconDescriptor.attrs = {};
  }

  // Merge attributes
  const mergedAttrs = {
    ...iconDescriptor.attrs,
    ...attributes,
  };

  // Process attributes
  const processedAttrs = getAttributes(mergedAttrs);

  // Ensure proper attribute formatting
  const attrString = formatAttributes(processedAttrs);

  // Process content
  const content = iconDescriptor.content || [];
  const contentString = content
    .map((child: CarbonIconElement | string) => {
      if (typeof child === 'string') return child;
      return elementToSVG(child);
    })
    .join('');

  return `<svg ${attrString}>${contentString}</svg>`;
}

/**
 * Convert an element to SVG string
 */
function elementToSVG(element: CarbonIconElement | string): string {
  if (typeof element === 'string') {
    return element;
  }

  const { elem = 'svg', attrs = {}, content = [] } = element;
  const children = content.map(elementToSVG).join('');
  const attrString = formatAttributes(attrs);

  return `<${elem} ${attrString}>${children}</${elem}>`;
}

/**
 * Create an icon function that returns a Lit template with unsafeSVG
 */
export function createIconTemplate(descriptor: CarbonIcon) {
  return (attributes: Record<string, string | number | undefined> = {}) => {
    const svgString = carbonIconToSVG(descriptor, attributes);
    return unsafeSVG(svgString);
  };
}
