//
// Copyright IBM Corp. 2020, 2021
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

export const isProduction = process.env.NODE_ENV === 'production';
export const noop = () => undefined;
export const shimIfProduction = (fn) => (isProduction ? noop : fn);
export const log = shimIfProduction((...args) => console.log(...args));
export const warn = shimIfProduction((...args) => console.warn(...args));
export const error = shimIfProduction((...args) => console.error(...args));

export default {
  isProduction,
  noop,
  shimIfProduction,
  log,
  warn,
  error,
};
