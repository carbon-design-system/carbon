import React from 'react';
import { storiesOf } from '@storybook/react';
import Fade32 from '../../../lib/Fade/32';

storiesOf('Fade32', module)
  .add('default', () => <Fade32 />)
  .add('with accessibility label', () => (
    <Fade32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Fade32 focusable>
      <title>Icon title</title>
    </Fade32>
  ));
