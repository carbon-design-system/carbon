import React from 'react';
import { storiesOf } from '@storybook/react';
import Checkbox32 from '../../../lib/checkbox/32';

storiesOf('Checkbox32', module)
  .add('default', () => <Checkbox32 />)
  .add('with accessibility label', () => (
    <Checkbox32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Checkbox32 focusable>
      <title>Icon title</title>
    </Checkbox32>
  ));
