import React from 'react';
import { action, storiesOf } from '@kadira/storybook';
import CopyButton from '../../components/CopyButton';

storiesOf('CopyButton (Deprecated)', module)
  .addWithInfo(
    '',
    `
      The CopyButton has been deprecated in favor of a new CodeSnippet component that includes a new copy button. 
      The CodeSnippet component will be available in versions 3.0.0 and higher. 
      The copy button can be used when the user needs to copy information, such as a code snippet, to their clipboard.
    `,
    () => (
      <CopyButton feedback="Copied!" onClick={action('onClick')} feedbackTimeout={3000}>Copy</CopyButton>
    )
  );
