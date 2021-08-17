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
    modal = true,
    ...rest
  } = props;
  const dialogRef = useRef(null);
  const ref = useMergedRefs([dialogRef, forwardRef]);
  const savedOnDismiss = useSavedCallback(onDismiss);

  function onKeyDown(event) {
    if (match(event, keys.Escape)) {
      event.stopPropagation();
      savedOnDismiss();
    }
  }

  useEffect(() => {
    const changes = [];
    const queue = Array.from(document.body.childNodes);

    while (queue.length !== 0) {
      const node = queue.shift();

      // If a node is the modal (dialogRef), do nothing
      if (node === dialogRef.current) {
        continue;
      }

      // If a tree contains our `dialogRef`, traverse its children
      if (node.contains(dialogRef.current)) {
        queue.push(...Array.from(node.childNodes));
        continue;
      }

      // If a node is a bumper, do nothing
      if (
        node.hasAttribute('data-dialog-bumper') &&
        (dialogRef.current.previousSibling === node ||
          dialogRef.current.nextSibling === node)
      ) {
        continue;
      }

      if (node.hasAttribute('aria-hidden') || node.hasAttribute('inert')) {
        continue;
      }

      // what is aria-hidden === 'false'

      // Otherwise, set it to inert and set aria-hidden to true
      node.setAttribute('aria-hidden', 'true');
      node.setAttribute('inert', '');

      changes.push(node);
    }

    return () => {
      changes.forEach((node) => {
        node.removeAttribute('inert');
        // This mutation needs to be asynchronous to allow the polyfill time to
        // observe the change and allow mutations to occur
        // https://github.com/WICG/inert#performance-and-gotchas
        setTimeout(() => {
          node.removeAttribute('aria-hidden');
        }, 0);
      });
    };
  }, []);

  return (
    <FocusScope
      {...rest}
      aria-labelledby={labelledBy}
      aria-modal="true"
      initialFocusRef={dialogRef}
      onKeyDown={onKeyDown}
      ref={ref}
      role="dialog"
      tabIndex="-1">
      {children}
    </FocusScope>
  );
});

Dialog.propTypes = {};

if (__DEV__) {
  Dialog.displayName = 'Dialog';
}

export { Dialog };
