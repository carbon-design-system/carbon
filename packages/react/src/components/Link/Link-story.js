/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import Link from '../Link';
import mdx from './Link.mdx';

const props = () => ({
  className: 'some-class',
  href: text('The link href (href)', '#'),
  inline: boolean('Use the in-line variant (inline)', false),
  visited: boolean('Allow visited styles', false),
  onClick: ((handler) => (evt) => {
    evt.preventDefault(); // Prevent link from being followed for demo purpose
    handler(evt);
  })(action('onClick')),
  disabled: boolean('Disabled', false),
  size: select('Link size', {
    Default: undefined,
    'Small (sm)': 'sm',
    'Large (lg)': 'lg',
  }),
});

export default {
  title: 'Components/Link',
  decorators: [withKnobs],

  parameters: {
    component: Link,
    docs: {
      page: mdx,
    },
  },
};

export const _Default = () => (
  <Link href="http://www.carbondesignsystem.com">Link</Link>
);

_Default.story = {
  name: 'Link',
};

export const Playground = () => <Link {...props()}>Link</Link>;
