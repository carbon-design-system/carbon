import React from 'react';
import { storiesOf } from '@storybook/react';
import Locked32 from '../../../lib/Locked/32';

storiesOf('Locked32', module)
  .add('default', () => <Locked32 />)
  .add('with accessibility label', () => (
    <Locked32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Locked32 focusable>
      <title>Icon title</title>
    </Locked32>
  ));
