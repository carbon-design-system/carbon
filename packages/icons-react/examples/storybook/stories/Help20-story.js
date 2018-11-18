import React from 'react';
import { storiesOf } from '@storybook/react';
import Help20 from '../../../es/help/20.js';

storiesOf('Help20', module)
  .add('default', () => <Help20 />)
  .add('with accessibility label', () => (
    <Help20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Help20 aria-label="Icon label">
      <title>Icon title</title>
    </Help20>
  ));
