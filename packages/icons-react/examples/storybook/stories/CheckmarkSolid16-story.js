import React from 'react';
import { storiesOf } from '@storybook/react';
import CheckmarkSolid16 from '../../../lib/CheckmarkSolid/16';

storiesOf('CheckmarkSolid16', module)
  .add('default', () => <CheckmarkSolid16 />)
  .add('with accessibility label', () => (
    <CheckmarkSolid16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CheckmarkSolid16 focusable>
      <title>Icon title</title>
    </CheckmarkSolid16>
  ));
