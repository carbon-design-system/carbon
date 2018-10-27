import React from 'react';
import { storiesOf } from '@storybook/react';
import Number_632 from '../../../lib/number--6/32';

storiesOf('Number_632', module)
  .add('default', () => <Number_632 />)
  .add('with accessibility label', () => (
    <Number_632 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Number_632 focusable>
      <title>Icon title</title>
    </Number_632>
  ));
