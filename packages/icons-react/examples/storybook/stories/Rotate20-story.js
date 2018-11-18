import React from 'react';
import { storiesOf } from '@storybook/react';
import Rotate20 from '../../../es/rotate/20.js';

storiesOf('Rotate20', module)
  .add('default', () => <Rotate20 />)
  .add('with accessibility label', () => (
    <Rotate20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Rotate20 aria-label="Icon label">
      <title>Icon title</title>
    </Rotate20>
  ));
