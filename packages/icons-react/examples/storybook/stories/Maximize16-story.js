import React from 'react';
import { storiesOf } from '@storybook/react';
import Maximize16 from '../../../lib/maximize/16';

storiesOf('Maximize16', module)
  .add('default', () => <Maximize16 />)
  .add('with accessibility label', () => (
    <Maximize16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Maximize16 focusable>
      <title>Icon title</title>
    </Maximize16>
  ));
