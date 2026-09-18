/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

// Use figma.code so dynamic attributes remain valid Code Connect sections.
export function renderBooleanAttribute(name: string, value: unknown) {
  return value === true ? figma.code` ${name}` : null;
}

export function renderStringAttribute(name: string, value: unknown) {
  return typeof value === 'string' ? figma.code` ${name}="${value}"` : null;
}
