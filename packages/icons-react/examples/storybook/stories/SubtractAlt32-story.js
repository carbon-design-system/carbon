import React from 'react';
import { storiesOf } from '@storybook/react';
import SubtractAlt32 from '../../../lib/SubtractAlt/32';

storiesOf('SubtractAlt32', module)
  .add('default', () => <SubtractAlt32 />)
  .add('with accessibility label', () => (
    <SubtractAlt32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <SubtractAlt32 focusable>
      <title>Icon title</title>
    </SubtractAlt32>
  ));
