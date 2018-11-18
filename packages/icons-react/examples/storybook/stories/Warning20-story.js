import React from 'react';
import { storiesOf } from '@storybook/react';
import Warning20 from '../../../es/warning/20.js';

storiesOf('Warning20', module)
  .add('default', () => <Warning20 />)
  .add('with accessibility label', () => (
    <Warning20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Warning20 aria-label="Icon label">
      <title>Icon title</title>
    </Warning20>
  ));
