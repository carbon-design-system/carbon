import React from 'react';
import { storiesOf } from '@storybook/react';
import NewTab16 from '../../../es/new-tab/16.js';

storiesOf('NewTab16', module)
  .add('default', () => <NewTab16 />)
  .add('with accessibility label', () => (
    <NewTab16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <NewTab16 aria-label="Icon label">
      <title>Icon title</title>
    </NewTab16>
  ));
