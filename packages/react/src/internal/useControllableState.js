/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useRef, useState } from 'react';
import { warning } from './warning';

export function useControllableState(
  controlledState,
  controlledSetState,
  defaultValue
) {
  const controlled = useRef(controlledState !== undefined);
  const [state, internalSetState] = useState(() => {
    if (controlled.current === true) {
      return controlledState;
    }
    return defaultValue;
  });

  // If the owner is controlling the component prop value, keep the controlled
  // state value and the internal state value in sync.
  //
  // We guard on `undefined` to prevent downstream breakage of controlled
  // components (like <input>). When the controlled state switches to
  // `undefined`, we are moving from controlled to uncontrolled.
  if (
    controlled.current === true &&
    controlledState !== state &&
    controlledState !== undefined
  ) {
    internalSetState(controlledState);
  }

  function setState(stateOrUpdater) {
    if (controlled.current === true) {
      controlledSetState(stateOrUpdater);
    } else {
      internalSetState(stateOrUpdater);
    }
  }

  useEffect(() => {
    // Uncontrolled -> Controlled
    // If the component prop is uncontrolled, the prop value should be undefined
    if (controlled.current === false && controlledState !== undefined) {
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
    if (controlled.current === true && controlledState === undefined) {
      warning(
        false,
        'A component is changing a controlled component to be uncontrolled. ' +
          'This is likely caused by the value changing to an undefined value ' +
          'from a defined one. Decide between using a controlled or ' +
          'uncontrolled value for the lifetime of the component. ' +
          'More info: https://reactjs.org/link/controlled-components'
      );
    }
  }, [controlledState]);

  return [state, setState];
}
