import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import CodeSnippet from '../CodeSnippet';
import CodeSnippetSkeleton from './CodeSnippet.Skeleton';

const copyProps = {
  onClick: action('onClick'),
  feedback: 'Feedback Enabled 👍',
  copyLabel: 'Copy Code',
};

storiesOf('CodeSnippet', module)
  .addWithInfo(
    'inline',
    `
      Code snippets are small blocks of reusable code that can be inserted in a code file.

      The Inline style is for code used within a block of text.
    `,
    () => (
      <div>
        <CodeSnippet type="inline" {...copyProps}>
          {'node -v'}
        </CodeSnippet>
        <CodeSnippet type="inline" light {...copyProps}>
          {'node -v'}
        </CodeSnippet>
      </div>
    )
  )
  .addWithInfo(
    'single line',
    `
      Code snippets are small blocks of reusable code that can be inserted in a code file.

      The Code style is for larger, multi-line code snippets.
    `,
    () => (
      <CodeSnippet type="single" {...copyProps}>
        {
          'node -v Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, veritatis voluptate id incidunt molestiae officia possimus, quasi itaque alias, architecto hic, dicta fugit? Debitis delectus quidem explicabo vitae fuga laboriosam!'
        }
      </CodeSnippet>
    )
  )
  .addWithInfo(
    'multi line',
    `
      Code snippets are small blocks of reusable code that can be inserted in a code file.

      The Terminal style is for single-line .
    `,
    () => (
      <div style={{ width: '800px' }}>
        <CodeSnippet type="multi" {...copyProps}>
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
);   `}
        </CodeSnippet>
        <br />
        <CodeSnippet type="multi" {...copyProps}>
          {`@mixin grid-container {
  width: 100%;
  padding-right: padding(mobile);
  padding-left: padding(mobile);

  @include breakpoint(bp--xs--major) {
    padding-right: padding(xs);
  }
}  `}
        </CodeSnippet>
      </div>
    )
  )
  .addWithInfo(
    'skeleton',
    `
    Placeholder skeleton state to use when content is loading.
    `,
    () => (
      <div style={{ width: '800px' }}>
        <CodeSnippetSkeleton type="single" />
        <CodeSnippetSkeleton type="multi" />
      </div>
    )
  );
