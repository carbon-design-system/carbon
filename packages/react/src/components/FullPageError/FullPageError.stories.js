/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './story.scss';

import React from 'react';
import Link from '../Link';
import { UiShell } from './preview-components/UiShell';
import { Breadcrumbs } from './preview-components/Breadcrumbs';
import { FullPageError } from './FullPageError';
import mdx from './FullPageError.mdx';

const storyClass = 'full-page-error-stories';

export default {
  title: 'Components/FullPageError',
  component: FullPageError,
  tags: ['autodocs', 'ibm-products-migrated'],
  argTypes: {
    className: { table: { disable: true } },
    kind: {
      control: { type: 'select' },
      options: ['403', '404', 'custom'],
    },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: mdx,
    },
  },
};

const defaultArgs = {
  kind: 'custom',
  title: '[Error title]',
  label: 'Error ###',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
};

const Template = (args) => (
  <div className={`${storyClass}__viewport`}>
    <UiShell>
      <div className={`${storyClass}__offset`}>
        <div className={`${storyClass}__breadcrumb-container`}>
          <Breadcrumbs className={`${storyClass}__breadcrumb`} />
        </div>
        <FullPageError {...args}>
          <Link size="lg" href="/">
            – Forwarding Link 1
          </Link>
          <br />
          <Link size="lg" href="/">
            – Forwarding Link 2
          </Link>
        </FullPageError>
      </div>
    </UiShell>
  </div>
);

export const Default = {
  render: Template,
  args: { ...defaultArgs },
};

export const Error403 = {
  render: Template,
  args: {
    ...defaultArgs,
    kind: '403',
    title: 'Access denied',
    label: 'Error 403',
    description:
      'You are not authorized to access the requested page. Please verify that you are logged in to the hosting environment and your access permissions are correct.',
  },
};

export const Error404 = {
  render: Template,
  args: {
    ...defaultArgs,
    kind: '404',
    title: 'Page not found',
    label: 'Error 404',
    description:
      'The page you requested has moved or is unavailable, or the specified URL is not valid. Please check the URL or search the site for the requested content.',
  },
};
