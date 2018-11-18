import React from 'react';
import { storiesOf } from '@storybook/react';
import CloseSolid16 from '../../../es/close--solid/16.js';

storiesOf('CloseSolid16', module)
  .add('default', () => <CloseSolid16 />)
  .add('with accessibility label', () => (
    <CloseSolid16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CloseSolid16 aria-label="Icon label">
      <title>Icon title</title>
    </CloseSolid16>
  ));
