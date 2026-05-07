/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  isValidElement,
  type ComponentType,
  type ReactElement,
  type ReactNode,
} from 'react';

type ComponentWithDisplayName = {
  displayName?: string;
};

const getDisplayName = (component: unknown) => {
  if (
    !component ||
    (typeof component !== 'function' && typeof component !== 'object')
  )
    return;

  return (component as ComponentWithDisplayName).displayName;
};

/**
 * Checks if an element is a valid React element of a given component type.
 *
 * @param element - The element to test.
 * @param component - The component to match.
 */
export const isComponentElement = <P>(
  element: ReactNode,
  component: ComponentType<P>,
  options?: {
    allowDisplayNameFallback?: boolean;
  }
): element is ReactElement<P> => {
  if (!isValidElement<P>(element)) return false;

  if (element.type === component) return true;

  if (!options?.allowDisplayNameFallback) return false;

  const elementDisplayName = getDisplayName(element.type);
  const componentDisplayName = getDisplayName(component);

  return (
    typeof elementDisplayName === 'string' &&
    elementDisplayName === componentDisplayName
  );
};
