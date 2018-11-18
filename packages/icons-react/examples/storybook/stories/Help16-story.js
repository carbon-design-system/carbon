import React from 'react';
import { storiesOf } from '@storybook/react';
import Help16 from '../../../es/help/16.js';

storiesOf('Help16', module)
  .add('default', () => <Help16 />)
  .add('with accessibility label', () => (
    <Help16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Help16 aria-label="Icon label">
      <title>Icon title</title>
    </Help16>
  ));
