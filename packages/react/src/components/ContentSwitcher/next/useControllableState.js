/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import { warning } from '../../../internal/warning';

export function useControllableState({ value, defaultValue, onChange }) {
  const [state, internalSetState] = React.useState(value || defaultValue);
  const controlled = React.useRef(null);

  if (controlled.current === null) {
    controlled.current = value !== undefined;
  }

  function setState(stateOrUpdater) {
    const value =
      typeof stateOrUpdater === 'function'
        ? stateOrUpdater(state)
        : stateOrUpdater;

    if (controlled.current === false) {
      internalSetState(value);
    }

    if (onChange) {
      onChange(value);
    }
  }

  React.useEffect(() => {
    const controlledValue = value !== undefined;

    // Uncontrolled -> Controlled
    // If the component prop is uncontrolled, the prop value should be undefined
    if (controlled.current === false && controlledValue) {
      warning(
        false,
        'A component is changing an uncontrolled component to be controlled. ' +
          'This is likely caused by the value changing to a defined value ' +
          'from undefined. Decide between using a controlled or uncontrolled ' +
          'value for the lifetime of the component. ' +
          'More info: https://reactjs.org/link/controlled-components'
      );
    }

    // Controlled -> Uncontrolled
    // If the component prop is controlled, the prop value should be defined
    if (controlled.current === true && !controlledValue) {
      warning(
        false,
        'A component is changing a controlled component to be uncontrolled. ' +
          'This is likely caused by the value changing to an undefined value ' +
          'from a defined one. Decide between using a controlled or ' +
          'uncontrolled value for the lifetime of the component. ' +
          'More info: https://reactjs.org/link/controlled-components'
      );
    }
  }, [value]);

  if (controlled.current === true) {
    return [value, setState];
  }

  return [state, setState];
}
