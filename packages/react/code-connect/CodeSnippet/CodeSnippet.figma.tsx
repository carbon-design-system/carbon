/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @ts-nocheck
import React from 'react';
import { CodeSnippet, CodeSnippetSkeleton } from '@carbon/react';
import figma from '@figma/code-connect';

// Inline
figma.connect(
  CodeSnippet,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=4266-104904&t=cMvnFTYLPEhzhIpj-4',
  {
    variant: { Tooltip: 'True' },
    props: {
      codeSnippet: figma.nestedProps('Code snippet', {
        text: figma.textContent('node -v'),
      }),
      tooltip: figma.nestedProps('Tooltip content', {
        text: figma.textContent('Tooltip text'),
      }),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
    },
    example: ({ codeSnippet, tooltip, disabled }) => {
      return (
        <CodeSnippet type="inline" feedback={tooltip.text} disabled={disabled}>
          {codeSnippet.text}
        </CodeSnippet>
      );
    },
  }
);

figma.connect(
  CodeSnippet,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=4266-104904&t=cMvnFTYLPEhzhIpj-4',
  {
    variant: { Tooltip: 'False' },
    props: {
      codeSnippet: figma.nestedProps('Code snippet', {
        text: figma.textContent('node -v'),
      }),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
    },
    example: ({ codeSnippet, disabled }) => {
      return (
        <CodeSnippet
          type="inline"
          feedback="Copied to clipboard"
          disabled={disabled}>
          {codeSnippet.text}
        </CodeSnippet>
      );
    },
  }
);

//Single line
figma.connect(
  CodeSnippet,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=4266-103999&t=cMvnFTYLPEhzhIpj-4',
  {
    props: {
      children: figma.textContent('$ npm install --save carbon-components'),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
    },
    example: ({ children, disabled }) => {
      return (
        <CodeSnippet
          type="single"
          feedback="Copied to clipboard"
          disabled={disabled}>
          {children}
        </CodeSnippet>
      );
    },
  }
);

//Multi line
figma.connect(
  CodeSnippet,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=4257-168802&t=cMvnFTYLPEhzhIpj-4',
  {
    props: {
      // numbers: figma.boolean('Numbers'), // not available in code
      hideCopyButton: figma.boolean('Copy', {
        true: false,
        false: true,
      }),
      expanded: figma.boolean('Expanded'),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
    },
    example: ({ hideCopyButton, disabled }) => (
      <CodeSnippet
        type="multi"
        feedback="Copied to clipboard"
        hideCopyButton={hideCopyButton}
        disabled={disabled}>
        Code sample here
      </CodeSnippet>
    ),
  }
);

// Skeleton state (multiline only)
figma.connect(
  CodeSnippetSkeleton,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=4257-168802&t=cMvnFTYLPEhzhIpj-4',
  {
    variant: { State: 'Skeleton' },
    example: () => <CodeSnippetSkeleton type="multi" />,
  }
);
