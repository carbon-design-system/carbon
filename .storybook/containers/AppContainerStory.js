import React from 'react';
import { storiesOf } from '@kadira/storybook';
import AppContainer from '../../containers/AppContainer';

storiesOf('AppContainer', module)
  .addWithInfo(
    'Dark (default)',
    `
      <AppContainer> wraps all react components. 
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
    'Light',
    `
      <AppContainer> wraps all react components. 
      Light UI can be triggered by setting theme prop to 'light'. 
      This adds an internal modifier className ('.bx--global--light-ui').
    `,
    () => (
      <AppContainer theme="light">
        <div>children go here</div>
      </AppContainer>
    ),
  )
  
