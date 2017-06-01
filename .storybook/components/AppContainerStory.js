import React from 'react';
import { storiesOf } from '@storybook/react';
import AppContainer from '../../components/AppContainer';

storiesOf('AppContainer', module)
  .addWithInfo(
    'dark',
    `
      The App Container component wraps all React components.
      This adds global styles using dark UI theme by default.
      Styles are hooked to internal className (.bx--body) and cascade down to all children.
    `,
    () => (
      <AppContainer theme="dark">
        <div>children go here</div>
      </AppContainer>
    ),
  )
  .addWithInfo(
    'light',
    `
      The App Container component wraps all React components.
      Light UI can be triggered by setting theme prop to 'light'.
      This adds an internal modifier className ('.bx--global--light-ui').
    `,
    () => (
      <AppContainer theme="light">
        <div>children go here</div>
      </AppContainer>
    ),
  );
