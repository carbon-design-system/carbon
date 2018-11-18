import React from 'react';
import { storiesOf } from '@storybook/react';
import Help32 from '../../../es/help/32.js';

storiesOf('Help32', module)
  .add('default', () => <Help32 />)
  .add('with accessibility label', () => (
    <Help32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Help32 aria-label="Icon label">
      <title>Icon title</title>
    </Help32>
  ));
