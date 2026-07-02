/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import './welcome.scss';
import '../../src/components/link/index';
import '../../src/components/notification/index';

const links = [
  {
    href: 'https://carbondesignsystem.com/',
    label: 'Website',
  },
  {
    href: 'https://github.com/carbon-design-system/carbon/tree/main/packages/web-components',
    label: 'GitHub repo',
  },
  {
    href: 'https://github.com/carbon-design-system/carbon/blob/main/docs/release-schedule.md',
    label: 'Release schedule',
  },
  {
    href: 'https://github.com/carbon-design-system/carbon/blob/main/SECURITY.md',
    label: 'Security policy',
  },
];

export const Welcome = () => {
  return React.createElement(
    'div',
    { className: 'welcome__container' },
    React.createElement(
      'h2',
      { className: 'welcome__heading' },
      '@carbon/web-components'
    ),
    React.createElement(
      'h4',
      { className: 'welcome__heading welcome__heading--subtitle' },
      'v3.x'
    ),
    React.createElement('cds-callout-notification', {
      className: 'v12-callout',
      'low-contrast': true,
      'status-icon-description': 'notification',
      subtitle:
        'Every story has the enable-v12-release flag set to true. Stories with 🚀 are v12-specific stories not present in the v11 storybook.',
      title: 'This storybook reflects work in progress for v12',
    }),
    React.createElement(
      'div',
      { className: 'welcome__links' },
      links.map((link) => {
        return React.createElement(
          'cds-link',
          { className: 'welcome__link', href: link.href, key: link.href },
          link.label,
          React.createElement(
            'span',
            {
              className: 'welcome__link-icon',
              slot: 'icon',
              'aria-hidden': 'true',
            },
            '→'
          )
        );
      })
    )
  );
};
