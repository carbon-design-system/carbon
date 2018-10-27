import React from 'react';
import { storiesOf } from '@storybook/react';
import NumberSmall_732 from '../../../lib/number--small--7/32';

storiesOf('NumberSmall_732', module)
  .add('default', () => <NumberSmall_732 />)
  .add('with accessibility label', () => (
    <NumberSmall_732 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <NumberSmall_732 focusable>
      <title>Icon title</title>
    </NumberSmall_732>
  ));
