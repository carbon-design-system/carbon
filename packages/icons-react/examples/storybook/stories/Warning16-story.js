import React from 'react';
import { storiesOf } from '@storybook/react';
import Warning16 from '../../../es/warning/16.js';

storiesOf('Warning16', module)
  .add('default', () => <Warning16 />)
  .add('with accessibility label', () => (
    <Warning16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Warning16 aria-label="Icon label">
      <title>Icon title</title>
    </Warning16>
  ));
