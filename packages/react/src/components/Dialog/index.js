/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import 'wicg-inert';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { FocusScope } from './FocusScope';
import { useMergedRefs } from '../../internal/useMergedRefs';
import { useSavedCallback } from '../../internal/useSavedCallback';
import { match, keys } from '../../internal/keyboard';

/**
 * @see https://www.tpgi.com/the-current-state-of-modal-dialog-accessibility/
 */
const Dialog = React.forwardRef(function Dialog(props, forwardRef) {
  const {
    'aria-labelledby': labelledBy,
    children,
    onDismiss,
    open = false,
    modal = true,
    ...rest
  } = props;
  const dialogRef = useRef(null);
  const ref = useMergedRefs([dialogRef, forwardRef]);
  const savedOnDismiss = useSavedCallback(onDismiss);

  function onKeyDown(event) {
    if (!open) {
      return;
    }

    if (match(event, keys.Escape)) {
      event.stopPropagation();
      savedOnDismiss();
    }
  }

  useEffect(() => {
    if (open) {
      //
    }
  }, [open]);

  if (open) {
    return (
      <Portal
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 9998,
        }}>
        <FullPage />
        <FocusScope
          {...rest}
          aria-labelledby={labelledBy}
          aria-modal="true"
          initialFocusRef={dialogRef}
          onKeyDown={onKeyDown}
          ref={ref}
          role="dialog"
          tabIndex="-1"
          style={{
            position: 'relative',
            zIndex: 9999,
            background: 'white',
            padding: '1rem',
          }}>
          {children}
        </FocusScope>
      </Portal>
    );
  }

  return null;
});

Dialog.propTypes = {};

if (__DEV__) {
  Dialog.displayName = 'Dialog';
}

function Portal({ children, ...rest }) {
  return <div {...rest}>{children}</div>;
}

function FullPage(props) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        transform: 'translateZ(0)',
        background: 'rgba(0, 0, 0, 0.5)',
      }}
      {...props}
    />
  );
}

export { Dialog };
