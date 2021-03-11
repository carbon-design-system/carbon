/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { settings } from 'carbon-components';

const { prefix } = settings;

function ContextMenuDivider() {
  return <li role="separator" className={`${prefix}--context-menu-divider`} />;
}

export default ContextMenuDivider;
