import React from 'react';
import { storiesOf } from '@storybook/react';
import Paste24 from '../../../es/paste/24.js';

storiesOf('Paste24', module)
  .add('default', () => <Paste24 />)
  .add('with accessibility label', () => (
    <Paste24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Paste24 aria-label="Icon label">
      <title>Icon title</title>
    </Paste24>
  ));
