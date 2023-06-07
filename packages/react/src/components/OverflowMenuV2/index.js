/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { warning } from '../../internal/warning';

import { FeatureFlags } from '../FeatureFlags';
import { OverflowMenu } from '../OverflowMenu';

let didWarnAboutDeprecation = false;

function OverflowMenuV2(props) {
  if (__DEV__) {
    warning(
      didWarnAboutDeprecation,
      '`<OverflowMenuV2>` is deprecated and will be removed in the next major version. Use `<OverflowMenu>` with the `enable-v12-overflowmenu` feature flag instead.'
    );

    didWarnAboutDeprecation = true;
  }

  return (
    <FeatureFlags
      flags={{
        'enable-v12-overflowmenu': true,
      }}>
      <OverflowMenu {...props} />
    </FeatureFlags>
  );
}

export { OverflowMenuV2 };
