/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

/**
 * Wrap a class component with a functional component. This prevents an end-user
 * from being able to pass `ref` and access the underlying class instance.
 *
 * @param {ReactNode} Component
 * @returns {ReactNode}
 */
export function createClassWrapper(Component) {
  function ClassWrapper(props) {
    return <Component {...props} />;
  }

  const name = Component.displayName || Component.name;
  ClassWrapper.displayName = `ClassWrapper(${name})`;

  return ClassWrapper;
}
