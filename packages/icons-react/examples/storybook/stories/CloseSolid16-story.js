import React from 'react';
import { storiesOf } from '@storybook/react';
import CloseSolid16 from '../../../lib/close--solid/16';

storiesOf('CloseSolid16', module)
  .add('default', () => <CloseSolid16 />)
  .add('with accessibility label', () => (
    <CloseSolid16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CloseSolid16 focusable>
      <title>Icon title</title>
    </CloseSolid16>
  ));
