/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { WebTerminal } from './WebTerminal';
import figma from '@figma/code-connect';
import { Code, Copy } from '@carbon/react/icons';

const connectionURL =
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=5308%3A336584';

figma.connect(WebTerminal, connectionURL, {
  variant: { State: 'Connected' },
  props: {
    children: figma.textContent('Connection successful.'),
  },
  example: (props) => (
    <WebTerminal
      isInitiallyOpen={true}
      closeIconDescription="Close terminal"
      actions={[
        {
          renderIcon: () => <Code size={16} />,
          onClick: () => console.log('clicked on action'),
          iconDescription: 'Create new deployment',
        },
        {
          renderIcon: () => <Copy size={16} />,
          onClick: () => console.log('clicked on action'),
          iconDescription: 'Copy logs',
        },
      ]}
      documentationLinksIconDescription="Show documentation links"
      documentationLinks={[
        {
          itemText: 'Kubernetes docs',
          href: '#',
          onClick: () => console.log('clicked documentation link'),
        },
        {
          itemText: 'Docker docs',
          href: '#',
          onClick: () => console.log('clicked documentation link'),
        },
      ]}
    >
      <div className="example-terminal">{props.children}</div>
    </WebTerminal>
  ),
});

figma.connect(WebTerminal, connectionURL, {
  variant: { State: 'Connecting' },
  props: {
    children: figma.children('Loading'),
    loadingMessage: figma.textContent('"Connecting web terminal..."'),
  },
  example: (props) => (
    <WebTerminal
      isInitiallyOpen={true}
      closeIconDescription="Close terminal"
      actions={[
        {
          renderIcon: () => <Code size={16} />,
          onClick: () => console.log('clicked on action'),
          iconDescription: 'Create new deployment',
        },
        {
          renderIcon: () => <Copy size={16} />,
          onClick: () => console.log('clicked on action'),
          iconDescription: 'Copy logs',
        },
      ]}
      documentationLinksIconDescription="Show documentation links"
      documentationLinks={[
        {
          itemText: 'Kubernetes docs',
          href: '#',
          onClick: () => console.log('clicked documentation link'),
        },
        {
          itemText: 'Docker docs',
          href: '#',
          onClick: () => console.log('clicked documentation link'),
        },
      ]}
    >
      <div className="example-terminal">
        {props.children}
        <p>{props.loadingMessage}</p>
      </div>
    </WebTerminal>
  ),
});
