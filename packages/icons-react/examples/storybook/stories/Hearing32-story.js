import React from 'react';
import { storiesOf } from '@storybook/react';
import Hearing32 from '../../../lib/Hearing/32';

storiesOf('Hearing32', module)
  .add('default', () => <Hearing32 />)
  .add('with accessibility label', () => (
    <Hearing32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Hearing32 focusable>
      <title>Icon title</title>
    </Hearing32>
  ));
