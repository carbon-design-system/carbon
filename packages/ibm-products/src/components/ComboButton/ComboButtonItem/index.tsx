/**
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { bool, func, node, object, oneOfType, string } from 'prop-types';
import React from 'react';

/**
 * The combo button item provides additional actions a user can take.
 */
const ComboButtonItem = ({ ...rest }) => <span {...rest} />;

ComboButtonItem.propTypes = {
  /** Provide the contents of the `ComboButtonItem` */
  children: node.isRequired,

  /** Specify whether the `ComboButton` should be disabled, or not */
  disabled: bool,

  /** Provide an optional `href` for the `ComboButtonItem` to become an `a` element */
  href: string,

  /** Provide an optional icon to render */
  renderIcon: oneOfType([func, object]),
};

export { ComboButtonItem };
