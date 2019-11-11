/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import CodeSnippet from '../CodeSnippet';
import CodeSnippetSkeleton from './CodeSnippet.Skeleton';

const props = {
  inline: () => ({
    light: boolean('Light variant (light)', false),
    feedback: text('Feedback text (feedback)', 'Feedback Enabled 👍'),
    onClick: action('onClick'),
    copyLabel: text(
      'ARIA label for the snippet/copy button (copyLabel)',
      'copyable code snippet'
    ),
  }),
  single: () => ({
    light: boolean('Light variant (light)', false),
    feedback: text('Feedback text (feedback)', 'Feedback Enabled 👍'),
    copyButtonDescription: text(
      'Copy icon description (copyButtonDescription)',
      'copyable code snippet'
    ),
    ariaLabel: text(
      'ARIA label of the container (ariaLabel)',
      'Container label'
    ),
    onClick: action('onClick'),
  }),
  multiline: () => ({
    light: boolean('Light variant (light)', false),
    feedback: text('Feedback text (feedback)', 'Feedback Enabled 👍'),
    showMoreText: text(
      'Text for "show more" button (showMoreText)',
      'Show more'
    ),
    showLessText: text(
      'Text for "show less" button (showLessText)',
      'Show less'
    ),
    onClick: action('onClick'),
  }),
};

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

storiesOf('CodeSnippet', module)
  .addDecorator(withKnobs)
  .add(
    'inline',
    () => (
      <div className={props.inline().light ? 'bx--tile' : ''}>
        {props.inline().light && lightPropMessage}
        <CodeSnippet type="inline" {...props.inline()}>
          {'node -v'}
        </CodeSnippet>
      </div>
    ),
    {
      info: {
        text: `
        Code snippets are small blocks of reusable code that can be inserted in a code file.
  
        The Inline style is for code used within a block of text.
      `,
      },
    }
  )
  .add(
    'single line',
    () => (
      <div className={props.single().light ? 'bx--tile' : ''}>
        {props.single().light && lightPropMessage}
        <CodeSnippet type="single" {...props.single()}>
          {
            'node -v Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, veritatis voluptate id incidunt molestiae officia possimus, quasi itaque alias, architecto hic, dicta fugit? Debitis delectus quidem explicabo vitae fuga laboriosam!'
          }
        </CodeSnippet>
      </div>
    ),
    {
      info: {
        text: `
          Code snippets are small blocks of reusable code that can be inserted in a code file.
  
          The Code style is for larger, multi-line code snippets.
        `,
      },
    }
  )
  .add(
    'multi line',
    () => {
      const multilineProps = props.multiline();
      return (
        <div
          className={multilineProps.light ? 'bx--tile' : ''}
          style={{ width: '800px' }}>
          {multilineProps.light && lightPropMessage}
          <CodeSnippet type="multi" {...multilineProps}>
            {`@mixin grid-container {
  width: 100%;
  padding-right: padding(mobile);
  padding-left: padding(mobile);

  @include breakpoint(bp--xs--major) {
    padding-right: padding(xs);
    padding-left: padding(xs);
  }
}

$z-indexes: (
  modal : 9000,
  overlay : 8000,
  dropdown : 7000,
  header : 6000,
  footer : 5000,
  hidden : - 1,
  overflowHidden: - 1,
  floating: 10000
);`}
          </CodeSnippet>
          <br />
          <CodeSnippet type="multi" {...multilineProps}>
            {`@mixin grid-container {
  width: 100%;
  padding-right: padding(mobile);
  padding-left: padding(mobile);

  @include breakpoint(bp--xs--major) {
    padding-right: padding(xs);
  }
}`}
          </CodeSnippet>
        </div>
      );
    },
    {
      info: {
        text: `
          Code snippets are small blocks of reusable code that can be inserted in a code file.
  
          The Terminal style is for single-line .
        `,
      },
    }
  )
  .add(
    'skeleton',
    () => (
      <div style={{ width: '800px' }}>
        <CodeSnippetSkeleton type="single" style={{ marginBottom: 8 }} />
        <CodeSnippetSkeleton type="multi" />
      </div>
    ),
    {
      info: {
        text: `
          Placeholder skeleton state to use when content is loading.
        `,
      },
    }
  );
