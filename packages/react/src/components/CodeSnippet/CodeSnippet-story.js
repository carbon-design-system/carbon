/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import CodeSnippet from '../CodeSnippet';
import CodeSnippetSkeleton from './CodeSnippet.Skeleton';
import mdx from './CodeSnippet.mdx';

export default {
  title: 'CodeSnippet',
  component: CodeSnippet,
  decorators: [withKnobs],
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const inline = () => (
  <CodeSnippet type="inline" feedback="Copied to clipboard">
    {'node -v'}
  </CodeSnippet>
);

export const multiline = () => (
  <CodeSnippet type="multi" feedback="Copied to clipboard">
    {`@mixin grid-container {
     width: 100%;
     padding-right: padding(mobile);
     padding-left: padding(mobile);`}
  </CodeSnippet>
);

export const singleline = () => (
  <CodeSnippet type="single" feedback="Copied to clipboard">
    {'node -v'}
  </CodeSnippet>
);

export const skeleton = () => (
  <div style={{ width: '800px' }}>
    <CodeSnippetSkeleton type="single" style={{ marginBottom: 8 }} />
    <CodeSnippetSkeleton type="multi" />
  </div>
);

const lightPropMessage = (
  <small style={{ display: 'block', paddingBottom: '1rem' }}>
    The snippet container should never be the same color as the page background.
    <br />
    {'Do not use the '}
    <CodeSnippet type="inline" light>
      light
    </CodeSnippet>
    {' variant on '}
    <CodeSnippet type="inline" light>
      $ui-background
    </CodeSnippet>
    {' or '}
    <CodeSnippet type="inline" light>
      $ui-02
    </CodeSnippet>
    .
  </small>
);

const props = () => ({
  type: select('Type', {
    inline: 'inline',
    'single line': 'single',
    'multiple line': 'multi',
  }),
  light: boolean('Light variant', false),
  feedback: text('Feedback text', 'Copied to clipboard'),
  showMoreText: text('Text for "show more" button', 'Show more'),
  showLessText: text('Text for "show less" button', 'Show less'),
  hideCopyButton: boolean('Hide copy button', false),
  onClick: action('onClick'),
  copyButtonDescription: text('Copy button title', 'Copy code snippet'),
  ariaLabel: text('ARIA label', 'Container label'),
});

export const playground = () => (
  <div className={props().light ? 'bx--tile' : ''} style={{ width: '800px' }}>
    {props().light && lightPropMessage}
    <CodeSnippet {...props()}>
      {props().type === 'multi'
        ? `@mixin grid-container {
  width: 100%;
  padding-right: padding(mobile);
  padding-left: padding(mobile);
}`
        : 'node -v'}
    </CodeSnippet>
  </div>
);
