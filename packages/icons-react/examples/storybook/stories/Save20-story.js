import React from 'react';
import { storiesOf } from '@storybook/react';
import Save20 from '../../../es/save/20.js';

storiesOf('Save20', module)
  .add('default', () => <Save20 />)
  .add('with accessibility label', () => (
    <Save20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Save20 aria-label="Icon label">
      <title>Icon title</title>
    </Save20>
  ));
