/**
 * Copyright IBM Corp. 2025
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

/**
 * Checks if an element is a valid React element of a given component type.
 *
 * @param element - The element to test.
 * @param component - The component to match.
 */
export const isComponentElement = <P>(
  element: ReactNode,
  component: ComponentType<P>
): element is ReactElement<P> =>
  isValidElement<P>(element) && element.type === component;
