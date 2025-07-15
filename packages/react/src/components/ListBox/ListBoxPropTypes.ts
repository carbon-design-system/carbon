/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';

const listBoxTypes = ['default', 'inline'] as const;
const listBoxSizes = ['sm', 'md', 'lg'] as const;

export type ListBoxType = (typeof listBoxTypes)[number];
export type ListBoxSize = (typeof listBoxSizes)[number];

export const ListBoxTypePropType = PropTypes.oneOf(listBoxTypes);
export const ListBoxSizePropType = PropTypes.oneOf(listBoxSizes);
