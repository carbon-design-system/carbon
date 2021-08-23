/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import 'wicg-inert';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { FocusScope } from '../FocusScope';
import { useMergedRefs } from '../../internal/useMergedRefs';
import { useSavedCallback } from '../../internal/useSavedCallback';
import { match, keys } from '../../internal/keyboard';

/**
 * @see https://www.tpgi.com/the-current-state-of-modal-dialog-accessibility/
 */
const Dialog = React.forwardRef(function Dialog(props, forwardRef) {
  const { 'aria-labelledby': labelledBy, children, onDismiss, ...rest } = props;
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
    const changes = hide(document.body, dialogRef.current);
    return () => {
      show(changes);
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

Dialog.propTypes = {
  /**
   * Provide the associated element that labels the Dialog
   */
  'aria-labelledby': PropTypes.string.isRequired,

  /**
   * Provide children to be rendered inside of the Dialog
   */
  children: PropTypes.node,

  /**
   * Provide a handler that is called when the Dialog is requesting to be closed
   */
  onDismiss: PropTypes.func.isRequired,
};

if (__DEV__) {
  Dialog.displayName = 'Dialog';
}

function hide(root, dialog) {
  const changes = [];
  const queue = Array.from(root.childNodes);

  while (queue.length !== 0) {
    const node = queue.shift();

    if (node.nodeType !== Node.ELEMENT_NODE) {
      continue;
    }

    // If a node is the dialog, do nothing
    if (node === dialog) {
      continue;
    }

    // If a tree contains our dialog, traverse its children
    if (node.contains(dialog)) {
      queue.push(...Array.from(node.childNodes));
      continue;
    }

    // If a node is a bumper, do nothing
    if (
      node.hasAttribute('data-carbon-focus-scope') &&
      (dialog.previousSibling === node || dialog.nextSibling === node)
    ) {
      continue;
    }

    if (node.getAttribute('aria-hidden') === 'true') {
      continue;
    }

    if (node.hasAttribute('inert')) {
      continue;
    }

    if (node.getAttribute('aria-hidden') === 'false') {
      node.setAttribute('aria-hidden', 'true');
      node.setAttribute('inert', '');
      changes.push({
        node,
        attributes: {
          'aria-hidden': 'false',
        },
      });
      continue;
    }

    // Otherwise, set it to inert and set aria-hidden to true
    node.setAttribute('aria-hidden', 'true');
    node.setAttribute('inert', '');

    changes.push({
      node,
    });
  }

  return changes;
}

function show(changes) {
  changes.forEach(({ node, attributes }) => {
    node.removeAttribute('inert');
    // This mutation needs to be asynchronous to allow the polyfill time to
    // observe the change and allow mutations to occur
    // https://github.com/WICG/inert#performance-and-gotchas
    setTimeout(() => {
      if (attributes && attributes['aria-hidden']) {
        node.setAttribute('aria-hidden', attributes['aria-hidden']);
      } else {
        node.removeAttribute('aria-hidden');
      }
    }, 0);
  });
}

export { Dialog };
