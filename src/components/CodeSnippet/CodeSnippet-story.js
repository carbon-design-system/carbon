import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import CodeSnippet from '../CodeSnippet';

const copyProps = {
  onClick: action('onClick'),
};

storiesOf('CodeSnippet', module)
  .addWithInfo(
    'code',
    `
      Code snippets are small blocks of reusable code that can be inserted in a code file.

      The Code style is for larger, multi-line code snippets.
    `,
    () => (
      <CodeSnippet type="code" {...copyProps}>
        {`@mixin bx--snippet($type) {
  @if $type == 'terminal' {
    background-color: red;
  } @else if $type == 'code' {
    background-color: blue;
  } @else if $type == 'text' {
    background-color: white;
  }

  @if $type == 'terminal' {
    background-color: red;
  } @else if $type == 'code' {
    background-color: blue;
  } @else if $type == 'text' {
    background-color: white;
  }
}
          `}
      </CodeSnippet>
    )
  )
  .addWithInfo(
    'terminal',
    `
      Code snippets are small blocks of reusable code that can be inserted in a code file.

      The Terminal style is for single-line .
    `,
    () => (
      <CodeSnippet type="terminal" {...copyProps}>
        {
          'node -v Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, veritatis voluptate id incidunt molestiae officia possimus, quasi itaque alias, architecto hic, dicta fugit? Debitis delectus quidem explicabo vitae fuga laboriosam!'
        }
      </CodeSnippet>
    )
  );
