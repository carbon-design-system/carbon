import React from 'react';
import { storiesOf } from '@storybook/react';
import SubtractSolid16 from '../../../lib/SubtractSolid/16';

storiesOf('SubtractSolid16', module)
  .add('default', () => <SubtractSolid16 />)
  .add('with accessibility label', () => (
    <SubtractSolid16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <SubtractSolid16 focusable>
      <title>Icon title</title>
    </SubtractSolid16>
  ));
