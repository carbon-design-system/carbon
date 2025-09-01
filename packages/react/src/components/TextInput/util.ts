/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const invalidProps = (invalidId: string) => ({
  'data-invalid': true,
  'aria-invalid': true,
  'aria-describedby': invalidId,
});

const warnProps = (warnId: string | undefined) => ({
  'aria-describedby': warnId,
});

const helperProps = (helperId: string | undefined) => ({
  'aria-describedby': helperId,
});

interface TextInputPropsConfig {
  sharedTextInputProps: Record<string, unknown>;
  invalid: boolean;
  invalidId: string;
  warn?: boolean;
  warnId?: string;
  hasHelper?: boolean;
  helperId?: string;
}

export const getTextInputProps = ({
  sharedTextInputProps,
  invalid,
  invalidId,
  warn,
  warnId,
  hasHelper,
  helperId,
}: TextInputPropsConfig) => ({
  ...sharedTextInputProps,
  ...(invalid ? invalidProps(invalidId) : {}),
  ...(warn ? warnProps(warnId) : {}),
  ...(hasHelper ? helperProps(helperId) : {}),
});
