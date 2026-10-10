/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Code, Copy } from '@carbon/react/icons';
import { action } from 'storybook/actions';
import './_story-styles.scss';
import DocsPage from './WebTerminal.mdx';
import {
  Default,
  WithActions,
  WithDocumentationLinks,
} from './example/preview-components';

export default {
  title: 'Examples/Web Terminal',
  component: () => {},
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: DocsPage,
    },
  },
};

const actions = [
  {
    renderIcon: (props) => <Code size={16} {...props} />,
    onClick: action('clicked on action'),
    iconDescription: 'Create new deployment',
  },
  {
    renderIcon: (props) => <Copy size={16} {...props} />,
    onClick: action('clicked on action'),
    iconDescription: 'Copy logs',
  },
];

export const defaultWebTerminal = (args) => (
  <Default {...args} actions={actions} />
);
defaultWebTerminal.storyName = 'Default';
defaultWebTerminal.args = {
  isInitiallyOpen: true,
  closeIconDescription: 'Close terminal',
  documentationLinksIconDescription: 'Show documentation links',
};
defaultWebTerminal.parameters = {
  docs: { story: { height: '600px' } },
};

export const withDocumentationLinks = (args) => (
  <WithDocumentationLinks {...args} />
);
withDocumentationLinks.storyName = 'With documentation links';
withDocumentationLinks.args = {
  closeIconDescription: 'Close terminal',
  isInitiallyOpen: true,
  documentationLinksIconDescription: 'Show documentation links',
};
withDocumentationLinks.parameters = {
  docs: { story: { height: '600px' } },
};

export const withActions = (args) => (
  <WithActions {...args} actions={actions} />
);
withActions.storyName = 'With actions';
withActions.args = {
  isInitiallyOpen: true,
  closeIconDescription: 'Close terminal',
};
withActions.parameters = {
  docs: { story: { height: '600px' } },
};
