/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import warning from 'warning';

/**
 * @param {string} name The component name.
 * @returns {Function} A stub of removed component.
 */
const removedComponent = (name) => {
  let didWarnAboutRemoval = false;
  const warn = () => {
    if (__DEV__) {
      warning(
        didWarnAboutRemoval,
        `The \`${name}\` component has been removed.`
      );
      didWarnAboutRemoval = true;
    }
  };
  return class {
    constructor() {
      warn();
    }

    static create() {
      warn();
    }

    static init() {
      warn();
    }

    static components /* #__PURE_CLASS_PROPERTY__ */ = new WeakMap();

    static options /* #__PURE_CLASS_PROPERTY__ */ = {};
  };
};

export default removedComponent;
