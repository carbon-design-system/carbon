import React from 'react';
import { storiesOf } from '@storybook/react';
import NumberSmall_432 from '../../../lib/number--small--4/32';

storiesOf('NumberSmall_432', module)
  .add('default', () => <NumberSmall_432 />)
  .add('with accessibility label', () => (
    <NumberSmall_432 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <NumberSmall_432 focusable>
      <title>Icon title</title>
    </NumberSmall_432>
  ));
