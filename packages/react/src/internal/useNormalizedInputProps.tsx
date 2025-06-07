/**
 * Copyright IBM Corp. 2021, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { type ComponentType, type ReactNode } from 'react';
import { WarningAltFilled, WarningFilled } from '@carbon/icons-react';
import { Text } from '../components/Text';
import { usePrefix } from './usePrefix';

interface InputProps {
  /** The ID for the input. */
  id: string;
  /** Whether the input is read-only. */
  readOnly?: boolean;
  /** Whether the input is disabled. */
  disabled: boolean;
  /** Whether the input is an invalid state. */
  invalid: boolean;
  /** The message displayed when the input is invalid. */
  invalidText?: ReactNode;
  /** Whether the input is in a warning state. */
  warn: boolean;
  /** The message displayed when the input is in a warning state. */
  warnText?: ReactNode;
}

interface NormalizedInputProps {
  /** Disabled state. */
  disabled: boolean;
  /** Invalid state. */
  invalid: boolean;
  /** The generated ID for the error message. */
  invalidId: string;
  /** The generated ID for the helper text. */
  helperId: string;
  /** Warning state. */
  warn: boolean;
  /** The generated ID for the warning message. */
  warnId: string;
  /** A React node containing the validation message. */
  validation: ReactNode | null;
  /** A React component representing the accompanying icon. */
  icon: ComponentType | null;
}

/**
 * Returns an object containing normalized properties for an input component.
 *
 * This hook ensures that only one of `invalid` or `warn` is active (with
 * `invalid` taking precedence) and that `readOnly` overrides the `disabled`,
 * `invalid`, and `warn` states. It generates unique IDs for error, warning, and
 * helper messages, and conditionally provides the appropriate validation
 * message and accompanying icon.
 */
export const useNormalizedInputProps = ({
  id,
  readOnly,
  disabled,
  invalid,
  invalidText,
  warn,
  warnText,
}: InputProps): NormalizedInputProps => {
  const prefix = usePrefix();
  const normalizedProps: NormalizedInputProps = {
    disabled: !readOnly && disabled,
    invalid: !readOnly && invalid,
    invalidId: `${id}-error-msg`,
    warn: !readOnly && !invalid && warn,
    warnId: `${id}-warn-msg`,
    validation: null,
    icon: null,
    helperId: `${id}-helper-text`,
  };

  if (normalizedProps.invalid) {
    normalizedProps.icon = WarningFilled;
    normalizedProps.validation = (
      <Text
        as="div"
        className={`${prefix}--form-requirement`}
        id={normalizedProps.invalidId}>
        {invalidText}
      </Text>
    );
  } else if (normalizedProps.warn) {
    normalizedProps.icon = WarningAltFilled;
    normalizedProps.validation = (
      <Text
        as="div"
        className={`${prefix}--form-requirement`}
        id={normalizedProps.warnId}>
        {warnText}
      </Text>
    );
  }

  return normalizedProps;
};
