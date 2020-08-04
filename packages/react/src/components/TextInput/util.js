/*
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
*/
const invalidProps = ({ invalid, errorId }) => ({
  'data-invalid': invalid,
  'aria-invalid': invalid,
  'aria-describedby': errorId,
});

const warnProps = ({ warnId }) => ({
  'aria-describedby': warnId,
});

export const textInputProps = ({
  invalid,
  sharedTextInputProps,
  errorId,
  warn,
  warnId,
}) => ({
  ...sharedTextInputProps,
  ...(invalid ? invalidProps({ invalid, errorId }) : {}),
  ...(!invalid && warn ? warnProps({ warnId }) : {}),
});
