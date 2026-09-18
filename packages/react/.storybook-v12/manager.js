/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { addons } from 'storybook/manager-api';
import theme from './theme';

addons.setConfig({
  theme,
  sidebar: {
    renderLabel(item) {
      if (
        item.type === 'component' &&
        item.tags?.includes('ibm-products-migrated')
      ) {
        return React.createElement(
          'span',
          { style: { display: 'flex', alignItems: 'center', gap: '6px' } },
          item.name,
          React.createElement(
            'span',
            {
              style: {
                fontSize: '10px',
                fontWeight: '600',
                lineHeight: '1',
                padding: '2px 5px',
                borderRadius: '3px',
                background: '#0f62fe',
                color: '#ffffff',
                letterSpacing: '0.02em',
                flexShrink: 0,
              },
            },
            'Migrated'
          )
        );
      }
      return item.name;
    },
  },
});

localStorage.removeItem('@storybook/ui/store');
localStorage.removeItem('storybook-layout');
