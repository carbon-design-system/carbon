/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const invalidProps = (invalidId) => ({
  'data-invalid': true,
  'aria-invalid': true,
  'aria-describedby': invalidId,
});

const warnProps = (warnId) => ({
  'aria-describedby': warnId,
});

const helperProps = (helperId) => ({
  'aria-describedby': helperId,
});

/**
 * @param {{sharedTextInputProps: object, invalid?: boolean, invalidId?: string, warn?: boolean, warnId?: string, hasHelper?: boolean, helperId?: string}} config
 * @returns {object}
 */
export const textInputProps = ({
  sharedTextInputProps,
  invalid,
  invalidId,
  warn,
  warnId,
  hasHelper,
  helperId,
}) => ({
  ...sharedTextInputProps,
  ...(invalid ? invalidProps(invalidId) : {}),
  ...(warn ? warnProps(warnId) : {}),
  ...(hasHelper ? helperProps(helperId) : {}),
});
