/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  WarningFilled16,
  WarningAltFilled16,
  EditOff16,
} from '@carbon/icons-react';
import { settings } from 'carbon-components';

const { prefix } = settings;

export function useNormalizedInputProps({
  id,
  readonly,
  invalid,
  invalidText,
  warn,
  warnText,
}) {
  const normalizedProps = {
    invalid: !readonly && invalid,
    invalidId: `${id}-error-msg`,
    warn: !readonly && !invalid && warn,
    warnId: `${id}-warn-msg`,
    validation: null,
  };

  if (readonly) {
    normalizedProps.icon = EditOff16;
  } else {
    if (normalizedProps.invalid) {
      normalizedProps.icon = WarningFilled16;
      normalizedProps.validation = (
        <div
          className={`${prefix}--form-requirement`}
          id={normalizedProps.invalidId}>
          {invalidText}
        </div>
      );
    } else if (normalizedProps.warn) {
      normalizedProps.icon = WarningAltFilled16;
      normalizedProps.validation = (
        <div
          className={`${prefix}--form-requirement`}
          id={normalizedProps.warnId}>
          {warnText}
        </div>
      );
    }
  }

  return normalizedProps;
}
