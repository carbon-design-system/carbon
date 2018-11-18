import React from 'react';
import { storiesOf } from '@storybook/react';
import At20 from '../../../es/at/20.js';

storiesOf('At20', module)
  .add('default', () => <At20 />)
  .add('with accessibility label', () => (
    <At20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <At20 aria-label="Icon label">
      <title>Icon title</title>
    </At20>
  ));
