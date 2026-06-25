/**
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// cspell:words joebob

import React from 'react';
// Carbon and package components we use.
import { Code, Copy } from '@carbon/react/icons';
import { action } from 'storybook/actions';
import { Navigation } from './preview-components';
import { WebTerminal } from '.';
import { WebTerminalContentWrapper } from './WebTerminalContentWrapper';
import { documentationLinks } from './preview-components/documentationLinks';
import { WebTerminalProvider } from './hooks';

import styles from './_storybook-styles.scss?inline';
import DocsPage from './WebTerminal.docs-page';

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

const Template = (args) => {
  return (
    <WebTerminalProvider>
      <Navigation />

      <WebTerminalContentWrapper>
        This is where you would put content
      </WebTerminalContentWrapper>

      <WebTerminal {...args}>
        <div className="example-terminal">
          <p>Connection successful.</p>
          <p>
            DISCLAIMER: This is not a real terminal, you would pass your own
            terminal component into the children of the WebTerminal component.
          </p>

          <p>Please see the docs of this component for more information.</p>
          <p>joebob:~$</p>
        </div>
      </WebTerminal>
    </WebTerminalProvider>
  );
};

export const Default = Template.bind({});
Default.args = {
  documentationLinks,
  actions,
  isInitiallyOpen: true,
  closeIconDescription: 'Close terminal',
  documentationLinksIconDescription: 'Show documentation links',
};

export const WithDocumentationLinks = Template.bind({});
WithDocumentationLinks.args = {
  documentationLinks,
  closeIconDescription: 'Close terminal',
  isInitiallyOpen: true,
  documentationLinksIconDescription: 'Show documentation links',
};

export const WithActions = Template.bind({});
WithActions.args = {
  actions,
  isInitiallyOpen: true,
  closeIconDescription: 'Close terminal',
};

export default {
  title: 'Patterns/Prebuilt patterns/WebTerminal',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    styles,

    docs: {
      page: DocsPage,
    },
  },
  component: WebTerminal, // Required to pick up WebTerminal doc block
};
