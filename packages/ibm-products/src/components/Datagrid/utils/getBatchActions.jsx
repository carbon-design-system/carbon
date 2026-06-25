/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Add } from '@carbon/react/icons';
import { action } from 'storybook/actions';

export const getBatchActions = () => {
  return [
    {
      label: 'Duplicate',
      renderIcon: (props) => <Add size={16} {...props} />,
      onClick: action('Clicked batch action button'),
    },
    {
      label: 'Add',
      renderIcon: (props) => <Add size={16} {...props} />,
      onClick: action('Clicked batch action button'),
    },
    {
      label: 'Publish to catalog',
      renderIcon: (props) => <Add size={16} {...props} />,
      onClick: action('Clicked batch action button'),
    },
    {
      label: 'Download',
      renderIcon: (props) => <Add size={16} {...props} />,
      onClick: action('Clicked batch action button'),
    },
    {
      label: 'Delete',
      renderIcon: (props) => <Add size={16} {...props} />,
      onClick: action('Clicked batch action button'),
      hasDivider: true,
      kind: 'danger',
    },
  ];
};
