import React from 'react';
import { storiesOf } from '@storybook/react';
import Ruler32 from '../../../lib/Ruler/32';

storiesOf('Ruler32', module)
  .add('default', () => <Ruler32 />)
  .add('with accessibility label', () => (
    <Ruler32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Ruler32 focusable>
      <title>Icon title</title>
    </Ruler32>
  ));
