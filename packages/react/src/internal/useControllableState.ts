/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useRef, useState } from 'react';
import { warning } from './warning';

interface UseControllableStateConfig<T> {
  /** The name of the component. */
  name?: string;
  /**
   * The default value for the component. This value is used when the component
   * is uncontrolled (i.e., when `value` is not provided).
   */
  defaultValue: T;
  /**
   * This callback is called whenever the state changes. It's useful for
   * communicating state updates to parent components of controlled components.
   */
  onChange?: (value: T) => void;
  /**
   * Controlled value. If this prop is omitted, the state will be uncontrolled.
   */
  value?: T;
}

/**
 * This hook simplifies the behavior of a component that has state which can be
 * both controlled and uncontrolled. It works like `useState`. You can use the
 * `onChange` callback to communicate state updates to parent components.
 *
 * Note: This hook will warn if the component switches between controlled and
 * uncontrolled states.
 */
export const useControllableState = <T>({
  defaultValue,
  name = 'custom',
  onChange,
  value,
}: UseControllableStateConfig<T>): [
  T,
  (stateOrUpdater: T | ((prev: T) => T)) => void,
] => {
  const [state, internalSetState] = useState<T>(
    typeof value !== 'undefined' ? value : defaultValue
  );
  const controlled = useRef<boolean | null>(null);

  if (controlled.current === null) {
    controlled.current = typeof value !== 'undefined';
  }

  const setState = (stateOrUpdater: T | ((prev: T) => T)) => {
    const newValue =
      typeof stateOrUpdater === 'function'
        ? (stateOrUpdater as (prev: T) => T)(state)
        : stateOrUpdater;

    if (controlled.current === false) {
      internalSetState(newValue);
    }

    if (onChange) {
      onChange(newValue);
    }
  };

  useEffect(() => {
    const controlledValue = typeof value !== 'undefined';

    // Uncontrolled -> Controlled
    if (controlled.current === false && controlledValue) {
      warning(
        false,
        `A component is changing an uncontrolled ${name} component to be controlled. ` +
          'This is likely caused by the value changing to a defined value ' +
          'from undefined. Decide between using a controlled or uncontrolled ' +
          'value for the lifetime of the component. ' +
          'More info: https://reactjs.org/link/controlled-components'
      );
    }

    // Controlled -> Uncontrolled
    if (controlled.current === true && !controlledValue) {
      warning(
        false,
        `A component is changing a controlled ${name} component to be uncontrolled. ` +
          'This is likely caused by the value changing to an undefined value ' +
          'from a defined one. Decide between using a controlled or ' +
          'uncontrolled value for the lifetime of the component. ' +
          'More info: https://reactjs.org/link/controlled-components'
      );
    }
  }, [name, value]);

  if (controlled.current === true) {
    return [value as T, setState];
  }

  return [state, setState];
};
