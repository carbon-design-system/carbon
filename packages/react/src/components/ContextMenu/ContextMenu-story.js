/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import ContextMenu from '../ContextMenu';

export default {
  title: 'ContextMenu',
  parameters: {
    ContextMenu,
  },
};

export const _ContextMenu = () => <ContextMenu />;

_ContextMenu.storyName = 'ContextMenu';
