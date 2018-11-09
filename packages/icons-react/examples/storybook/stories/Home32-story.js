import React from 'react';
import { storiesOf } from '@storybook/react';
import Home32 from '../../../lib/Home/32';

storiesOf('Home32', module)
  .add('default', () => <Home32 />)
  .add('with accessibility label', () => (
    <Home32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Home32 focusable>
      <title>Icon title</title>
    </Home32>
  ));
