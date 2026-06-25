/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { StoryDocsPage } from '../../global/js/utils/StoryDocsPage';
import * as stories from './WebTerminal.stories';

const DocsPage = () => (
  <StoryDocsPage
    altGuidelinesHref={[
      {
        href: 'https://pages.github.ibm.com/carbon/ibm-products/patterns/web-terminal/usage/',
        label: 'Usage guidelines',
      },
    ]}
    blocks={[
      {
        description: `To get started using the WebTerminal, you have to first wrap your
              application with the \`<WebTerminalProvider>\`
              component. This will allow all the WebTerminal components to be
              used with the \`useWebTerminal()\` custom hook.
          `,
        title: 'Getting Started',
        source: {
          code: `import { WebTerminalProvider } from '@carbon/ibm-products';

const App = () => {
  return (
    <WebTerminalProvider>
      ...
    <WebTerminalProvider>
  )
};`,
        },
      },
      {
        title: 'useWebTerminal()',
        source: {
          code: `const { open, openWebTerminal, closeWebTerminal, toggleWebTerminal } =
  useWebTerminal();`,
        },
      },
      {
        description: `The \`useWebTerminal()\` hook returns an object with 4 properties:
1. Read the \`open\` state (true or false)
2. \`openWebTerminal\` sets the \`open\` state to true
3. \`closeWebTerminal\` sets the \`open\` state to false
4. \`toggleWebTerminal\` toggles between true and false

Example:
`,
        source: {
          code: `const MyComponent = () => {
  const { open, openWebTerminal, closeWebTerminal, toggleWebTerminal } =
    useWebTerminal();

  return (
    <div>
      <button onClick={() => openWebTerminal()}>Open web terminal</button>
      <button onClick={() => closeWebTerminal()}>Close web terminal</button>
      <button onClick={() => toggleWebTerminal()}>Toggle web terminal</button>
      <p>The web terminal is now {open}</p>

      <WebTerminal>...</WebTerminal>
    </div>
  );
};`,
        },
      },
      {
        subTitle: 'Passing in your own terminal.',
        description: `The \`WebTerminal\` is wrapper component for your own
terminal component that you may have been using for your product.
Simply pass your own terminal component as children.
            `,
      },
      {
        subTitle: 'Optional wrapper component.',
        description: `Optionally you can import \`WebTerminalContentWrapper\` to have
              content adjust their width based off the \`WebTerminal\` width when
              it is opened.`,
        source: {
          code: `<WebTerminalContentWrapper>
  content
</WebTerminalContentWrapper>

<WebTerminal>
  ...
</WebTerminal>`,
        },
      },
      {
        description:
          'The default web terminal is one which opens and the terminal loads. Then if the user desires to dismiss it they can click the close icon on the top right corner of the component.',
        story: stories.Default,
      },
      {
        story: stories.WithDocumentationLinks,
      },
      {
        subTitle: 'Help users with helpful documentation links',
        description: `Optionally you can pass documentation links to help point your users to useful
documentation for your terminal, or kubernetes commands etc.

The documentation links should reflect the same props as \`OverflowMenuItem\` from
carbon.

Learn more:
https://react.carbondesignsystem.com/?path=/docs/components-overflowmenu--default
`,
        source: {
          code: `const documentationLinks = [
  {
    itemText: 'BX/ICP docs',
    href: '#',
    onClick: () => console.log('clicked'),
  },
  {
    itemText: 'Kubernetes docs',
    href: '#',
    onClick: () => console.log('clicked'),
  },
  {
    itemText: 'Docker docs',
    href: '#',
    onClick: () => console.log('clicked'),
  },
  {
    itemText: 'Helm docs',
    href: '#',
    onClick: () => console.log('clicked'),
  },
];`,
        },
      },
      {
        story: stories.WithActions,
      },
      {
        description: `Optionally you can add actions to the web terminal header bar. To add actions
you need to pass in an array of actions with objects for each object.`,
        source: {
          code: `<WebTerminal
  actions={[
    {
      renderIcon: Code32,
      onClick: () => {},
      iconDescription: 'Create new deployment',
    },
  ]}
>
  ...
</WebTerminal>`,
        },
      },
    ]}
  />
);

export default DocsPage;
