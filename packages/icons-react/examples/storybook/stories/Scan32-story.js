import React from 'react';
import { storiesOf } from '@storybook/react';
import Scan32 from '../../../lib/Scan/32';

storiesOf('Scan32', module)
  .add('default', () => <Scan32 />)
  .add('with accessibility label', () => (
    <Scan32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Scan32 focusable>
      <title>Icon title</title>
    </Scan32>
  ));
