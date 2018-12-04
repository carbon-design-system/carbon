import warning from 'warning';

/**
 * @param {string} name The component name.
 * @returns {Function} A stub of removed component.
 */
const removedComponent = name => {
  let didWarnAboutRemoval = false;
  const warn = () => {
    if (__DEV__) {
      warning(didWarnAboutRemoval, `The \`${name}\` component has been removed.`);
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
    static components = new WeakMap();
    static options = {};
  };
};

export default removedComponent;
