import React from 'react';
import { storiesOf } from '@storybook/react';
import Number_432 from '../../../lib/Number_4/32';

storiesOf('Number_432', module)
  .add('default', () => <Number_432 />)
  .add('with accessibility label', () => (
    <Number_432 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Number_432 focusable>
      <title>Icon title</title>
    </Number_432>
  ));
