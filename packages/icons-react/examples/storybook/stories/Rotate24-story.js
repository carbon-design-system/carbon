import React from 'react';
import { storiesOf } from '@storybook/react';
import Rotate24 from '../../../es/rotate/24.js';

storiesOf('Rotate24', module)
  .add('default', () => <Rotate24 />)
  .add('with accessibility label', () => (
    <Rotate24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Rotate24 aria-label="Icon label">
      <title>Icon title</title>
    </Rotate24>
  ));
