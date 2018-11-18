import React from 'react';
import { storiesOf } from '@storybook/react';
import NewTab20 from '../../../es/new-tab/20.js';

storiesOf('NewTab20', module)
  .add('default', () => <NewTab20 />)
  .add('with accessibility label', () => (
    <NewTab20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <NewTab20 aria-label="Icon label">
      <title>Icon title</title>
    </NewTab20>
  ));
