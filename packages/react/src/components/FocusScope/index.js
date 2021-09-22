/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import * as React from 'react';
import { useMergedRefs } from '../../internal/useMergedRefs';
import { useAutoFocus } from './useAutoFocus';
import { useFocusScope } from './useFocusScope';
import { useRestoreFocus } from './useRestoreFocus';

const FocusScope = React.forwardRef(function FocusScope(props, forwardRef) {
  const {
    as: BaseComponent = 'div',
    children,
    initialFocusRef,
    ...rest
  } = props;
  const containerRef = React.useRef(null);
  const focusScope = useFocusScope(containerRef);
  const ref = useMergedRefs([forwardRef, containerRef]);

  useRestoreFocus(containerRef);
  useAutoFocus(() => {
    if (initialFocusRef) {
      return initialFocusRef;
    }
    return focusScope.current.getFirstDescendant();
  });

  return (
    <>
      <FocusScopeBumper
        onFocus={() => {
          focusScope.current.focusLastDescendant();
        }}
      />
      <BaseComponent {...rest} ref={ref}>
        {children}
      </BaseComponent>
      <FocusScopeBumper
        onFocus={() => {
          focusScope.current.focusFirstDescendant();
        }}
      />
    </>
  );
});

if (__DEV__) {
  FocusScope.displayName = 'FocusScope';
}

FocusScope.propTypes = {
  /**
   * Provide a custom element type for the containing element
   */
  as: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.elementType,
  ]),

  /**
   * Provide the children to be rendered inside of the `FocusScope`
   */
  children: PropTypes.node,

  /**
   * Provide a `ref` that is used to place focus when the `FocusScope` is
   * initially opened
   */
  initialFocusRef: PropTypes.shape({
    current: PropTypes.any,
  }),
};

const bumperStyle = {
  outline: 'none',
  opacity: '0',
  position: 'fixed',
  pointerEvents: 'none',
};

function FocusScopeBumper(props) {
  return (
    <span
      data-carbon-focus-scope=""
      style={bumperStyle}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex="0"
      {...props}
    />
  );
}

export { FocusScope };
