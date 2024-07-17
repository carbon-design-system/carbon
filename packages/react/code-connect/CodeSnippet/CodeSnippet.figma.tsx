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
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=4266-104904&t=cMvnFTYLPEhzhIpj-4',
  {
    example: () => {
      return <div>{/* To view CodeSnippet code, view inner component */}</div>;
    },
  }
);

//Inline item
figma.connect(
  CodeSnippet,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=4266-104960&t=cMvnFTYLPEhzhIpj-4',
  {
    props: {
      children: figma.textContent('node -v'),
    },
    example: ({ children }) => {
      return (
        <CodeSnippet type="inline" feedback="Copied to clipboard">
          {children}
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
    },
    example: ({ children }) => {
      return (
        <CodeSnippet type="single" feedback="Copied to clipboard">
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
    },
    example: ({ hideCopyButton }) => (
      <CodeSnippet
        type="multi"
        feedback="Copied to clipboard"
        hideCopyButton={hideCopyButton}>
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
